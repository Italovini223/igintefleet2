import { useRef } from 'react'
import { TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { LicensePlateInput } from '../../components/LicensePlateInput'
import { TextAreaInput } from '../../components/TextAreaInput'

import { Container, Content } from './styles'

export function Departure() {
  const descriptionRef = useRef<TextInput>(null)
  const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position'

  function handleDepartureRegister(){
    console.log("ok!");
  }

  return (
    <Container>
      <Header title='Saida'/>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior}>
        <ScrollView>
          <Content>
            <LicensePlateInput 
              label='Placa do veiculo'
              placeholder='BRA1234'
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType='next'
            /> 

            <TextAreaInput 
              ref={descriptionRef}
              label='Finalidade'
              placeholder='Vou utilizar o veiculo para...' 
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
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