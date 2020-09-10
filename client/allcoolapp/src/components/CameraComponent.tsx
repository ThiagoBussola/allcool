import React from 'react';
import { View, Alert, Dimensions, Modal, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Loading } from './Loading';
import { IconButton } from 'react-native-paper';

type Props = {
  setShowCamera: (value: boolean) => void;
  onChangePicture: (uri) => void;
};

const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;

const CameraComponent: React.FC<Props> = ({
  setShowCamera,
  onChangePicture,
}) => {
  const takePicture = async (camera) => {
    if (camera) {
      try {
        const options = {
          quality: 0.5,
          base64: true,
          forceUpOrientation: true,
          fixOrientation: true,
          skipProcessing: true,
        };
        camera
          .takePictureAsync(options)
          .then(({ uri }) => onChangePicture(uri));
      } catch (error) {
        Alert.alert('Erro', 'Houve um erro ao tirar a foto.');
      }
    }
  };

  return (
    <Modal animationType="slide" transparent={false}>
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
            <>
              <IconButton
                accessibilityStates
                icon="close-circle"
                color="white"
                animated
                size={48}
                style={cameraStyle.buttonCloseCamera}
                onPress={() => setShowCamera(false)}
              />
              <View
                style={[
                  cameraStyle.buttonTakePicture,
                  { justifyContent: 'center' },
                ]}
              >
                <IconButton
                  accessibilityStates
                  icon="camera"
                  color="white"
                  animated
                  size={60}
                  onPress={() => takePicture(camera)}
                />
              </View>
            </>
          );
        }}
      </RNCamera>
    </Modal>
  );
};

const cameraStyle = StyleSheet.create({
  buttonTakePicture: {
    flex: 0,
    alignSelf: 'center',
    position: 'absolute',
    bottom: '1%',
  },
  buttonCloseCamera: {
    flex: 0,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: '5%',
  },
});

export { CameraComponent };
