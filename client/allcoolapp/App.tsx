import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, ProductList } from './src/screens';
import { createStackNavigator } from '@react-navigation/stack';

declare const global: { HermesInternal: null | {} };

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home">
            {() => <HomeScreen global={global} />}
          </Stack.Screen>
          <Stack.Screen name="Products">{() => <ProductList />}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
