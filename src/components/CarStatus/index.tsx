import { TouchableOpacityProps } from 'react-native'

import { Key, Car } from 'phosphor-react-native'

import { Container, IconBox, Message, TextHighlight } from './styles';
import { useTheme } from 'styled-components/native';

type Props = TouchableOpacityProps & {
  license_plate?: string | null;
}

export function CarStatus({ license_plate = null, ...rest }: Props) {
  const theme = useTheme()

  const Icon = license_plate ? Key : Car;
  const message = license_plate ? `Veiculo ${license_plate} em uso.` : `Nenhum veiculo em uso. `;
  const status = license_plate ? 'Chegada' :  'saída';


  return (
    <Container {...rest}>
      <IconBox>
        <Icon 
          size={32}
          color={theme.COLORS.BRAND_LIGHT}
        />
      </IconBox>

      <Message>
        {message}

        <TextHighlight>
          Clique aqui para registar a {status}
        </TextHighlight>
      </Message>
    </Container>
  );
}