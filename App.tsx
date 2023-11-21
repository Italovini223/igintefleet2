import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import { } from 'react-native'

import { ThemeProvider} from 'styled-components/native'
import theme from './src/theme';

import { SingIn } from './src/screens/SingIn';
import { Loading } from './src/components/Loading';
export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold});

  if(!fontsLoaded){
    return(
      <Loading />
    )
  }
  return (
    <ThemeProvider theme={theme}>
      <SingIn />
    </ThemeProvider>
  );
}

