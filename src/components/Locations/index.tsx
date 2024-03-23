import { Container, Line } from './styles';

import { Car, FlagCheckered } from 'phosphor-react-native';

import { LocationInfo, LocationInfoPros } from '../LocationInfo';

type Props = {
  departure: LocationInfoPros;
  arrival?: LocationInfoPros | null;
}

export function Locations({ departure, arrival = null}: Props) {
  return (
    <Container>
      <LocationInfo 
        icon={Car}
        label={departure.label}
        description={departure.description}
      />
        <Line />

      {
        arrival && (
          <LocationInfo 
            icon={FlagCheckered}
            label={arrival.label}
            description={arrival.description}
          />
        )
      }
    </Container>
  );
}