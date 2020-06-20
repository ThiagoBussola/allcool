import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { LoginStack, TabsHomeStack } from './src/screens';
import { createStackNavigator } from '@react-navigation/stack';

//Type para se botar a rota e suas props
export type RootStackParamList = {
  Partners: undefined;
  Products: { userId: string } | undefined;
};

const RootStack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="LoginContainer"
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name="LoginContainer" component={LoginStack} />
          <RootStack.Screen name="Products" component={TabsHomeStack} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
