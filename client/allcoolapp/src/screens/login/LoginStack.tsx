import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginContainer } from './LoginContainer';

export type RootStackParamList = {
  LoginContainer: { userId: string } | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const LoginStack: React.FC = () => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="LoginContainer"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen
          name="LoginContainer"
          component={LoginContainer}
          initialParams={{ userId: '1' }}
        />
      </RootStack.Navigator>
    </>
  );
};

export { LoginStack };
