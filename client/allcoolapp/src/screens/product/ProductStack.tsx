import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductView, ProductList } from './';
import { rootStackOptions, screenStackOptions } from '../../styles';
import { ProductReview } from '../product-review/ProductReview';
import { RouteProp } from '@react-navigation/native';

export type ProductRootStackParamList = {
  ProductStack: { userId: string };
  Products: { userId: string };
  ProductView: { userId: string };
  ProductReview: { userId: string };
};

const RootStack = createStackNavigator<ProductRootStackParamList>();

type ProductStackRouteProp = RouteProp<
  ProductRootStackParamList,
  'ProductStack'
>;

type Props = {
  route: ProductStackRouteProp;
};

const ProductStack: React.FC<Props> = ({
  route: {
    params: { userId },
  },
}) => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="Products"
        screenOptions={rootStackOptions('Produtos')}
      >
        <RootStack.Screen
          name="Products"
          component={ProductList}
          initialParams={{ userId }}
        />
        <RootStack.Screen
          name="ProductView"
          options={screenStackOptions('Produto')}
          component={ProductView}
          initialParams={{ userId }}
        />
        <RootStack.Screen
          name="ProductReview"
          options={screenStackOptions('Avaliação')}
          component={ProductReview}
          initialParams={{ userId }}
        />
      </RootStack.Navigator>
    </>
  );
};

export { ProductStack };
