import { useRef } from 'react';
import { TextInput } from 'react-native';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Container, Content } from './styles';

export function Departure() {
  const descriptionRef = useRef<TextInput>(null)

  function handleDepartureRegister(){
    console.log("ok!");
  }

  return (
    <Container>
      <Header title='Saida'/>
      
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
    </Container>
  );
}