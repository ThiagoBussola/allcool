import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type PartnerContainerStackParamList = {
  PartnerContainer: { userId: string | undefined };
  Products: { userId: string } | undefined;
};

type PartnerContainerNavigationProp = StackNavigationProp<
  PartnerContainerStackParamList,
  'PartnerContainer'
>;

type PartnerContainerRouteProp = RouteProp<
  PartnerContainerStackParamList,
  'PartnerContainer'
>;

type Props = {
  navigation: PartnerContainerNavigationProp;
  route: PartnerContainerRouteProp;
};

const PartnerContainer: React.FC<Props> = ({
  navigation,
  route: { params },
}) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`Bem vindo a tela de parceiros, usuário ${
          params && params.userId
        }`}</Text>
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
