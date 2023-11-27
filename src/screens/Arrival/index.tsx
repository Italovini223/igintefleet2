
import { useRoute } from '@react-navigation/native';
import { Container, Content, Description, Footer, Label, LicensePlate } from './styles';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

 type RoutePramsProps = {
  id: string;
 }

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RoutePramsProps;

  return (
    <Container>
      <Header 
        title='Chegada'
      />
      <Content>
        <Label >
          Placa do veiculo
        </Label>

        <LicensePlate>
          PPP0000
        </LicensePlate>

        <Label>
          Finalidade
        </Label>

        <Description>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, ipsam. Placeat distinctio expedita voluptatibus, aspernatur iure sit sequi corporis atque facere illo natus? Officia delectus doloremque laudantium sit tempore animi?
        </Description>
        <Footer>
          <Button 
            title='Registar chegada'
          />
        </Footer>
      </Content>

    </Container>
  );
}