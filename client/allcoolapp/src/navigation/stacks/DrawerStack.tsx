import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import StorageService from '../../service/StorageService';
import { RouteProp } from '@react-navigation/native';
import { TabsStack } from './';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Title } from 'react-native-paper';

type DrawerStackParamList = {
  Drawer: { userId: string };
  Login: undefined;
  Tabs: { userId: string };
};

type DrawerListNavigationProp = StackNavigationProp<
  DrawerStackParamList,
  'Drawer'
>;

type DrawerRouteProp = RouteProp<DrawerStackParamList, 'Drawer'>;

type Props = {
  navigation: DrawerListNavigationProp;
  route: DrawerRouteProp;
};

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerStack: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  const customDrawerContent = (props) => {
    return (
      <>
        <Avatar.Image
          accessibilityStates
          size={50}
          source={require('../../img/AllcoolV1.1.png')}
          style={{
            backgroundColor: 'white',
            marginLeft: '3%',
            marginTop: '3%',
          }}
        />
        <Title
          style={{
            marginLeft: '5%',
            fontSize: 18,
          }}
        >
          Allcool
        </Title>

        <DrawerContentScrollView {...props}>
          <DrawerItem
            inactiveBackgroundColor="#f7f7f7"
            label="Fechar"
            onPress={() => props.navigation.closeDrawer()}
            icon={() => (
              <MaterialCommunityIcons name="close" color="black" size={22} />
            )}
          />
          <DrawerItem
            label="Sair"
            inactiveBackgroundColor="#f7f7f7"
            inactiveTintColor="red"
            onPress={() =>
              StorageService.clear().then(() => navigation.replace('Login'))
            }
            icon={() => (
              <MaterialCommunityIcons
                name="logout-variant"
                color="red"
                size={22}
              />
            )}
          />
        </DrawerContentScrollView>
      </>
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      screenOptions={{ swipeEnabled: false }}
      drawerContent={(props) => customDrawerContent(props)}
    >
      <Drawer.Screen
        name="Tabs"
        component={TabsStack}
        initialParams={{ userId }}
      />
    </Drawer.Navigator>
  );
};

export { DrawerStack };
