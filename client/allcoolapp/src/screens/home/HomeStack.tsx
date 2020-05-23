import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './HomeScreen';
import { ProductList } from '../product/ProductList';

export type Product = {
  id: string;
  name: string;
};

//Type para se botar a rota e suas props
export type RootStackParamList = {
  HomeScreen: { userId: string } | undefined;
  Products: { userId: string } | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const HomeStack: React.FC = () => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ba0c2f',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <RootStack.Screen
          name="HomeScreen"
          component={HomeScreen}
          initialParams={{ userId: '1' }}
        />
        <RootStack.Screen
          name="Products"
          component={ProductList}
          initialParams={{ userId: '1' }}
        />
      </RootStack.Navigator>
    </>
  );
};

export { HomeStack };
