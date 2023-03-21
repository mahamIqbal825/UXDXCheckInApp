import React, {useState, useEffect} from 'react';
import AppRoute from './Src/routes/AppRoute';
import AuthRoute from './Src/routes/AuthRoute';
import {NavigationContainer} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {ToastProvider} from 'react-native-toast-notifications';
//import SplashScreen from 'react-native-splash-screen';

function App(props) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 1000);
    GoogleSignin.configure({
      iosClientId:
        '674292985031-vf8dl7ub0khtv6agvrd1fsfv222ph5cc.apps.googleusercontent.com',
      webClientId:
        '674292985031-7m2etpp0pmcieb22kf2euv6lstor1bf2.apps.googleusercontent.com',
    });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  };

  if (initializing) return null;

  return (
    <ToastProvider
      textStyle={{fontSize: 14, color: '#9B1C1C', marginLeft: 10}}
      style={{
        width: '80%',
        marginBottom: 40,
        borderWidth: 1,
        borderColor: '#9B1C1C',
      }}>
      <NavigationContainer>
        {user ? <AppRoute /> : <AuthRoute />}
      </NavigationContainer>
    </ToastProvider>
  );
}

export default App;
