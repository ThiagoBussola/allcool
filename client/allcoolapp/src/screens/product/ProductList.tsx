import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Product } from 'src/types';
import requestExecutor from 'src/service/AxiosService';

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
  const [text, setText] = useState('');

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
        <View style={{ marginTop: 10 }}>
          <Text>{text}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            color="#ffbf00"
            title="SIM"
            onPress={() =>
              requestExecutor
                .get('/auth/test')
                .then(({ data }) => setText(data))
            }
          />
        </View>
      </View>
    </>
  );
};

export { ProductList };
