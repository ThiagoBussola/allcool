import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { Product } from '../../types';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Title, Text, Headline } from 'react-native-paper';
import {
  detailsStyle,
  textSizeStyles,
  boldTextStyles,
  mainStyles,
} from '../../styles';
import {
  ProductService,
  ProductFileService,
  ReviewService,
} from '../../service';
import { ProductFileDTO } from '../../types/dto';
import {
  ProductViewNavigationProp,
  ProductViewRouteProp,
} from '../../navigation';
import { Rating } from 'react-native-ratings';
import { SnackbarNotification, SnackbarState } from '../../components';

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
  const [productReviewed, setProductReviewed] = useState(false);
  const [product, setProduct] = useState<Product>({});
  const [productFile, setProductFile] = useState<ProductFileDTO>(
    initialProductFile
  );
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    visible: false,
  });

  useEffect(() => {
    ProductService.findById(productId)
      .then(({ data }) => setProduct(data))
      .then(() =>
        ReviewService.isProductReviewed(productId, userId).then(({ data }) =>
          setProductReviewed(data)
        )
      )
      .then(() =>
        ProductFileService.findAllByProductId(productId).then(
          ({ data }) => data && setProductFile(data[0])
        )
      )
      .catch(({ response }) =>
        setSnackbarState({
          message: response.data?.message || response.data,
          visible: true,
        })
      );
  }, [productId, userId]);

  const onReview = () => {
    if (userId && !productReviewed) {
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
              <TouchableOpacity onPress={onReview} disabled={productReviewed}>
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
              {` ${product.type && product.type.description}`}
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
        </SafeAreaView>
      </ScrollView>
      <SnackbarNotification
        snackbarState={snackbarState}
        dismissSnackbar={() =>
          setSnackbarState({
            message: '',
            visible: false,
          })
        }
      />
    </>
  );
};

export { ProductView };
