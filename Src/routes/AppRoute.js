import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CheckInListScreen from '../screens/CheckInListScreen';
import EventList from '../screens/EventList';
const AppStack = createStackNavigator();
function AppRoute(props) {
  return (
    <AppStack.Navigator initialRouteName="EventList">
      <AppStack.Screen
        name="CheckInListScreen"
        component={CheckInListScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name="EventList"
        component={EventList}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
}

export default AppRoute;
