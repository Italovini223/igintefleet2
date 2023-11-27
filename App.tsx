import 'react-native-get-random-values'

import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { AppProvider, UserProvider } from '@realm/react'

import { RealmProvider } from './src/libs/realm'

import { ThemeProvider} from 'styled-components/native'
import theme from './src/theme';

import { REALM_APP_ID } from '@env'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import {StatusBar } from 'react-native'

import { SingIn } from './src/screens/SingIn'

import { Loading } from './src/components/Loading'

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold});

  if(!fontsLoaded){
    return(
      <Loading />
    )
  }
  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800}}>
          <StatusBar 
            barStyle="light-content" 
            backgroundColor="transparent" 
            translucent 
          />
          <UserProvider fallback={SingIn}>
            <RealmProvider>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

