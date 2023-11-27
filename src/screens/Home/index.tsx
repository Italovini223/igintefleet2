import { useEffect, useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { useQuery } from '../../libs/realm' 
import { Historic } from '../../libs/realm/schemas/Historic'

import { CarStatus } from '../../components/CarStatus'
import { HomeHeader } from '../../components/HomeHeader'

import { Container, Content } from './styles'
import { Alert } from 'react-native'

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  const { navigate } = useNavigation()
  const historic = useQuery(Historic)

  function handleRegisterMovement(){
    if(vehicleInUse?._id){
      return navigate('arrival', { id: vehicleInUse._id.toString() })
    } else {
      navigate('departure');
    }
  }

  function fetchVehicle(){
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      Alert.alert("Veiculo em uso", "Nao foi possível carregar o veiculo em uso")
    }
  }

  useEffect(() => {
    fetchVehicle()
  })
  return (
    <Container>
      <HomeHeader />

      <Content>
        <CarStatus 
          onPress={handleRegisterMovement}
          license_plate={vehicleInUse?.license_plate}
        />
      </Content>
    </Container>
  );
}