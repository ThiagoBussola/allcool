import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type HomeScreenStackParamList = {
  HomeScreen: { userId: string | undefined };
  Products: { userId: string } | undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  HomeScreenStackParamList,
  'HomeScreen'
>;

type HomeScreenRouteProp = RouteProp<HomeScreenStackParamList, 'HomeScreen'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const HomeScreen: React.FC<Props> = ({ navigation, route: { params } }) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{`Welcome User ${params && params.userId}`}</Text>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Go to Products"
            onPress={() => navigation.navigate('Products')}
          />
        </View>
      </View>
    </>
  );
};

export { HomeScreen };
