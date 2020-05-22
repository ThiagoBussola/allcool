import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen, ProductList, ProductReview } from './src/screens';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export type Product = {
  id: string;
  name: string;
};

//Type para se botar a rota e suas props
export type RootStackParamList = {
  HomeScreen: { userId: string | undefined };
  Products: { userId: string } | undefined;
  ProductReview: { product: Product; userId: string | undefined };
};

const RootStack = createStackNavigator<RootStackParamList>();

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const user = {
    id: '123',
  };

  return (
    <>
      <NavigationContainer>
        {/* <RootStack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ba0c2f',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <RootStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            initialParams={{ userId: user.id }}
            options={({ route }) => ({
              title: `Home ${route.params && route.params.userId}`,
            })}
          />
          <RootStack.Screen name="Products" component={ProductList} />
          <RootStack.Screen name="ProductReview" component={ProductReview} />
        </RootStack.Navigator> */}
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#ffffff"
          style={{ backgroundColor: '#ba0c2f' }}
        >
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: 'green',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Products"
            component={ProductList}
            options={{
              tabBarLabel: 'Products',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="beer" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
