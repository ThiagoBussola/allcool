import React from 'react';
import { Text, View } from 'react-native';
import {
  AchievementViewNavigationProp,
  AchievementViewRouteProp,
} from 'src/navigation';

type Props = {
  navigation: AchievementViewNavigationProp;
  route: AchievementViewRouteProp;
};

const AchievementView: React.FC<Props> = ({
  navigation,
  route: {
    params: { achievementId, userId },
  },
}) => {
  return (
    <View style={{ marginTop: '50%' }}>
      <Text>{achievementId}</Text>
      <Text>{userId}</Text>
    </View>
  );
};

export { AchievementView };
