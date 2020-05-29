import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductReview } from './product-review/ProductReview';
import { ProductList } from './ProductList';

export type Product = {
  id: string;
  name: string;
};

//Type para se botar a rota e suas props
export type RootStackParamList = {
  Products: { userId: string } | undefined;
  ProductReview: { product: Product; userId: string | undefined };
};

const RootStack = createStackNavigator<RootStackParamList>();

const ProductStack: React.FC = () => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="Products"
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
          name="Products"
          component={ProductList}
          initialParams={{ userId: '1' }}
        />
        <RootStack.Screen name="ProductReview" component={ProductReview} />
      </RootStack.Navigator>
    </>
  );
};

export { ProductStack };
