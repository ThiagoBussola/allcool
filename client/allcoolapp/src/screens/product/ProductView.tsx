import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Product, Brand, File, Container, ProductFile } from 'src/types';
import { Card, Divider } from 'react-native-paper';
import { styles } from 'src/styles';
import { ScrollView } from 'react-native-gesture-handler';

export type ProductViewStackParamList = {
  Products: { userId: string } | undefined;
  ProductView: { product: Product; userId: string | undefined };
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

const initialFileBrandValues: File = {
  id: 'ff7da553-9dd4-4be3-8576-f9bc89413f5c',
  date: '20/06/2020',
  name: 'goose-island-midway-355ml.png',
  type: 'goose-island-midway-355ml',
  url: 'www.allcool.com/goose/goose-island-midway/355ml.png',
};

const initialFileProductValues: File = {
  id: 'a980d335-db8e-494f-b072-61040eab8433',
  date: '20/06/2020',
  name: 'goose-island-midway.png',
  type: 'goose-island-midway',
  url:
    'https://i.pinimg.com/originals/53/9d/ca/539dca03d85f4e100f91a338bce0d246.png',
};

const initialBrandValues: Brand = {
  id: '108ecc40-7d73-47ab-86dc-a672585f48da',
  file: initialFileBrandValues,
  name: 'Goose Island',
};

const initialProductValues: Product = {
  id: '14d304d3-c965-4875-8f53-86d20bb7d0aa',
  active: true,
  brand: initialBrandValues,
  code: 1,
  containers: [],
  description:
    'Com 4,1% de teor alcoólico, 30 IBU e aroma de frutas tropicais, a ' +
    'Midway IPA é uma Session IPA leve e refrescante. Ela tem sua ' +
    'história toda ligada a Chicago. Seu nome é originário da Feira ' +
    'Mundial da cidade, de 1893. Em seu centro, estava a Midway ' +
    'Plaisance, uma área que exibia a primeira roda gigante do mundo, ' +
    'reunindo visitantes de todas as nacionalidades. Nesse espírito, a ' +
    'cerveja é uma session pronta para reunir amantes de cerveja de ' +
    'todos os cantos do planeta.',
  flavors: [],
  harmonization:
    'Harmoniza com comida Mexicana (Tacos e quesadilha), chicken wings ' +
    'e hambúrguer',
  ibu: 30,
  minimumTemperature: 4,
  maximumTemperature: 8,
  name: 'Goose Island Midway',
  type: {
    id: 'eac45d3f-2eca-4e48-a86a-a801816f41d3',
    code: 1,
    description: 'Session IPA',
  },
  alcoholContent: 4.1,
};

const initialProductFile: ProductFile = {
  id: 'b10e0f37-155b-4ea3-a1e3-04d4d6c8534c',
  file: initialFileProductValues,
};

const ProductView: React.FC<Props> = ({ navigation, route: { params } }) => {
  const [product, setProduct] = useState<Product>(initialProductValues);
  const [productFile, setProductFile] = useState<ProductFile>(
    initialProductFile
  );

  return (
    <>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {`${product.name}`}
              </Text>
            </View>

            <View style={{ height: 50, position: 'relative' }}>
              <Image
                style={{ width: 200, height: 215 }}
                source={{
                  uri: productFile.file.url,
                }}
                resizeMode="cover"
              />
            </View>

            <View style={{ paddingHorizontal: 10, marginTop: 200 }}>
              <Text
                style={{ fontWeight: 'bold' }}
              >{`Sobre ${product.name}`}</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <Text>{`${product.description}`}</Text>
            </View>

            <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Harmonização</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <Text>{`${product.harmonization}`}</Text>
            </View>
            <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Detalhes</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                width: '50%',
                paddingHorizontal: 10,
              }}
            >
              {`Categoria: ${product.type?.description}`}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                width: '50%',
                paddingHorizontal: 10,
              }}
            >
              {`Teor Alcoólico: ${product.alcoholContent}%`}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                width: '50%',
                paddingHorizontal: 10,
              }}
            >
              {`Temperatura Ideal: ${product.minimumTemperature}-${product.maximumTemperature}°C`}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                width: '50%',
                paddingHorizontal: 10,
              }}
            >{`IBU: ${product.ibu}`}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export { ProductView };
