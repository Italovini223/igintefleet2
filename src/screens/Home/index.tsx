import { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { useQuery, useRealm } from '../../libs/realm' 
import { Historic } from '../../libs/realm/schemas/Historic'

import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'

import { Container, Content } from './styles'
import { Alert } from 'react-native'
import { HistoricCard } from '../../components/HistoricCard'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation()

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
    const response = historic.filtered("status = 'arrival' SORT(created_at DESC)");
    console.log(response)
  }

  useEffect(() => {
    fetchVehicleInUse()
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse());

    return () => realm.removeListener('change', fetchVehicleInUse);
  })


  useEffect(() => {
    fetchHistoric()
  }, [historic])
  
  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus 
          onPress={handleRegisterMovement}
          license_plate={vehicleInUse?.license_plate}
        />

        <HistoricCard 
         data={{ created: '20/04', licensePlate: 'HCU-0080', isSync: true}}
        />
      </Content>
    </Container>
  );
}