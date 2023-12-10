import { useEffect, useState } from 'react'

import { Alert, FlatList } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import dayjs from 'dayjs'

import { useQuery, useRealm } from '../../libs/realm' 
import { Historic } from '../../libs/realm/schemas/Historic'
import { useUser } from '@realm/react'

import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'

import { Container, Content, Label, Title } from './styles'
import { HistoricCard, HistoricCardProps } from '../../components/HistoricCard'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([])

  const { navigate } = useNavigation()

  const user = useUser()
  const historic = useQuery(Historic)
  const realm = useRealm()

  function handleRegisterMovement(){
    if(vehicleInUse?._id){
      return navigate('arrival', { id: vehicleInUse._id.toString() })
    } else {
      navigate('departure');
    }
  }

  function fetchVehicleInUse(){
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      Alert.alert("Veiculo em uso", "Nao foi possível carregar o veiculo em uso")
    }
  }

  function fetchHistoric(){
    try {
      const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");
  
      const formattedHistoric = response.map((item) => {
        return ({
          id: item._id!.toString(),
          licensePlate: item.license_plate,
          isSync: false,
          created: dayjs(item.created_at).format('[Saida em] DD/MM/YYYY [as] HH:mm'),
        });
      });
  
      setVehicleHistoric(formattedHistoric);
      
    } catch (error) {
      Alert.alert("Histórico", "Nao foi possível carregar o histórico");
      console.log(error);
    }
  }

  function handleHistoricDetails(id: string){
    navigate('arrival', { id });
  }

  function progressNotification(transferred: number, transferable: number){
    const percentage = (transferred/transferable) * 100;

    console.log("TRANSFERIDO => ", percentage)
  }

  useEffect(() => {
    fetchVehicleInUse()
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());

    return () => {
      if(realm && !realm.isClosed){
        realm.removeListener('change', fetchVehicleInUse);
      }
  
    }
  })


  useEffect(() => {
    fetchHistoric()
  }, [historic])
  
  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm.objects('Historic').filtered(`user_id = '${user!.id}'`);
      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user'});
    })
  }, [realm]);

  useEffect(() => {
    const syncSession = realm.syncSession;

    if(!syncSession){
      return;
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification
    )
    
    return () => syncSession.removeProgressNotification(progressNotification)
  }, []);

  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus 
          onPress={handleRegisterMovement}
          license_plate={vehicleInUse?.license_plate}
        />

        <Title>
          Histórico
        </Title>

        <FlatList 
          data={vehicleHistoric}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoricCard 
              data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={(
            <Label>
              Nenhum veiculo utilizado.
            </Label>
          )}
        />

      </Content>
    </Container>
  );
}