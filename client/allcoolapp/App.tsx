import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ProductStack, PartnerStack } from './src/screens';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//Type para se botar a rota e suas props
export type RootStackParamList = {
  Partners: undefined;
  Products: { userId: string } | undefined;
};

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Products"
          activeColor="#ffbf00"
          shifting={false}
          keyboardHidesNavigationBar={true}
          barStyle={{ backgroundColor: '#ffffff' }}
        >
          <Tab.Screen
            name="Products"
            component={ProductStack}
            options={{
              tabBarLabel: 'Produtos',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="beer" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Partners"
            component={PartnerStack}
            options={{
              tabBarLabel: 'Parceiros',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account-multiple"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
