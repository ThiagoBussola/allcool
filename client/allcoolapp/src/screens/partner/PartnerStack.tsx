import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PartnerContainer } from './PartnerContainer';

export type RootStackParamList = {
  PartnerContainer: { userId: string } | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const PartnerStack: React.FC = () => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="PartnerContainer"
        screenOptions={{
          headerTitle: 'Parceiros',
          headerStyle: {
            backgroundColor: '#ffbf00',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
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
