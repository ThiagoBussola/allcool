import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'App';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Products'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const ProductList: React.FC<Props> = ({ navigation }) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Go to Home"
            onPress={() => navigation.navigate('HomeScreen')}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Go back to first screen in stack"
            onPress={() => navigation.popToTop()}
          />
        </View>
      </View>
    </>
  );
};

export { ProductList };
