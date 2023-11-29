import { useNavigation, useRoute } from '@react-navigation/native'

import { X } from 'phosphor-react-native'
import { Alert } from 'react-native'

import { useObject , useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { ButtonIcon } from '../../components/ButtonIcon'

import { Container, Content, Description, Footer, Label, LicensePlate } from './styles'
import { BSON } from 'realm'

 type RoutePramsProps = {
  id: string;
 }

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RoutePramsProps;

  const { goBack } = useNavigation()

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string)
  const realm = useRealm();

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
          {historic?.license_plate}
        </LicensePlate>

        <Label>
          Finalidade
        </Label>

        <Description>
          {historic?.description}
        </Description>
        <Footer>
          <ButtonIcon 
            icon={X}
            onPress={handleRemoveVehicleUsage}
          />
          <Button 
            title='Registar chegada'
          />
        </Footer>
      </Content>

    </Container>
  );
}