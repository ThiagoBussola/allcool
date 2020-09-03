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

import Icon from 'react-native-vector-icons/FontAwesome';
import { ReviewDTO } from '../../../types/dto';
import { ReviewService } from '../../../service';
import { Title } from 'react-native-paper';
import { mainStyles } from '../../../styles';

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
              <View style={{ alignSelf: 'center' }}>
                <ImageComponent
                  imageStyle={{ width: 400, height: 240 }}
                  resizeMode="stretch"
                  url={review.pictureUrl!}
                />
              </View>
            </View>
          )}
          <View style={{ marginTop: '3%' }}>
            <Title>{review.productName}</Title>
            <Text style={{ marginTop: '3%', marginBottom: '3%' }}>
              {' '}
              {review.userName}
            </Text>
            <ReadOnlyStarRating rating={review.rating!} />
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
