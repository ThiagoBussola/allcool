import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import { RouteProp } from '@react-navigation/native';

type ProductReviewNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Products'
>;

type ProductReviewRouteProp = RouteProp<RootStackParamList, 'ProductReview'>;

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
