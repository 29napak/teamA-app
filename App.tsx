// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from './comp/HomeScreen';
import tempScreen from './comp/tempScreen';
import ShopScreen from './comp/ShopScreen';



const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Temp" component={tempScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

