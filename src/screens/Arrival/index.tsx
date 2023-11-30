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

  function handleArrivalRegister(){
    try {
      if(!historic){
        return Alert.alert("Erro", "Nao foi possível obter os dados para registrar a chegada do veiculo")
      }

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
            onPress={handleArrivalRegister}
          />
        </Footer>
      </Content>

    </Container>
  );
}