import  AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_ASYNC_KEY = '@ignitefleet2:last_sync';

export async function saveLastSyncTimestamp(){
  const timeStamp = new Date().getTime();
  await AsyncStorage.setItem( STORAGE_ASYNC_KEY, timeStamp.toString());

  return timeStamp;
}

export async function getLastSyncTimestamp(){
  const response = await AsyncStorage.getItem(STORAGE_ASYNC_KEY);

  return Number(response);
}