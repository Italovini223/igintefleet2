import { TouchableOpacityProps} from 'react-native'
import { Container, Title, Loading } from './styles';


type props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
}


export function Button({title, isLoading = false, ...rest}: props) {
  return (
    <Container
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {
        isLoading ?
        <Loading /> :
        <Title >{title}</Title>
      }
    </Container>
  );
}