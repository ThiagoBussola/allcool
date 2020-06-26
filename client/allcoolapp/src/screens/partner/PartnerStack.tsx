import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PartnerContainer } from './PartnerContainer';
import { rootStackOptions } from '../../styles';

export type RootStackParamList = {
  PartnerContainer: { userId: string } | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const PartnerStack: React.FC = () => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="PartnerContainer"
        screenOptions={rootStackOptions('Parceiros')}
      >
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
