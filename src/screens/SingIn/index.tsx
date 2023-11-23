import { useState, useEffect } from 'react'
import { Alert } from 'react-native'

import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import { Realm, useApp } from '@realm/react'

import { Container, Slogan, Title } from './styles'

import backgroundImg from '../../assets/background.png'
import { Button } from '../../components/Button'
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from '@env'

WebBrowser.maybeCompleteAuthSession();


export function SingIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const app = useApp()

  const [_, response, googleSingIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email']
  });

  useEffect(() => {
    if(response?.type === "success"){
      if(response.authentication?.idToken){
        const credentials = Realm.Credentials.jwt(response.authentication.idToken)
        app.logIn(credentials).catch((error) => {
          console.log(error);
          Alert.alert('Entrar', 'Nao foi possível conectar-se a sua conta google')
          setIsAuthenticating(false)
        })
      } else {
        Alert.alert('Entrar', 'Nao foi possível conectar-se a sua conta google')
        setIsAuthenticating(false)
      }
    }
  }, [response])
  
  function handleGoogleSingIn(){
    setIsAuthenticating(true)

    googleSingIn()
    .then((response) => {
      if(response.type !== "success"){
        setIsAuthenticating(false)
      }
    })

  }
  return (
    <Container source={backgroundImg}>
      <Title>
        Ignite Fleet
      </Title>

      <Slogan>
        Gestão de uso de veículos
      </Slogan>

      <Button 
        title='Entrar com Google' 
        onPress={handleGoogleSingIn}
        isLoading={isAuthenticating}
      />
    </Container>
  );
}