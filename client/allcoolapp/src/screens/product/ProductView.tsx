import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductReviewDTO } from 'src/types/dto';

export type ProductViewStackParamList = {
  Products: { userId: string } | undefined;
  ProductView: { productId: string; userId: string | undefined };
  ProductReview: { product: ProductReviewDTO; userId: string };
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
    params: { productId, userId = '1' },
  },
}) => {
  const [rating, setRating] = useState(4.5);

  const onReview = () => {
    if (userId) {
      navigation.navigate('ProductReview', {
        product: { id: productId, name: 'Goose' },
        userId,
      });
    }
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Visualização do Produto</Text>
        <View style={{ marginTop: 10 }}>
          <Text>{productId}</Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity onPress={onReview}>
            <Rating
              type="custom"
              startingValue={rating}
              readonly
              imageSize={20}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 50 }}>
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
