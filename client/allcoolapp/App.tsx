import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, ProductList } from './src/screens';
import { createStackNavigator } from '@react-navigation/stack';

//Type para se botar a rota e suas props
export type RootStackParamList = {
  HomeScreen: undefined;
  Products: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="HomeScreen">
          <RootStack.Screen name="HomeScreen" component={HomeScreen} />
          <RootStack.Screen name="Products" component={ProductList} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
