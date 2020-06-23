import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductDTO } from '../../types/dto';
import { ProductService } from '../../service';
import { Divider, Title, Subheading, Searchbar } from 'react-native-paper';
import { listImageStyle, rowStyle } from '../../styles';

type ProductListStackParamList = {
  Products: { userId: string } | undefined;
  ProductView: { productId: string; userId: string | undefined };
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

const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;

const ProductList: React.FC<Props> = ({ navigation, route: { params } }) => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    ProductService.findAll().then(({ data }) => {
      setProducts(data);
      setFilteredProducts(data);
    });
  }, []);

  const filter = () => {
    const filteredArray = products.filter((p) =>
      p.name.trim().toLowerCase().includes(search.trim().toLowerCase())
    );

    setFilteredProducts(filteredArray);
  };

  const view = (product: ProductDTO) =>
    navigation.navigate(`ProductView`, {
      productId: product.id,
      userId: undefined,
    });

  return (
    <>
      <Searchbar
        accessibilityStates
        placeholder="Pesquisar"
        onChangeText={(text) => {
          if (text) {
            return setSearch(text);
          }

          setFilteredProducts(products);
        }}
        onBlur={filter}
        value={search}
      />
      <FlatList
        data={filteredProducts}
        style={{
          flex: 1,
          width: screenWidth,
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity onPress={() => view(item)}>
              <View style={rowStyle}>
                <View style={{ alignItems: 'flex-start', marginTop: 10 }}>
                  <Image
                    style={listImageStyle}
                    source={{
                      uri:
                        'https://i.pinimg.com/originals/53/9d/ca/539dca03d85f4e100f91a338bce0d246.png',
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View>
                  <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <Title>{item.name}</Title>
                  </View>
                  <View style={{ alignItems: 'flex-start' }}>
                    <Subheading>{`Categoria: ${item.type}`}</Subheading>
                  </View>
                  <View style={{ alignItems: 'flex-start' }}>
                    <Subheading>{`Marca: ${item.brand}`}</Subheading>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 10, backgroundColor: '#ffbf00' }}>
                <Divider accessibilityStates />
              </View>
            </TouchableOpacity>
          </>
        )}
      />
    </>
  );
};

export { ProductList };
