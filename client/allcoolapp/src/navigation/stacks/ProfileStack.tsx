import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileView } from '../../screens';
import { rootStackOptions, screenStackOptions } from '../../styles';
import { RouteProp } from '@react-navigation/native';
import { MenuActionButton } from '../../components';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type ProfileRootStackParamList = {
  ProfileStack: { userId: string };
  ProfileView: { userId: string };
};

const RootStack = createStackNavigator<ProfileRootStackParamList>();

type ProfileStackRouteProp = RouteProp<
  ProfileRootStackParamList,
  'ProfileStack'
>;

type ProfileDrawerNavigationProp = DrawerNavigationProp<
  ProfileRootStackParamList,
  'ProfileStack'
>;

type Props = {
  navigation: ProfileDrawerNavigationProp;
  route: ProfileStackRouteProp;
};

const ProfileStack: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  return (
    <>
      <RootStack.Navigator
        initialRouteName="ProfileView"
        screenOptions={rootStackOptions('Publicações')}
      >
        <RootStack.Screen
          name="ProfileView"
          component={ProfileView}
          initialParams={{ userId }}
          options={{
            ...screenStackOptions('Perfil'),
            headerLeft: () => (
              <MenuActionButton onPress={() => navigation.openDrawer()} />
            ),
          }}
        />
      </RootStack.Navigator>
    </>
  );
};

export { ProfileStack };
