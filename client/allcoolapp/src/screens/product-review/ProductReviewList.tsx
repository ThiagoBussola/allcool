import React, { useEffect, useState } from 'react';
import { Loading, SnackbarState, EmptyListPlaceholder } from '../../components';
import { useLoading } from '../../hooks';
import { ReviewService } from '../../service';
import { ReviewDTO } from '../../types/dto';
import { View } from 'react-native';
import { Title, Card, Paragraph, Avatar } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { rowStyle } from '../../styles';

type Props = {
  productId: string;
  setSnackbarState: (snackbarState: SnackbarState) => void;
};

const ProductReviewList: React.FC<Props> = ({
  productId,
  setSnackbarState,
}) => {
  const [loading, setLoading] = useLoading();
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);

  useEffect(() => {
    setLoading(
      ReviewService.findAllByProductId(productId)
        .then(({ data }) => setReviews(data))
        .catch(({ response }) =>
          setSnackbarState({
            message: response.data?.message || response.data,
            visible: true,
          })
        )
    );
    //eslint-disable-next-line
  }, [productId]);

  const renderRating = (reviewDTO: ReviewDTO) => (
    <View style={[rowStyle, { marginRight: '2%' }]}>
      <Title style={{ color: '#ffbf00' }}>{reviewDTO.rating}</Title>
      <View style={{ justifyContent: 'center' }}>
        <AirbnbRating
          defaultRating={1}
          isDisabled
          size={16}
          showRating={false}
          starStyle={{ tintColor: '#ffbf00' }}
          count={1}
        />
      </View>
    </View>
  );

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View>
          {reviews && reviews.length > 0 ? (
            reviews?.map((reviewDTO, index) => (
              <View
                key={index}
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  marginTop: '3%',
                  marginBottom: '2%',
                }}
              >
                <Card
                  accessibilityStates
                  style={{
                    backgroundColor: '#f7f7f7',
                  }}
                >
                  {reviewDTO.pictureUrl && (
                    <Card.Cover
                      accessibilityStates
                      style={{
                        height: 125,
                      }}
                      source={{ uri: reviewDTO.pictureUrl }}
                    />
                  )}
                  <Card.Title
                    accessibilityStates
                    titleStyle={{ fontSize: 22 }}
                    title={reviewDTO.userName}
                    left={() => (
                      <Avatar.Image
                        accessibilityStates
                        size={40}
                        source={{ uri: reviewDTO.avatarUrl }}
                      />
                    )}
                    right={() => renderRating(reviewDTO)}
                  />
                  <Card.Content>
                    <Paragraph style={{ fontSize: 16 }}>
                      {reviewDTO.description}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </View>
            ))
          ) : (
            <EmptyListPlaceholder marginTop="0" loading={loading} />
          )}
        </View>
      )}
    </>
  );
};

export { ProductReviewList };
