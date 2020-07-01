import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductReviewDTO, ReviewDTO } from '../../types/dto';
import { Rating } from 'react-native-ratings';
import { mainStyles, rowStyle } from '../../styles';
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

const ProductReview: React.FC<Props> = ({
  navigation,
  route: {
    params: { product, userId },
  },
}) => {
  const [review, setReview] = useState<ReviewDTO>();
  const [showPic, setShowPic] = useState(false);
  const [rating, setRating] = useState(0);

  const isRated: boolean = rating > 0;

  const isPictureUploaded: boolean = !!(
    review &&
    review.file &&
    review.file.url
  );

  const viewPicButtonRatingMargin: string = isPictureUploaded ? '20%' : '10%';

  return (
    <>
      <ScrollView>
        <SafeAreaView style={mainStyles.container}>
          <View
            style={{
              height: 50,
              width: 320,
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

          <View
            style={{ marginTop: showPic ? '70%' : viewPicButtonRatingMargin }}
          >
            <Divider
              style={{ marginTop: '5%', marginBottom: '5%' }}
              accessibilityStates
            >
              <Text
                style={{ alignSelf: 'center', marginTop: '3%' }}
                accessibilityStates
              >
                Classificação
              </Text>
            </Divider>
            <View>
              <View style={{ marginTop: '5%' }}>
                <View>
                  <Rating
                    type="star"
                    startingValue={rating}
                    imageSize={25}
                    onFinishRating={(rating) => setRating(rating)}
                  />
                </View>
              </View>
            </View>
            <Divider style={{ marginTop: '5%' }} accessibilityStates />
            <View style={{ marginTop: '3%' }}>
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
                onChangeText={(value) => {}}
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
                  style={[
                    {
                      marginTop: '5%',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                    },
                    rowStyle,
                  ]}
                >
                  <View style={{ marginRight: '5%' }}>
                    <Chip
                      accessibilityStates
                      onPress={() => console.log('Pressed')}
                    >
                      Example
                    </Chip>
                  </View>
                  <View style={{ marginRight: '5%' }}>
                    <Chip
                      accessibilityStates
                      onPress={() => console.log('Pressed')}
                    >
                      Example
                    </Chip>
                  </View>
                  <View>
                    <Chip
                      accessibilityStates
                      onPress={() => console.log('Pressed')}
                    >
                      Example
                    </Chip>
                  </View>
                </View>
                <View
                  style={[
                    {
                      marginTop: '5%',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                    },
                    rowStyle,
                  ]}
                >
                  <View style={{ marginRight: '5%' }}>
                    <Chip
                      accessibilityStates
                      onPress={() => console.log('Pressed')}
                    >
                      Example
                    </Chip>
                  </View>
                  <View style={{ marginRight: '5%' }}>
                    <Chip
                      selected={true}
                      style={{ backgroundColor: '#ffbf00' }}
                      accessibilityStates
                      onPress={() => console.log('Pressed')}
                    >
                      Example
                    </Chip>
                  </View>
                  <View>
                    <Chip
                      accessibilityStates
                      onPress={() => console.log('Pressed')}
                    >
                      Example
                    </Chip>
                  </View>
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
          <View style={mainStyles.input}>
            <Button
              accessibilityStates
              mode="contained"
              theme={{
                colors: { primary: '#ffbf00' },
              }}
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
