import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ProductStack, PartnerStack } from '../index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const TabsHomeStack: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Products"
      activeColor="#ffbf00"
      shifting={false}
      keyboardHidesNavigationBar={true}
      barStyle={{ backgroundColor: '#ffffff' }}
    >
      <Tab.Screen
        name="Products"
        component={ProductStack}
        options={{
          tabBarLabel: 'Produtos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="beer" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Partners"
        component={PartnerStack}
        options={{
          tabBarLabel: 'Parceiros',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { TabsHomeStack };
