import React, { useState, useEffect } from 'react';
import {
  PublicationReviewViewRouteProp,
  PublicationReviewViewNavigationProp,
} from '../../../navigation';
import {
  ImageComponent,
  SnackbarState,
  SnackbarNotification,
  ReadOnlyStarRating,
} from '../../../components';
import {
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';

import { ReviewDTO } from '../../../types/dto';
import { ReviewService } from '../../../service';
import { Title, Avatar, Subheading, Paragraph } from 'react-native-paper';
import { mainStyles, rowStyle } from '../../../styles';

type Props = {
  route: PublicationReviewViewRouteProp;
  navigation: PublicationReviewViewNavigationProp;
};

const PublicationReviewView: React.FC<Props> = ({
  navigation,
  route: {
    params: { reviewId },
  },
}) => {
  const [review, setReview] = useState<ReviewDTO>({
    id: '',
  });
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    visible: false,
  });

  useEffect(() => {
    ReviewService.findById(reviewId)
      .then(({ data }) => {
        setReview(data);
        console.log(data);
      })
      .catch(({ response }) =>
        setSnackbarState({
          message: response.data?.message || response.data,
          visible: true,
        })
      );
  }, [reviewId]);

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ marginTop: '3%' }}>
          {review.pictureUrl && (
            <View>
              <View style={{ alignSelf: 'center', marginTop: '3%' }}>
                <ImageComponent
                  imageStyle={{ width: 400, height: 240 }}
                  resizeMode="contain"
                  url={review.pictureUrl!}
                />
              </View>
            </View>
          )}
          <View style={rowStyle}>
            <View>
              <Avatar.Image
                accessibilityStates
                size={50}
                source={{ uri: review.avatarUrl }}
                style={{
                  backgroundColor: 'white',
                  marginLeft: '5%',
                  marginTop: '3%',
                }}
              />
              <Title
                style={[
                  mainStyles.title,
                  {
                    marginLeft: '5%',
                    fontSize: 20,
                  },
                ]}
              >
                {review.userName}
              </Title>
              <Paragraph
                style={[
                  {
                    fontSize: 18,
                    marginLeft: '5%',
                    marginBottom: '5%',
                  },
                ]}
              >
                {review.productName}
              </Paragraph>

              <View style={{ marginTop: '3%', marginLeft: '4%' }}>
                <Subheading style={{ fontSize: 20 }}>O que achou: </Subheading>
              </View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    paddingTop: '1%',
                    paddingLeft: '5%',
                  }}
                >
                  {review.description}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
                alignItems: 'center',
              }}
            >
              <ReadOnlyStarRating rating={review.rating!} />
            </View>
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

export { PublicationReviewView };
