import { useEffect, useRef, useState } from 'react'
import { TextInput, ScrollView, Alert} from 'react-native'

import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'

import { useUser } from '@realm/react'

import { useForegroundPermissions, watchPositionAsync, LocationAccuracy, LocationSubscription } from "expo-location"

import { useNavigation } from '@react-navigation/native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'

import { Container, Content, Message } from './styles'
import { licensePlateValidade } from '../../utils/licensePlateValidate'

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false)

  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions()
  const { goBack } = useNavigation()

  const realm = useRealm();
  const user = useUser();

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)
  

  function handleDepartureRegister(){
    try {
      if(!licensePlateValidade(licensePlate)){
        licensePlateRef.current?.focus();
        return Alert.alert("Placa invalida", "A placa e invalida. Por favor informa a placa correta do veiculo")
      }
  
      if(description.trim().length === 0){
        descriptionRef.current?.focus();
        return Alert.alert("Finalidade", "por favor informe a finalidade da utilização do veiculo")
      }
      
      setIsRegistering(true)

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id,
          license_plate: licensePlate.toUpperCase(),
          description
        }))
      })

      Alert.alert("Saida", "saída do veiculo registrada com sucesso!");
      goBack();
      
    } catch(error){
      console.log(error)
      Alert.alert("Erro", "Nao foi possível registrar a Saida do veiculo")
    } finally {
      setIsRegistering(false)
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission()
  }, [])

  useEffect(() => {
    if(!locationForegroundPermission?.granted){
      return
    }

    let subscription: LocationSubscription
    watchPositionAsync({
      accuracy: LocationAccuracy.High,
      timeInterval: 1000
    }, (location) => {
      console.log(location)
    }).then((response) => subscription = response)

    return () => subscription.remove()

  }, [locationForegroundPermission])

  if(!locationForegroundPermission?.granted){
    return(
      <Container>
        <Header title='Saida'/>
        <Message>
          Voce precisa permitir que o app tenha acesso a localização para utilizar essa funcionalidade.
          Por favor, acesse as configurações do dispositivo para conceder essa permissão ao app
        </Message>
      </Container>
    )
  }

  return (
    <Container>
      <Header title='Saida'/>

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
            <LicensePlateInput 
              ref={licensePlateRef}
              label='Placa do veiculo'
              placeholder='BRA1234'
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType='next'
              onChangeText={setLicensePlate}
            /> 

            <TextAreaInput 
              ref={descriptionRef}
              label='Finalidade'
              placeholder='Vou utilizar o veiculo para...' 
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button 
              title='Registrar saída'
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  );
}