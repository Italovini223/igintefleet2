import { TouchableOpacityProps } from 'react-native'
import { Check, ClockClockwise } from 'phosphor-react-native'

import { useTheme } from 'styled-components/native';

import { Container, Departure, Info, LicensePlate } from './styles';

export type HistoricCardProps = {
  licensePlate: string;
  created: string;
  isSync: boolean;
}

type Props = TouchableOpacityProps & {
 data: HistoricCardProps;
}

export function HistoricCard({ data: { created, licensePlate, isSync }, ...rest}: Props) {
  const { COLORS } = useTheme()
  return (
    <Container {...rest}>
      <Info>
        <LicensePlate>
          {licensePlate}
        </LicensePlate>

        <Departure>
          {created}
        </Departure>
      </Info>

      {
        isSync ? 
        <Check 
          size={24}
          color={COLORS.BRAND_LIGHT}
        /> 
        :
        <ClockClockwise 
          size={24}
          color={COLORS.GRAY_400}
        />
      }

    </Container>
  );
}