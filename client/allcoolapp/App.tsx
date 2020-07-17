import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AppRootStack, LoginStack, DrawerStack } from './src/navigation';

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

const App = () => {
  return (
    <>
      <NavigationContainer theme={_MyTheme}>
        <AppRootStack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <AppRootStack.Screen name="Login" component={LoginStack} />
          <AppRootStack.Screen name="Drawer" component={DrawerStack} />
        </AppRootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
