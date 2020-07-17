import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PartnerContainer, PartnerList } from '../../screens';
import { rootStackOptions, screenStackOptions } from '../../styles';
import { RouteProp } from '@react-navigation/native';

type PartnerRootStackParamList = {
  PartnerStack: { userId: string };
  Partners: { userId: string };
  PartnerContainer: { userId: string };
};

const RootStack = createStackNavigator<PartnerRootStackParamList>();

type PartnerStackRouteProp = RouteProp<
  PartnerRootStackParamList,
  'PartnerStack'
>;

type Props = {
  route: PartnerStackRouteProp;
};

const PartnerStack: React.FC<Props> = ({
  route: {
    params: { userId },
  },
}) => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="Partners"
        screenOptions={rootStackOptions('Parceiros')}
      >
        <RootStack.Screen
          name="Partners"
          component={PartnerList}
          initialParams={{ userId }}
        />
        <RootStack.Screen
          name="PartnerContainer"
          options={screenStackOptions('Parceiro')}
          component={PartnerContainer}
          initialParams={{ userId }}
        />
      </RootStack.Navigator>
    </>
  );
};

export { PartnerStack };
