import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginContainer } from './LoginContainer';

export type RootStackParamList = {
  Login: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const LoginStack: React.FC = () => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Login" component={LoginContainer} />
      </RootStack.Navigator>
    </>
  );
};

export { LoginStack };
