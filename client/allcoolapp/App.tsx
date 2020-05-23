import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ProductStack, HomeStack } from './src/screens';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type Product = {
  id: string;
  name: string;
};

//Type para se botar a rota e suas props
export type RootStackParamList = {
  HomeStack: undefined;
  Products: { userId: string } | undefined;
};

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeStack"
          activeColor="#ffffff"
          barStyle={{ backgroundColor: '#ba0c2f' }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: 'green',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Products"
            component={ProductStack}
            options={{
              tabBarLabel: 'Products',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="beer" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
