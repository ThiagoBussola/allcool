import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ProductDTO } from '../../types/dto';
import { ProductService } from '../../service';
import { Divider, Title, Subheading, Searchbar } from 'react-native-paper';
import { listImageStyle, rowStyle } from '../../styles';
import {
  ProductsListRouteProp,
  ProductsListNavigationProp,
} from '../../navigation';

type Props = {
  route: ProductsListRouteProp;
  navigation: ProductsListNavigationProp;
};

const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;

const ProductList: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
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
    });

  const handleChange = (text: string) => {
    if (text) {
      return setSearch(text);
    }

    setFilteredProducts(products);
    setSearch('');
  };

  return (
    <>
      <Searchbar
        accessibilityStates
        placeholder="Pesquisar"
        onChangeText={(text) => handleChange(text)}
        onBlur={filter}
        value={search}
      />
      {filteredProducts && filteredProducts.length > 0 ? (
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
                        uri: item.imageUrl,
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <View style={{ alignItems: 'flex-start', marginTop: 10 }}>
                      <Title>{item.name}</Title>
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                      <Subheading
                        style={{ fontSize: 12 }}
                      >{`Categoria: ${item.type}`}</Subheading>
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                      <Subheading
                        style={{ fontSize: 12 }}
                      >{`Marca: ${item.brand}`}</Subheading>
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
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', marginTop: '50%' }}>
            <Image
              style={listImageStyle}
              source={require('../../img/AllcoolV1.1.png')}
              resizeMode="contain"
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Subheading>Nenhum produto encontrado</Subheading>
          </View>
        </View>
      )}
    </>
  );
};

export { ProductList };
