import React from 'react';
import { Card, Title, Paragraph, Avatar, IconButton } from 'react-native-paper';
import { ReviewDTO } from '../../types/dto';
import { AirbnbRating } from 'react-native-ratings';
import { View } from 'react-native';
import { rowStyle } from '../../styles';

type Props = {
  review: ReviewDTO;
  itemIndex: number;
  touched: boolean;
  onLikePublication: (index: number) => void;
};

const ReviewPublicationCardChildren: React.FC<Props> = ({
  review,
  itemIndex,
  touched,
  onLikePublication: onTouchIcon,
}) => {
  const renderRating = () => (
    <View style={[rowStyle, { marginRight: '2%' }]}>
      <Title style={{ color: '#ffbf00' }}>{review.rating}</Title>
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
      {!!review.pictureUrl && (
        <Card.Cover accessibilityStates source={{ uri: review.pictureUrl }} />
      )}
      <Card.Title
        accessibilityStates
        title={review.userName}
        subtitle={review.productName}
        subtitleStyle={{ fontSize: 14 }}
        titleStyle={{ fontSize: 22 }}
        right={renderRating}
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
      <Card.Actions style={{ justifyContent: 'flex-end', margin: '-4%' }}>
        <IconButton
          accessibilityStates
          icon={touched ? 'beer' : 'beer-outline'}
          color="#ffbf00"
          animated
          size={36}
          onPress={() => onTouchIcon(itemIndex)}
        />
      </Card.Actions>
    </>
  );
};

export { ReviewPublicationCardChildren };
