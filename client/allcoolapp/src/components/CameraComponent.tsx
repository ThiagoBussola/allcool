import React from 'react';
import { View, Text, Alert, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Loading } from './Loading';
import { Button } from 'react-native-paper';
import { rowStyle, mainStyles } from '../styles';

type Props = {
  setShowCamera: (value: boolean) => void;
};

const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;

const CameraComponent: React.FC<Props> = ({ setShowCamera }) => {
  const takePicture = async (camera) => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      camera.takePictureAsync(options).then((data) => Alert.alert(data.uri));
    }
  };

  return (
    <RNCamera
      style={{ flex: 1, width: screenWidth }}
      type={RNCamera.Constants.Type.back}
      autoFocus={RNCamera.Constants.AutoFocus.on}
      flashMode={RNCamera.Constants.FlashMode.off}
      captureAudio={false}
      onPictureTaken={() => setShowCamera(false)}
      androidCameraPermissionOptions={{
        title: 'Permissão para uso da câmera',
        message: 'Precisamos da sua permissão para usar a câmera do celular',
        buttonPositive: 'Ok',
      }}
    >
      {({ camera, status }) => {
        if (status !== 'READY') return <Loading />;
        return (
          <View
            style={[rowStyle, { marginTop: '100%', justifyContent: 'center' }]}
          >
            <Button
              accessibilityStates
              onPress={() => takePicture(camera)}
              mode="contained"
              labelStyle={mainStyles.buttonText}
              style={{ backgroundColor: '#ffbf00' }}
            >
              <Text style={{ fontSize: 14 }}> Tirar foto </Text>
            </Button>
            <Button
              accessibilityStates
              onPress={() => setShowCamera(false)}
              mode="contained"
              labelStyle={mainStyles.buttonText}
              style={{ marginLeft: '3%', backgroundColor: '#ffbf00' }}
            >
              <Text style={{ fontSize: 14 }}> Cancelar </Text>
            </Button>
          </View>
        );
      }}
    </RNCamera>
  );
};

export { CameraComponent };
