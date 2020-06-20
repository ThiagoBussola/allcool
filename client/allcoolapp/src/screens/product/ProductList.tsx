import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Product } from 'src/types';

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

type ProductDTO = {
  id: string;
  productType: string;
  name: string;
};

const ProductList: React.FC<Props> = ({ navigation, route: { params } }) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  return (
    <>
      <ScrollView>
        <FlatList
          data={products}
          keyExtractor={(product) => product.id}
          renderItem={({ item }) => (
            <View style={{ alignItems: 'center', height: 50 }}>
              <Image
                style={{ width: 200, height: 215 }}
                source={{
                  uri:
                    'https://i.pinimg.com/originals/53/9d/ca/539dca03d85f4e100f91a338bce0d246.png',
                }}
                resizeMode="cover"
              />
            </View>
          )}
        />
      </ScrollView>
    </>
  );
};

export { ProductList };
