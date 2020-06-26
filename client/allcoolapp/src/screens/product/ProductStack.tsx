import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductView, ProductList } from './';
import { ProductReviewDTO } from '../../types/dto';
import { rootStackOptions, screenStackOptions } from '../../styles';

//Type para se botar a rota e suas props
export type RootStackParamList = {
  Products: { userId: string } | undefined;
  ProductView: { productId: string; userId: string | undefined };
  ProductReview: { product: ProductReviewDTO; userId: string };
};

const RootStack = createStackNavigator<RootStackParamList>();

const ProductStack: React.FC = () => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="Products"
        screenOptions={rootStackOptions('Produtos')}
      >
        <RootStack.Screen
          name="Products"
          component={ProductList}
          initialParams={{ userId: '1' }}
        />
        <RootStack.Screen
          name="ProductView"
          options={screenStackOptions('Produto')}
          component={ProductView}
        />
        <RootStack.Screen
          name="ProductReview"
          options={screenStackOptions('Avaliação')}
          component={ProductView}
        />
      </RootStack.Navigator>
    </>
  );
};

export { ProductStack };
