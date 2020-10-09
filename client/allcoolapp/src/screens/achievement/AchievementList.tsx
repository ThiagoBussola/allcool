import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import {
  AchievementListNavigationProp,
  AchievementListRouteProp,
} from 'src/navigation';

type Props = {
  navigation: AchievementListNavigationProp;
  route: AchievementListRouteProp;
};

const AchievementList: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId, productId },
  },
}) => {
  const achievementIdMock = '1';

  return (
    <View style={{ marginTop: '50%' }}>
      <Button
        accessibilityStates
        color="#FFFFFF"
        onPress={() =>
          navigation.navigate('AchievementView', {
            achievementId: achievementIdMock,
          })
        }
        mode="text"
        labelStyle={{ color: '#ffbf00' }}
      >
        Visualizar conquista
      </Button>
    </View>
  );
};

export { AchievementList };
