import 'react-native-get-random-values'
import './src/libs/dayjs'

import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { AppProvider, UserProvider } from '@realm/react'

import { RealmProvider, syncConfig } from './src/libs/realm'

import { ThemeProvider} from 'styled-components/native'
import theme from './src/theme';

import { useNetInfo } from '@react-native-community/netinfo'

import { REALM_APP_ID } from '@env'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import {StatusBar } from 'react-native'

import { SingIn } from './src/screens/SingIn'

import { WifiSlash } from 'phosphor-react-native'

import { Loading } from './src/components/Loading'

import { Routes } from './src/routes';
import { TopMessage } from './src/components/TopMessage'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold});

  const netInfo = useNetInfo();
  if(!fontsLoaded){
    return(
      <Loading />
    )
  }
  return (
    <AppProvider id={REALM_APP_ID}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.COLORS.GRAY_800}}>
          {
            !netInfo.isConnected &&
            <TopMessage 
              title='Voce esta offline.'
              icon={WifiSlash}
            />  
          }
          <StatusBar 
            barStyle="light-content" 
            backgroundColor="transparent" 
            translucent 
          />
          <UserProvider fallback={SingIn}>
            <RealmProvider sync={syncConfig} fallback={Loading}>
              <Routes />
            </RealmProvider>
          </UserProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppProvider>
  );
}

