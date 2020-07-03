import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductReviewDTO, ReviewDTO } from '../../types/dto';
import { ProductFlavor } from '../../types';
import { Rating } from 'react-native-ratings';
import { mainStyles } from '../../styles';
import {
  Card,
  Avatar,
  TextInput,
  Divider,
  Text,
  Button,
  Chip,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

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

const CameraIcon = (props) => (
  <Avatar.Icon {...props} icon="camera" style={{ backgroundColor: 'black' }} />
);

const initialValue = (product: ProductReviewDTO): ReviewDTO => ({
  id: '',
  user: {
    id: '',
    name: '',
  },
  product: {
    id: product.id,
    name: product.name,
  },
  file: undefined,
  description: '',
  rating: 0,
});

const dataSource = [
  'Volvo',
  'Alpha Sports',
  'Ford',
  'Gräf & Stift',
  'Aston Martin',
  'BMW',
  'Tarrant Automobile',
  'Push',
  'Österreichische Austro-Fiat',
  'Mazda',
  'Rosenbauer',
];

const color = ['red', '#66CCFF', '#FFCC00', '#1C9379', '#8A7BA7'];
const randomColor = () => {
  let col = color[Math.floor(Math.random() * color.length)];
  return col;
};

const ProductReview: React.FC<Props> = ({
  navigation,
  route: {
    params: { product, userId },
  },
}) => {
  const [review, setReview] = useState<ReviewDTO>(initialValue(product));
  const [flavors, setFlavors] = useState<ProductFlavor[]>([]);
  const [showPic, setShowPic] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const isRated: boolean = !!(review.rating && review.rating > 0);

  const isPictureUploaded: boolean = !!(
    review &&
    review.file &&
    review.file.url
  );

  return (
    <>
      <ScrollView>
        <SafeAreaView style={mainStyles.container}>
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
              marginTop: '5%',
            }}
          >
            <Card accessibilityStates onPress={() => {}}>
              <Card.Title
                accessibilityStates
                title="Foto"
                subtitle="Capture ou escolha uma foto do produto"
                left={CameraIcon}
              />
              {showPic ? (
                <>
                  <Card.Cover
                    accessibilityStates
                    source={{
                      uri:
                        'https://p2.piqsels.com/preview/443/865/234/beer-corona-extra-beach-lake-thumbnail.jpg',
                    }}
                    resizeMethod="auto"
                    resizeMode="contain"
                    style={{ height: 200, width: 320 }}
                  />
                  <Button
                    accessibilityStates
                    icon="arrow-up"
                    mode="contained"
                    theme={{
                      colors: { primary: '#ffbf00' },
                    }}
                    onPress={() => setShowPic(false)}
                  >
                    Ocultar
                  </Button>
                </>
              ) : (
                isPictureUploaded && (
                  <Button
                    accessibilityStates
                    icon="arrow-down"
                    mode="contained"
                    theme={{
                      colors: { primary: '#ffbf00' },
                    }}
                    onPress={() => setShowPic(true)}
                  >
                    Visualizar
                  </Button>
                )
              )}
            </Card>
          </View>

          <View>
            <View
              style={{
                marginTop: showPic ? '70%' : '0%',
              }}
            >
              <View
                style={{
                  marginTop: '5%',
                  marginBottom: '5%',
                }}
              >
                <Divider accessibilityStates />
              </View>
              <View>
                <View style={{ alignItems: 'flex-start' }}>
                  <Text accessibilityStates style={{ fontSize: 16 }}>
                    Classificação
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: '4%',
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
              <View style={{ alignItems: 'flex-start', marginTop: '5%' }}>
                <Text accessibilityStates style={{ fontSize: 16 }}>
                  O que você achou?
                </Text>
              </View>
              <TextInput
                accessibilityStates
                style={mainStyles.input}
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
                <View style={{ alignItems: 'flex-start', marginTop: '5%' }}>
                  <Text accessibilityStates style={{ fontSize: 16 }}>
                    Notou algum desses sabores?
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: '5%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
                  {dataSource.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          margin: '1%',
                        }}
                      >
                        <Chip
                          accessibilityStates
                          key={item + index}
                          mode="outlined"
                          textStyle={{ color: 'white', fontSize: 14 }} //label properties
                          style={{ backgroundColor: randomColor() }} //display diff color BG
                          onPress={() => Alert.alert('Clicked Chip' + item)}
                        >
                          {item}
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
              onPress={() => navigation.goBack()}
            >
              Avaliar
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export { ProductReview };
