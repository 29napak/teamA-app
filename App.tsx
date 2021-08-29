
import * as React from 'react';
import { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './comp/HomeScreen';
import TempScreen from './comp/TempScreen';
import ShopScreen from './comp/ShopScreen';


import Main from './comp/Main';

const CustomTabBarButton = ({ childen, onPress }) => {
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <view style={{
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: "red"

    }}>
      {childen}
    </view>
  </TouchableOpacity>
}



const Tab = createMaterialTopTabNavigator(
  {


    ShopScreen: {
      screen: ShopScreen,
      navigationOptions: {
        //カスタムアイコン
        tabBarIcon: ({ tintColor }) => <Image source={require('./assets/store-solid.png')} style={{ width: 24, height: 24, tintColor: tintColor }} />,
        title: 'ショップ'
      }
    },
    HomeScreen: { // big plus icon in the middle
      screen: HomeScreen,

      navigationOptions: {

        //カスタムアイコン
        tabBarIcon: ({ tintColor }) =>

          <Image source={require('./assets/K.on_logo3.png')}
            style={{

              width: 50,
              height: 50,
              resizeMode: "contain",
            }} />,
        title: ""

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


  }, {
  initialRouteName: 'HomeScreen',


  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#b46617',
    inactiveTintColor: '#1f2b14',
    showLabel: true,
    showIcon: true,
    style: {
      position: 'absolute',
      bottom: 25,
      left: 20,
      right: 20,
      elevation: 0,
      backgroundColor: "#ffff",
      borderRadius: 15,
      height: 70,

    },
    indicatorStyle: {
      height: 0
    },

  },


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
}


