import React from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export type LogintackParamList = {
  LoginContainer: { userId: string } | undefined;
};

type LoginNavigationProp = StackNavigationProp<LogintackParamList, "LoginContainer">;
type LoginRouteProp = RouteProp<LogintackParamList, 'LoginContainer'>;

type Props = {
  navigation: LoginNavigationProp;
  route: LoginRouteProp;
};

const LoginContainer: React.FC<Props> = ({navigation, route: { params }}) => {

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
        />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button}
          onPress={ () => navigation.navigate('Products')}
        >
          <Text style={styles.textButton}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50'
  },
  input: {
    marginTop: 10,
    padding: 10,
    width: 300,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    backgroundColor: '#fff'
  },
  button: {
    width: 300,
    height: 42,
    backgroundColor: '#3498db',
    marginTop: 10,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
})

export { LoginContainer };
