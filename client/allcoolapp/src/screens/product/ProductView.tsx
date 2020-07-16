import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Product } from '../../types';
import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text, Headline } from 'react-native-paper';
import { detailsStyle, textSizeStyles, boldTextStyles } from '../../styles';
import { ProductService, ProductFileService } from '../../service';
import { ProductFileDTO } from '../../types/dto';

export type ProductViewStackParamList = {
  ProductView: { productId: string; userId: string };
};

type ProductViewNavigationProp = StackNavigationProp<
  ProductViewStackParamList,
  'ProductView'
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
    params: { productId, userId },
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

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: '1.2%', alignItems: 'center' }}>
          <View>
            <Title style={{ fontSize: 18 }}>{`${product.name}`}</Title>
          </View>
          {!!productFile.id && (
            <View style={{ height: 40, position: 'relative' }}>
              <Image
                style={{ width: 190, height: 205 }}
                source={{
                  uri: productFile.url,
                }}
                resizeMode="cover"
              />
            </View>
          )}
        </View>

        <View style={{ paddingHorizontal: '3.3%' }}>
          <View style={{ alignItems: 'flex-start' }}>
            <View style={{ marginTop: '53%' }}>
              <Headline
                style={[textSizeStyles, boldTextStyles]}
              >{`Sobre ${product.name}`}</Headline>
            </View>
            <View>
              <Text accessibilityStates>{`${product.description}`}</Text>
            </View>

            <View>
              <Headline style={[textSizeStyles, boldTextStyles]}>
                Harmonização
              </Headline>
            </View>
            <View>
              <Text accessibilityStates>{`${product.harmonization}`}</Text>
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
            {` ${product.type?.description}`}
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
            {` ${product.ibu}`}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export { ProductView };
