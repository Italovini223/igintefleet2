import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Container, Content } from './styles';

export function Departure() {
  return (
    <Container>
      <Header title='Saida'/>
      
      <Content>
        <LicensePlateInput 
          label='Placa do veiculo'
          placeholder='BRA1234'
        /> 

        <TextAreaInput 
          label='Finalidade'
          placeholder='Vou utilizar o veiculo para...' 
        />

        <Button title='Registrar saída'/>
      </Content>
    </Container>
  );
}