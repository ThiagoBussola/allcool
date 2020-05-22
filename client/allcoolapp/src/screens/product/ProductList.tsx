import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import { RouteProp } from '@react-navigation/native';

type ProductsListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Products'
>;

type ProductsListRouteProp = RouteProp<RootStackParamList, 'Products'>;

type Props = {
  route: ProductsListRouteProp;
  navigation: ProductsListNavigationProp;
};

const ProductList: React.FC<Props> = ({ navigation, route: { params } }) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Products Screen</Text>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Review Product"
            onPress={() =>
              navigation.navigate('ProductReview', {
                product: { id: '1', name: 'Goose Island' },
                userId: params && params.userId,
              })
            }
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Go to Home"
            onPress={() => navigation.navigate('HomeScreen')}
          />
        </View>
      </View>
    </>
  );
};

export { ProductList };
