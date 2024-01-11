import { useEffect, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'

import { X } from 'phosphor-react-native'
import { Alert } from 'react-native'

import { useObject , useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'

import { getStorageLocations } from '../../libs/asyncStorage/locationStorage'
import { LatLng } from 'react-native-maps'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'

import { Container, Content, Description, Footer, Label, LicensePlate, AsyncMessage } from './styles'
import { BSON } from 'realm'
import { getLastSyncTimestamp } from '../../libs/asyncStorage/syncStorage'
import { stopLocationTask } from '../../tasks/backgroundLocationTask'
import { Map } from '../../components/Map'

 type RoutePramsProps = {
  id: string;
 }

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false)
  const [coordinates, setCoordinates] = useState<LatLng[]>([])

  const route = useRoute()
  const { id } = route.params as RoutePramsProps;

  const { goBack } = useNavigation()

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string)
  const realm = useRealm();

  const title = historic?.status === 'departure' ? 'chegada' : 'Detalhes';

  function handleRemoveVehicleUsage(){
    Alert.alert(
      "Cancelar",
      "cancelar a utilização do veículo?",
      [
        { text: "Nao", style: "cancel"},
        {
          text: "sim", 
          onPress: () => removeVehicleUsage()
        }
      ]
    )
  }

  function removeVehicleUsage(){
    realm.write(() => {
      realm.delete(historic)
    });

   goBack();
  }

  async function handleArrivalRegister(){
    try {
      if(!historic){
        return Alert.alert("Erro", "Nao foi possível obter os dados para registrar a chegada do veiculo")
      }

      await stopLocationTask()

      realm.write(() => {
          historic.status = 'arrival';
          historic.updated_at = new Date();
        }
      );

      Alert.alert("Chegada", "Chegada registrada com sucesso!");
      goBack();
      
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Nao foi possível registrar a chegada do veiculo");
    }
  }

  async function getLocationsInfo(){
    const lastSync = await getLastSyncTimestamp();
    const updatedAt = historic!.updated_at.getTime();
    setDataNotSynced(updatedAt > lastSync);

    const locationsStorage = await getStorageLocations();

    setCoordinates(locationsStorage)
  }

  useEffect(() => {
    getLocationsInfo()
  }, [historic])

  return (
    <Container>
      <Header 
        title={title}
      />

      {
        coordinates.length > 0 &&
        <Map 
          coordinates={coordinates}
        />
      }
      <Content>
        <Label >
          Placa do veiculo
        </Label>

        <LicensePlate>
          {historic?.license_plate}
        </LicensePlate>

        <Label>
          Finalidade
        </Label>

        <Description>
          {historic?.description}
        </Description>

      </Content>
      {
        historic?.status === 'departure' &&
          <Footer>
            <ButtonIcon 
              icon={X}
              onPress={handleRemoveVehicleUsage}
            />
            <Button 
              title='Registar chegada'
              onPress={handleArrivalRegister}
            />
          </Footer>
      }
      {
        dataNotSynced &&
        <AsyncMessage>
          Sincronização da 
          { historic?.status === 'departure' ? " partida " : " chegada "}
          pendente
        </AsyncMessage>
      }

    </Container>
  );
}