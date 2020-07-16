import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { LoginStack, TabsHomeStack } from './src/screens';
import { createStackNavigator } from '@react-navigation/stack';

const _MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
  },
};

//Type para se botar a rota e suas props
export type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <NavigationContainer theme={_MyTheme}>
        <RootStack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen name="Login" component={LoginStack} />
          <RootStack.Screen name="Tabs" component={TabsHomeStack} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
