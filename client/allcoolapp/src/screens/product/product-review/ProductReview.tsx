import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Product } from 'App';

export type ProductReviewStackParamList = {
  Products: { userId: string } | undefined;
  ProductReview: { product: Product; userId: string | undefined };
};

type ProductReviewNavigationProp = StackNavigationProp<
  ProductReviewStackParamList,
  'Products'
>;

type ProductReviewRouteProp = RouteProp<
  ProductReviewStackParamList,
  'ProductReview'
>;

type Props = {
  navigation: ProductReviewNavigationProp;
  route: ProductReviewRouteProp;
};

const ProductReview: React.FC<Props> = ({ navigation, route: { params } }) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Product Review</Text>
        <Text>{params.product.name}</Text>
        <View style={{ marginTop: 10 }}>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Go to Products"
            onPress={() => navigation.navigate('Products')}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Go back to first screen in stack"
            onPress={() => navigation.popToTop()}
          />
        </View>
      </View>
    </>
  );
};

export { ProductReview };
