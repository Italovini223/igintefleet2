import { useRef, useState } from 'react'
import { TextInput, ScrollView, KeyboardAvoidingView, Platform , Alert} from 'react-native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'

import { Container, Content } from './styles'
import { licensePlateValidade } from '../../utils/licensePlateValidate'

export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)
  
  const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position'

  function handleDepartureRegister(){
    if(!licensePlateValidade(licensePlate)){
      licensePlateRef.current?.focus();
      return Alert.alert("Placa invalida", "A placa e invalida. Por favor informa a placa correta do veiculo")
    }
  }

  return (
    <Container>
      <Header title='Saida'/>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior}>
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
            />
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}