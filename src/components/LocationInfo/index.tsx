import { Container, Description, Info, Label } from './styles';

export type LocationInfoPros = {
  label: string;
  description: string;
}

type Props = LocationInfoPros

export function LocationInfo({ description, label }: Props) {
  return (
    <Container>
      <Info>
        <Label numberOfLines={1}>
          {label}
        </Label>

        <Description numberOfLines={1}>
          {description}
        </Description>
      </Info>
    </Container>
  )
}