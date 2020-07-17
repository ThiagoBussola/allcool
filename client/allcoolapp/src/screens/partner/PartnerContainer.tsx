import React from 'react';
import { View, Text, Button } from 'react-native';
import {
  PartnerContainerNavigationProp,
  PartnerContainerRouteProp,
} from '../../navigation';

type Props = {
  navigation: PartnerContainerNavigationProp;
  route: PartnerContainerRouteProp;
};

const PartnerContainer: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`Bem vindo a tela de parceiros, usuário`}</Text>
        <Text>{userId}</Text>
        <View style={{ marginTop: 10 }}>
          <Button
            color="#ffbf00"
            title="Visualizar Produtos"
            onPress={() => navigation.navigate('Products')}
          />
        </View>
      </View>
    </>
  );
};

export { PartnerContainer };
