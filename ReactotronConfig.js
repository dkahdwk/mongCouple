import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// eslint-disable-next-line max-len
Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({ host: '192.168.1.230' }) // controls connection & communication settings
  .useReactNative({
    networking: true,
  }) // add all built-in react native plugins
  .connect(); // let's connect!
