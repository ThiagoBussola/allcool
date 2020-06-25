import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Product, Brand, File, ProductFile } from '../../types';
import { ScrollView } from 'react-native-gesture-handler';
import { Title, Text, Headline } from 'react-native-paper';
import {
  rowStyle,
  detailsStyle,
  textSizeStyles,
  boldTextStyles,
} from '../../styles';
import { ProductService } from '../../service';

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

const initialFileProductValues: File = {
  id: 'a980d335-db8e-494f-b072-61040eab8433',
  date: '20/06/2020',
  name: 'goose-island-midway.png',
  type: 'goose-island-midway',
  url:
    'https://i.pinimg.com/originals/53/9d/ca/539dca03d85f4e100f91a338bce0d246.png',
};

const initialProductFile: ProductFile = {
  id: 'b10e0f37-155b-4ea3-a1e3-04d4d6c8534c',
  file: initialFileProductValues,
};

const ProductView: React.FC<Props> = ({
  navigation,
  route: {
    params: { productId },
  },
}) => {
  const [product, setProduct] = useState<Product>({});
  const [productFile, setProductFile] = useState<ProductFile>(
    initialProductFile
  );

  useEffect(() => {
    ProductService.findById(productId).then(({ data }) => setProduct(data));
  }, []);

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <View>
            <Title style={{ fontSize: 18 }}>{`${product.name}`}</Title>
          </View>

          <View style={{ height: 40, position: 'relative' }}>
            <Image
              style={{ width: 190, height: 205 }}
              source={{
                uri: productFile.file.url,
              }}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
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
            marginBottom: 20,
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
