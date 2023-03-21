import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import signin from '../screens/Login';
import Landing from '../screens/Landing';
import AppRoute from './AppRoute';
const AuthStack = createStackNavigator();
function AuthRoute(props) {
  return (
    <AuthStack.Navigator initialRouteName="Landing">
      <AuthStack.Screen
        name="SignIn"
        component={signin}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Landing"
        component={Landing}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="AppRoute"
        component={AppRoute}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

export default AuthRoute;
