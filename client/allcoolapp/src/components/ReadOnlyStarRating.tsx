import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { rowStyle } from '../styles';

type Props = {
  rating: number;
  showAllStars?: boolean;
  onFlexEnd?: boolean;
};

const ReadOnlyStarRating: React.FC<Props> = ({
  rating,
  showAllStars = false,
  onFlexEnd = false,
}) => (
  <View style={[rowStyle, onFlexEnd && { marginRight: '2%' }]}>
    <Title style={{ color: '#ffbf00', marginRight: '1%' }}>{rating}</Title>
    <View style={{ justifyContent: 'center' }}>
      <AirbnbRating
        defaultRating={1}
        isDisabled
        size={17}
        showRating={false}
        starStyle={{ tintColor: '#ffbf00' }}
        count={showAllStars ? 5 : 1}
      />
    </View>
  </View>
);

export { ReadOnlyStarRating };
