import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Product } from 'src/types';

export type ProductViewStackParamList = {
  Products: { userId: string } | undefined;
  ProductView: { product: Product; userId: string | undefined };
};

type ProductViewNavigationProp = StackNavigationProp<
  ProductViewStackParamList,
  'Products'
>;

type ProductViewRouteProp = RouteProp<ProductViewStackParamList, 'ProductView'>;

type Props = {
  navigation: ProductViewNavigationProp;
  route: ProductViewRouteProp;
};

const ProductView: React.FC<Props> = ({ navigation, route: { params } }) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Visualização do Produto</Text>
        <Text>{params.product.name}</Text>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Voltar"
            color="#ffbf00"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Visualizar Produtos"
            color="#ffbf00"
            onPress={() => navigation.navigate('Products')}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Voltar ao início da stack"
            color="#ffbf00"
            onPress={() => navigation.popToTop()}
          />
        </View>
      </View>
    </>
  );
};

export { ProductView };
