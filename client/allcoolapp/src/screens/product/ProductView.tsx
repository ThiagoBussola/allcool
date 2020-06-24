import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type ProductViewStackParamList = {
  Products: { userId: string } | undefined;
  ProductView: { productId: string; userId: string | undefined };
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

const ProductView: React.FC<Props> = ({
  navigation,
  route: {
    params: { productId },
  },
}) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Visualização do Produto</Text>
        <View style={{ marginTop: 10 }}>
          <Text>{productId}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Voltar"
            color="#ffbf00"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </>
  );
};

export { ProductView };
