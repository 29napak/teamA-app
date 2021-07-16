// App.js

import * as React from 'react';
import { Component } from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './comp/HomeScreen';
import TempScreen from './comp/TempScreen';
import ShopScreen from './comp/ShopScreen';




const Tab = createMaterialTopTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        //普通のアイコン
        tabBarIcon: ({ tintColor }) => <Icon size={24} name="home" color={tintColor} />,
        title: 'ホーム'
      }
    },
    TempScreen: {
      screen: TempScreen,
      navigationOptions: {
        //普通のアイコン
        tabBarIcon: ({ tintColor }) => <Image source={require('./assets/chart-bar-solid.png')} style={{ width: 24, height: 24, tintColor: tintColor }} />,
        title: 'グラフ'
      }
    },
    ShopScreen: {
      screen: ShopScreen,
      navigationOptions: {
        //カスタムアイコン
        tabBarIcon: ({ tintColor }) => <Image source={require('./assets/store-solid.png')} style={{ width: 24, height: 24, tintColor: tintColor }} />,
        title: 'ショップ'
      }
    },
  }, {
  initialRouteName: 'HomeScreen',
  swipeEnabled: true,

  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'red',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: '#ffff'
    }, indicatorStyle: {
      height: 0
    },
    showIcon: true
  }
}
);

export default class App extends React.Component {
  render() {

    const Layout = createAppContainer(Tab);

    return (
      <View style={{ flex: 1 }}>
        <Layout />
      </View>
    );
  }
  // return(
  //   <NavigationContainer>
  // <Tab.Navigator
  //   initialRouteName="Home"


  // >
  //   <Tab.Screen name="Shop" component={Shop}

  //   />
  //   <Tab.Screen name="Home" component={Home} />
  //   <Tab.Screen name="Temp" component={Temp} />

  // </Tab.Navigator>
  //   </NavigationContainer >
  // );
}

