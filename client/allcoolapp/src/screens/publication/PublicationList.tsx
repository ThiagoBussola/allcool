import React from 'react';
import {
  PublicationListRouteProp,
  PublicationListNavigationProp,
} from '../../navigation';
import { View } from 'react-native';
import { mainStyles } from '../../styles';
import { Button } from 'react-native-paper';

type Props = {
  route: PublicationListRouteProp;
  navigation: PublicationListNavigationProp;
};

const PublicationList: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  return (
    <View style={mainStyles.container}>
      <View style={{ marginTop: '80%' }}>
        <Button
          accessibilityStates
          mode="contained"
          theme={{
            colors: { primary: '#ffbf00' },
          }}
          onPress={() =>
            navigation.push('PublicationView', { userId, publicationId: '1' })
          }
          labelStyle={mainStyles.buttonText}
        >
          Visualizar Publicação
        </Button>
      </View>
    </View>
  );
};

export { PublicationList };
