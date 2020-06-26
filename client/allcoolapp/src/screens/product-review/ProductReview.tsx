import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductReviewDTO } from '../../types/dto';

export type ProductViewStackParamList = {
  ProductView: { productId: string; userId: string | undefined };
  ProductReview: { product: ProductReviewDTO; userId: string };
};

type ProductViewNavigationProp = StackNavigationProp<
  ProductViewStackParamList,
  'ProductView'
>;

type ProductViewRouteProp = RouteProp<
  ProductViewStackParamList,
  'ProductReview'
>;

type Props = {
  navigation: ProductViewNavigationProp;
  route: ProductViewRouteProp;
};

const ProductView: React.FC<Props> = ({
  navigation,
  route: {
    params: { product, userId },
  },
}) => {
  const [rating, setRating] = useState(4.5);
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Review</Text>
        <View style={{ marginTop: 50 }}>
          <Button
            title="Review"
            color="#ffbf00"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </>
  );
};

export { ProductView };
