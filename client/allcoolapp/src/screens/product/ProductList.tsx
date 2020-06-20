import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Product } from '../../types';
import requestExecutor from '../../service/AxiosService';

type ProductListStackParamList = {
  Products: { userId: string } | undefined;
  ProductView: { product: Product; userId: string | undefined };
};

type ProductsListNavigationProp = StackNavigationProp<
  ProductListStackParamList,
  'Products'
>;

type ProductsListRouteProp = RouteProp<ProductListStackParamList, 'Products'>;

type Props = {
  route: ProductsListRouteProp;
  navigation: ProductsListNavigationProp;
};

const ProductList: React.FC<Props> = ({ navigation, route: { params } }) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Listagem de Produtos</Text>
        <View style={{ marginTop: 10 }}>
          <Button
            color="#ffbf00"
            title="Visualizar Produto"
            onPress={() =>
              navigation.navigate('ProductView', {
                product: { id: '1', name: 'Goose Island' },
                userId: params && params.userId,
              })
            }
          />
        </View>
      </View>
    </>
  );
};

export { ProductList };
