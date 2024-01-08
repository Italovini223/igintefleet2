import { IconBox, IconBoxProps } from '../IconBox';
import { Container, Description, Info, Label } from './styles';

export type LocationInfoPros = {
  label: string;
  description: string;
}

type Props = LocationInfoPros & {
  icon: IconBoxProps
}

export function LocationInfo({ description, label, icon: Icon }: Props) {
  return (
    <Container>
      <IconBox 
        icon={Icon}
      />

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