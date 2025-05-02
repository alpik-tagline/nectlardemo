import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../screens/Home';
import ItemsList from '../screens/ItemsList';
import HomeImg from '../images/HomeIcon.png';
import CartImg from '../images/cartIcon.png';
import Account from '../images/account.png';
import Accounts from '../screens/Account';
import Explore1 from '../images/explore.png';
import Explore from '../screens/Explore';
import fav from '../images/fav.png';
import Favourite from '../screens/Favourite';

const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                source={HomeImg}
                style={{
                  width: 29,
                  height: 40,
                  marginTop: 22,
                  tintColor: focused ? '#53B175' : 'black',
                }}
              />
            );
          },
          tabBarLabel: () => null,
        }}
      />

      <BottomTab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Explore1}
              style={{
                width: 35,
                height: 32,
                marginTop: 25,
                tintColor: focused ? '#53B175' : 'black',
              }}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <BottomTab.Screen
        name="ItemsList"
        component={ItemsList}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={CartImg}
              style={{
                width: 20,
                height: 35,
                marginTop: 25,
                tintColor: focused ? '#53B175' : 'black',
              }}
            />
          ),
          tabBarLabel: () => null,
        }}
      />

      <BottomTab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={fav}
              style={{
                width: 45,
                height: 35,
                marginTop: 22,
                tintColor: focused ? '#53B175' : 'black',
              }}
            />
          ),
          tabBarLabel: () => null,
        }}
      />

      <BottomTab.Screen
        name="Account"
        component={Accounts}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={Account}
              style={{
                width: 42,
                height: 40,
                marginTop: 23,
                tintColor: focused ? '#53B175' : 'black',
              }}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNav;

const styles = StyleSheet.create({});
