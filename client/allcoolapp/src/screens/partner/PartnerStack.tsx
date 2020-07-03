import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PartnerContainer } from './PartnerContainer';
import { PartnerList } from './PartnerList';
import { rootStackOptions } from '../../styles';

export type RootStackParamList = {
  Partners: { userId: string } | undefined;
  PartnerContainer: { userId: string } | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const PartnerStack: React.FC = () => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="Partners"
        screenOptions={rootStackOptions('Parceiros')}
      >
        <RootStack.Screen
          name="Partners"
          component={PartnerList}
          initialParams={{ userId: '1' }}
        />
        <RootStack.Screen
          name="PartnerContainer"
          component={PartnerContainer}
          initialParams={{ userId: '1' }}
        />
      </RootStack.Navigator>
    </>
  );
};

export { PartnerStack };
