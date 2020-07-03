import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { ProductReviewDTO, ProductFileDTO } from '../../types/dto';
import { Product } from '../../types';
import { ProductFileService, ProductService } from '../../service';
import { Title, Headline, Text } from 'react-native-paper';
import {
  textSizeStyles,
  boldTextStyles,
  detailsStyle,
  mainStyles,
} from '../../styles';

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

const initialProductFile: ProductFileDTO = {
  id: '',
  url: '',
};

const ProductView: React.FC<Props> = ({
  navigation,
  route: {
    params: { productId, userId = '1' },
  },
}) => {
  const [product, setProduct] = useState<Product>({});
  const [productFile, setProductFile] = useState<ProductFileDTO>(
    initialProductFile
  );

  useEffect(() => {
    ProductService.findById(productId)
      .then(({ data }) => setProduct(data))
      .then(() => {
        ProductFileService.findAllByProductId(productId).then(
          ({ data }) => data && setProductFile(data[0])
        );
      });
  }, [productId]);

  const onReview = () => {
    if (userId) {
      navigation.navigate('ProductReview', {
        product: { id: productId, name: product.name },
        userId,
      });
    }
  };

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={mainStyles.container}>
          <View style={{ marginTop: '1.2%' }}>
            <View>
              <Title style={{ fontSize: 18, alignSelf: 'center' }}>
                {product.name}
              </Title>
            </View>
            {!!productFile.id && (
              <View style={{ height: 40, alignSelf: 'center' }}>
                <Image
                  style={{ width: 190, height: 205 }}
                  source={{
                    uri: productFile.url,
                  }}
                  resizeMode="cover"
                />
              </View>
            )}
            <View style={{ marginTop: '50%' }}>
              <TouchableOpacity onPress={onReview}>
                <Rating
                  type="custom"
                  startingValue={product.rating}
                  readonly
                  imageSize={20}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={{ alignItems: 'flex-start' }}>
              <View style={{ marginTop: '5%' }}>
                <Headline
                  style={[textSizeStyles, boldTextStyles]}
                >{`Sobre ${product.name}`}</Headline>
              </View>
              <View>
                <Text accessibilityStates>{product.description}</Text>
              </View>

              <View>
                <Headline style={[textSizeStyles, boldTextStyles]}>
                  Harmonização
                </Headline>
              </View>
              <View>
                <Text accessibilityStates>{product.harmonization}</Text>
              </View>
              <View>
                <Headline style={[textSizeStyles, boldTextStyles]}>
                  Detalhes
                </Headline>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Text accessibilityStates style={detailsStyle}>
              <Text accessibilityStates style={boldTextStyles}>
                Categoria:
              </Text>
              {product.type && product.type.description}
            </Text>
            <Text accessibilityStates style={detailsStyle}>
              <Text accessibilityStates style={boldTextStyles}>
                Teor Alcoólico:
              </Text>
              {` ${product.alcoholContent}%`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: '6.6%',
            }}
          >
            <Text accessibilityStates style={detailsStyle}>
              <Text accessibilityStates style={boldTextStyles}>
                Temperatura Ideal:
              </Text>
              {` ${product.minimumTemperature}-${product.maximumTemperature}°C`}
            </Text>
            <Text accessibilityStates style={detailsStyle}>
              <Text accessibilityStates style={boldTextStyles}>
                IBU:
              </Text>
              {product.ibu}
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export { ProductView };
