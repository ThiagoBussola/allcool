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
  Loading,
} from '../../../components';
import { ScrollView, View } from 'react-native';

import { ReviewDTO } from '../../../types/dto';
import { ReviewService } from '../../../service';
import { Title, Avatar, Paragraph } from 'react-native-paper';
import { mainStyles } from '../../../styles';
import { useLoading } from '../../../hooks';

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
  const [loading, setLoading] = useLoading();
  const [review, setReview] = useState<ReviewDTO>({
    id: '',
  });
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    visible: false,
  });

  useEffect(() => {
    setLoading(
      ReviewService.findById(reviewId)
        .then(({ data }) => setReview(data))
        .catch(({ response }) =>
          setSnackbarState({
            message: response.data?.message || response.data,
            visible: true,
          })
        )
    );
    //eslint-disable-next-line
  }, [reviewId]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={mainStyles.container}>
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
          <View style={{ marginTop: '1%' }}>
            <Avatar.Image
              accessibilityStates
              size={50}
              source={
                review.avatarUrl
                  ? { uri: review.avatarUrl }
                  : require('../../../img/AllcoolV1.1.png')
              }
              style={{
                backgroundColor: 'white',
                marginTop: '3%',
              }}
            />
          </View>

          <Title style={mainStyles.title}>{review.userName}</Title>
          <Paragraph
            style={[
              {
                fontSize: 18,
                marginBottom: '2%',
              },
            ]}
          >
            {review.productName}
          </Paragraph>
          <ReadOnlyStarRating rating={review.rating!} showAllStars />
          <Title>O que achou</Title>
          <Paragraph
            style={[
              {
                fontSize: 18,
              },
            ]}
          >
            {review.description}
          </Paragraph>
        </ScrollView>
      )}
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
