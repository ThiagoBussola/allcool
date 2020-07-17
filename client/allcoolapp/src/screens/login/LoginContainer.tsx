import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyles } from '../../styles';
import { LoginService } from '../../service';
import StorageService from '../../service/StorageService';
import { LoginNavigationProp } from '../../navigation';

type Props = {
  navigation: LoginNavigationProp;
};

type LoginFormType = {
  email: string;
  password: string;
  secureText: boolean;
};

const initialState: LoginFormType = {
  email: '',
  password: '',
  secureText: false,
};

const LoginContainer: React.FC<Props> = ({ navigation }) => {
  const [loginState, setLoginState] = useState<LoginFormType>(initialState);
  const [alreadyLogged, setAlreadyLogged] = useState(true);

  useEffect(() => {
    isUserAlreadyLogged();
  }, []);

  const isUserAlreadyLogged = async () => {
    const token = await StorageService.getKey('JWT-Token');

    if (token) {
      const id = await StorageService.getKey('userId');

      return navigation.replace('Drawer', { userId: id || '' });
    }

    setAlreadyLogged(false);
  };

  const handleChange = (name: string, value: string) =>
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  const wrongUsernameOrPasssord = () => {
    Alert.alert(
      'Nome de usuário ou senha inválidos.',
      'Verifique seus dados de acesso e tente novamente.'
    );
  };

  const connectionWithProblems = (error) => {
    Alert.alert('Ocorreu um problema ao conectar com o servidor.', error);
  };

  const executeLogin = () => {
    LoginService.login({
      email: loginState.email,
      password: loginState.password,
    })
      .then((response) => {
        StorageService.storeUserClient(response.data.userId);
        StorageService.storeKey('JWT-Token', response.data.token).then(
          async () => {
            const id = await StorageService.getKey('userId');

            return navigation.replace('Drawer', { userId: id || '' });
          }
        );
      })
      .catch((error) => {
        if (error.response != undefined && error.response.status === 400) {
          wrongUsernameOrPasssord();
        } else {
          connectionWithProblems(error);
        }
      });
  };

  return (
    <>
      {!alreadyLogged && (
        <SafeAreaView style={mainStyles.container}>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{ width: 75, height: 75 }}
              source={require('../../img/AllcoolV1.1.png')}
            />
          </View>
          <View>
            <TextInput
              accessibilityStates
              style={mainStyles.input}
              label="E-mail"
              placeholder="Digite seu e-mail"
              mode="outlined"
              theme={{ colors: { primary: '#ffbf00' } }}
              onChangeText={(value) => handleChange('email', value)}
            />
            <TextInput
              accessibilityStates
              style={mainStyles.input}
              label="Senha"
              placeholder="Digite sua senha"
              secureTextEntry={true}
              mode="outlined"
              theme={{ colors: { primary: '#ffbf00' } }}
              onChangeText={(value) => handleChange('password', value)}
            />
            <Button
              accessibilityStates
              style={mainStyles.button}
              onPress={executeLogin}
              mode="contained"
            >
              Entrar
            </Button>
          </View>
          <View style={{ position: 'relative', marginTop: 10 }}>
            <Text
              style={{
                color: '#969696',
                textAlign: 'center',
              }}
              onPress={() => {}}
            >
              Não tem uma conta?
              <Text style={{ color: '#ffbf00' }}> Cadastre-se.</Text>
            </Text>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export { LoginContainer };
