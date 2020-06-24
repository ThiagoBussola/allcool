import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductView, ProductList } from './';
import { Product } from '../../types';
import { screenOptions } from '../../styles';

//Type para se botar a rota e suas props
export type RootStackParamList = {
  Products: { userId: string } | undefined;
  ProductView: { product: Product; userId: string | undefined };
};

const RootStack = createStackNavigator<RootStackParamList>();

const ProductStack: React.FC = () => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="Products"
        screenOptions={screenOptions('Produtos')}
      >
        <RootStack.Screen
          name="Products"
          component={ProductList}
          initialParams={{ userId: '1' }}
        />
        <RootStack.Screen
          name="ProductView"
          options={{ headerTitle: 'Produto' }}
          component={ProductView}
        />
      </RootStack.Navigator>
    </>
  );
};

export { ProductStack };
