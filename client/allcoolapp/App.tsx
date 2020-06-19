import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { ProductStack, PartnerStack, LoginStack } from './src/screens';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';

//Type para se botar a rota e suas props
export type RootStackParamList = {
  Partners: undefined;
  Products: { userId: string } | undefined;
};

const RootStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return(
    <Tab.Navigator initialRouteName="Products" activeColor="#ffbf00" shifting={false}
        keyboardHidesNavigationBar={true} barStyle={{ backgroundColor: '#ffffff' }}>

      <Tab.Screen name="Products" component={ProductStack}
        options={{tabBarLabel: 'Produtos',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="beer" color={color} size={26} />
        )}}
      />

      <Tab.Screen name="Partners" component={PartnerStack}
        options={{ tabBarLabel: 'Parceiros',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
        )}}
      />

    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="LoginContainer">
          <RootStack.Screen name="LoginContainer" component={LoginStack}/>
          <RootStack.Screen name="Products" component={Tabs}/>
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
