import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductView, ProductList } from './';
import { Product } from 'src/types';

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
        screenOptions={{
          headerTitle: 'Produtos',
          headerStyle: {
            backgroundColor: '#ffbf00',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
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
