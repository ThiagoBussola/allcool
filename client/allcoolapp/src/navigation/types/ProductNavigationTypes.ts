import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type ProductListStackParamList = {
  Products: { userId: string };
  ProductView: { productId: string };
};

export type ProductsListNavigationProp = StackNavigationProp<
  ProductListStackParamList,
  'Products'
>;

export type ProductsListRouteProp = RouteProp<
  ProductListStackParamList,
  'Products'
>;

type ProductViewStackParamList = {
  ProductView: { productId: string; userId: string };
};

export type ProductViewNavigationProp = StackNavigationProp<
  ProductViewStackParamList,
  'ProductView'
>;

export type ProductViewRouteProp = RouteProp<
  ProductViewStackParamList,
  'ProductView'
>;
