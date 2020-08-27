import React from 'react';
import { View } from 'react-native';
import { Title } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { rowStyle } from '../styles';

type Props = {
  rating: number;
};

const ReadOnlyStarRating: React.FC<Props> = ({ rating }) => (
  <View style={[rowStyle, { marginRight: '2%' }]}>
    <Title style={{ color: '#ffbf00' }}>{rating}</Title>
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

export { ReadOnlyStarRating };
