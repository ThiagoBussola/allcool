import React from 'react';
import { Card, Paragraph, Avatar, IconButton } from 'react-native-paper';
import { ReviewDTO } from '../../types/dto';
import { ReadOnlyStarRating } from '../../components';

type Props = {
  review: ReviewDTO;
  itemIndex: number;
  touched?: boolean;
  onLikePublication?: (index: number) => void;
};

const ReviewPublicationCardChildren: React.FC<Props> = ({
  review,
  itemIndex,
  touched,
  onLikePublication,
}) => {
  return (
    <>
      {!!review.pictureUrl && (
        <Card.Cover accessibilityStates source={{ uri: review.pictureUrl }} />
      )}
      <Card.Title
        accessibilityStates
        title={review.userName}
        subtitle={review.productName}
        subtitleStyle={{ fontSize: 14 }}
        titleStyle={{ fontSize: 22 }}
        right={() => <ReadOnlyStarRating rating={review.rating || 0} />}
        left={() => (
          <Avatar.Image
            accessibilityStates
            size={40}
            style={{ backgroundColor: '#ffbf00' }}
            source={{ uri: review.avatarUrl }}
          />
        )}
      />
      <Card.Content>
        <Paragraph style={{ fontSize: 16 }}>{review.description}</Paragraph>
      </Card.Content>
      {onLikePublication && (
        <Card.Actions style={{ justifyContent: 'flex-end', margin: '-4%' }}>
          <IconButton
            accessibilityStates
            icon={touched ? 'beer' : 'beer-outline'}
            color="#ffbf00"
            animated
            size={36}
            onPress={() => onLikePublication(itemIndex)}
          />
        </Card.Actions>
      )}
    </>
  );
};

export { ReviewPublicationCardChildren };
