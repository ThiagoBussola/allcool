import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductReviewDTO, ReviewDTO } from '../../types/dto';
import { Rating } from 'react-native-ratings';
import { mainStyles } from '../../styles';
import {
  TextInput,
  Divider,
  Button,
  Chip,
  Subheading,
  Title,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { ProductFlavorService, ReviewService } from '../../service';
import { ProductReviewCard } from './ProductReviewCard';
import {
  SnackbarNotification,
  SnackbarState,
} from '../../components/SnackbarNotification';

export type ProductReviewStackParamList = {
  ProductView: { productId: string; userId: string | undefined };
  ProductReview: { product: ProductReviewDTO; userId: string };
};

type ProductReviewNavigationProp = StackNavigationProp<
  ProductReviewStackParamList,
  'ProductView'
>;

type ProductReviewRouteProp = RouteProp<
  ProductReviewStackParamList,
  'ProductReview'
>;

type Props = {
  navigation: ProductReviewNavigationProp;
  route: ProductReviewRouteProp;
};

const initialValue = (productId: string, userClientId: string): ReviewDTO => ({
  id: '',
  userClientId,
  productId,
  description: '',
  rating: 0,
  flavors: [],
});

const ProductReview: React.FC<Props> = ({
  navigation,
  route: {
    params: { product, userId },
  },
}) => {
  const [review, setReview] = useState<ReviewDTO>(
    initialValue(product.id!, userId)
  );
  const [showPic, setShowPic] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    visible: false,
  });

  useEffect(() => {
    if (product.id) {
      ProductFlavorService.findAllByProductId(product.id)
        .then(({ data }) =>
          setReview((prevState) => ({
            ...prevState,
            flavors: data,
          }))
        )
        .then(() =>
          setSnackbarState({
            message: 'Carregou',
            visible: true,
          })
        );
    }
  }, [product.id]);

  const isRated: boolean = !!(review.rating && review.rating > 0);

  const submitReview = () =>
    ReviewService.saveReview(review)
      .then(() => navigation.goBack())
      .catch(({ response }) => console.log(response));

  const handleChange = (name: string, value) => {};

  return (
    <>
      <ScrollView>
        <SafeAreaView style={mainStyles.container}>
          <View style={{ alignItems: 'flex-start', marginTop: '3%' }}>
            <Title style={{ fontSize: 16 }}>Produto</Title>
          </View>
          <View style={{ alignItems: 'flex-start' }}>
            <Subheading style={{ fontSize: 12 }}>{product.name}</Subheading>
          </View>

          <ProductReviewCard showPic={showPic} setShowPic={setShowPic} />

          <View>
            <View>
              <View
                style={{
                  marginTop: '5%',
                }}
              >
                <Divider accessibilityStates />
              </View>
              <View>
                <View style={{ alignItems: 'flex-start', marginTop: '3%' }}>
                  <Title style={{ fontSize: 16 }}>Classificação</Title>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: '2%',
                    alignItems: 'flex-start',
                  }}
                >
                  <View>
                    <Rating
                      type="star"
                      startingValue={review.rating}
                      imageSize={30}
                      onFinishRating={(rating) => {
                        setReview((prevReview) => ({
                          ...prevReview,
                          rating,
                        }));
                        setIsValid(true);
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    marginTop: '5%',
                  }}
                >
                  <Divider accessibilityStates />
                </View>
              </View>
            </View>

            <View>
              <View style={{ alignItems: 'flex-start', marginTop: '3%' }}>
                <Title style={{ fontSize: 16 }}>O que você achou?</Title>
              </View>
              <TextInput
                accessibilityStates
                style={[mainStyles.input, { width: '100%', marginTop: '1%' }]}
                mode="outlined"
                placeholder="Comenta aí!"
                theme={{
                  colors: { primary: '#ffbf00' },
                }}
                multiline={true}
                maxLength={200}
                onChangeText={(value) =>
                  setReview((prevState) => ({
                    ...prevState,
                    description: value,
                  }))
                }
              />
            </View>

            {isRated && (
              <>
                <View
                  style={{
                    marginTop: '5%',
                  }}
                >
                  <Divider accessibilityStates />
                </View>
                <View style={{ alignItems: 'flex-start', marginTop: '3%' }}>
                  <Title style={{ fontSize: 16 }}>
                    Notou algum desses sabores?
                  </Title>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: '5%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
                  {review?.flavors?.map((flavor, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          margin: '1%',
                        }}
                      >
                        <Chip
                          accessibilityStates
                          key={flavor.id}
                          mode="outlined"
                          textStyle={{ color: 'black', fontSize: 14 }}
                          selectedColor="#ffbf00"
                          style={{ backgroundColor: '#f7f7f7' }}
                          onPress={() =>
                            Alert.alert('Clicked Chip' + flavor.description)
                          }
                        >
                          {flavor.description}
                        </Chip>
                      </View>
                    );
                  })}
                </View>
              </>
            )}
          </View>
        </SafeAreaView>
        <View
          style={[
            mainStyles.container,
            { marginBottom: '5%', marginTop: '5%' },
          ]}
        >
          <View>
            <Button
              accessibilityStates
              mode="contained"
              theme={{
                colors: { primary: '#ffbf00' },
              }}
              disabled={!isValid}
              onPress={() => submitReview()}
            >
              Avaliar
            </Button>
          </View>
        </View>
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

export { ProductReview };
