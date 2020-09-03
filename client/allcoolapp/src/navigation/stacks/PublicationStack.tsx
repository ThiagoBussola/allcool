import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PublicationList, PublicationView } from '../../screens';
import { rootStackOptions, screenStackOptions } from '../../styles';
import { RouteProp } from '@react-navigation/native';
import { MenuActionButton } from '../../components';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type PublicationRootStackParamList = {
  PublicationStack: { userId: string };
  Publications: { userId: string };
  PublicationView: { userId: string };
};

const RootStack = createStackNavigator<PublicationRootStackParamList>();

type PublicationStackRouteProp = RouteProp<
  PublicationRootStackParamList,
  'PublicationStack'
>;

type PublicationDrawerNavigationProp = DrawerNavigationProp<
  PublicationRootStackParamList,
  'PublicationStack'
>;

type Props = {
  navigation: PublicationDrawerNavigationProp;
  route: PublicationStackRouteProp;
};

const PublicationStack: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="Publications"
        screenOptions={rootStackOptions('Publicações')}
      >
        <RootStack.Screen
          name="Publications"
          component={PublicationList}
          initialParams={{ userId }}
          options={{
            ...screenStackOptions('Publicações'),
            headerLeft: () => (
              <MenuActionButton onPress={() => navigation.openDrawer()} />
            ),
          }}
        />
        <RootStack.Screen
          name="PublicationView"
          options={screenStackOptions('Publicação')}
          component={PublicationView}
          initialParams={{ userId }}
        />
      </RootStack.Navigator>
    </>
  );
};

export { PublicationStack };
