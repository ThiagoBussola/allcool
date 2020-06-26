import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PartnerContainer } from './PartnerContainer';
import { screenOptions } from '../../styles';
import { PartnerList } from './PartnerList';

export type RootStackParamList = {
  PartnerContainer: { userId: string } | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const PartnerStack: React.FC = () => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="Partners"
        screenOptions={screenOptions('Parceiros')}
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
