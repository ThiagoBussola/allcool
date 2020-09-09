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
import { Title, Avatar, Subheading } from 'react-native-paper';
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
        <SafeAreaView style={mainStyles.container}>
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
          <View style={{ marginTop: '3%' }}>
            <View style={rowStyle}>
              <View>
                <Avatar.Image
                  accessibilityStates
                  size={40}
                  style={{ backgroundColor: '#ffbf00' }}
                  source={{ uri: review.avatarUrl }}
                />
              </View>
              <View>
                <View style={{ justifyContent: 'flex-start' }}>
                  <Title style={{ marginLeft: '5%' }}>{review.userName}</Title>
                  <Subheading style={{ marginLeft: '5%' }}>
                    {review.productName}
                  </Subheading>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: '85%',
                  }}
                >
                  <ReadOnlyStarRating rating={review.rating!} />
                </View>
              </View>
            </View>
            <Text style={{ marginTop: '3%' }}>{review.description}</Text>
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

export { PublicationReviewView };
