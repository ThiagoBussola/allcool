import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductView, ProductList, ProductReview } from '../../screens';
import { rootStackOptions, screenStackOptions } from '../../styles';
import { RouteProp } from '@react-navigation/native';
import { Button } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ProductRootStackParamList = {
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

type ProductDrawerNavigationProp = DrawerNavigationProp<
  ProductRootStackParamList,
  'ProductStack'
>;

type Props = {
  navigation: ProductDrawerNavigationProp;
  route: ProductStackRouteProp;
};

const ProductStack: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  const renderDrawerButton = () => {
    return (
      <TouchableOpacity
        style={{ marginLeft: 15 }}
        onPress={() => navigation.openDrawer()}
      >
        <MaterialCommunityIcons name="menu" color="white" size={36} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <RootStack.Navigator
        initialRouteName="Products"
        screenOptions={{
          ...rootStackOptions('Produtos'),
        }}
      >
        <RootStack.Screen
          name="Products"
          component={ProductList}
          initialParams={{ userId }}
          options={{
            ...screenStackOptions('Produtos'),
            headerLeft: () => renderDrawerButton(),
          }}
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
