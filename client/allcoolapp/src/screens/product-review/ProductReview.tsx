import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ProductReviewDTO } from '../../types/dto';
import { Rating } from 'react-native-ratings';
import { mainStyles } from '../../styles';
import {
  Card,
  Avatar,
  FAB,
  TextInput,
  Divider,
  Text,
  Button,
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
  const [showPic, setShowPic] = useState(false);
  const [showFab, setShowFab] = useState(true);
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
                    {''}
                  </Button>
                </>
              ) : (
                <Button
                  accessibilityStates
                  icon="arrow-down"
                  mode="contained"
                  theme={{
                    colors: { primary: '#ffbf00' },
                  }}
                  onPress={() => setShowPic(true)}
                >
                  {''}
                </Button>
              )}
            </Card>
          </View>

          <View style={{ marginTop: showPic ? '70%' : '20%' }}>
            <Divider
              style={{ marginTop: '5%', marginBottom: '5%' }}
              accessibilityStates
            >
              <Text
                style={{ alignSelf: 'center', marginTop: '3%' }}
                accessibilityStates
              >
                Nota
              </Text>
            </Divider>
            <View>
              <View style={{ marginTop: '5%' }}>
                <View>
                  <Rating type="custom" startingValue={2.5} imageSize={25} />
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
                onFocus={() => setShowFab(false)}
                onBlur={() => setShowFab(true)}
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
          </View>
        </SafeAreaView>
      </ScrollView>
      <FAB
        accessibilityStates
        style={mainStyles.fab}
        icon="check"
        visible={showFab}
        onPress={() => navigation.goBack()}
      />
    </>
  );
};

export { ProductReview };
