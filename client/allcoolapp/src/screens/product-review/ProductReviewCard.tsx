import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Avatar, Button, IconButton } from 'react-native-paper';
import { mainStyles } from '../../styles';
import { CameraComponent } from '../../components';
import { TakePictureResponse } from 'react-native-camera';

type Props = {
  showPic: boolean;
  setShowPic: (value: boolean) => void;
};

const CameraIcon = (props) => (
  <Avatar.Icon {...props} icon="camera" style={{ backgroundColor: 'black' }} />
);

const pictureInitialStatus: TakePictureResponse = {
  uri: '',
  deviceOrientation: 1,
  height: 0,
  pictureOrientation: 1,
  width: 0,
};

const ProductReviewCard: React.FC<Props> = ({ showPic, setShowPic }) => {
  const [hasPicture, setHasPicture] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [picture, setPicture] = useState<TakePictureResponse>(
    pictureInitialStatus
  );

  const onTakePicture = (newPicture) => {
    console.log(newPicture);
    setPicture(newPicture);
    setShowCamera(false);
    setHasPicture(true);
  };

  const onResetPicture = () => {
    setPicture(pictureInitialStatus);
    setHasPicture(false);
  };

  const renderViewPicButton = () => (
    <Button
      accessibilityStates
      icon={showPic ? 'arrow-up' : 'arrow-down'}
      mode="contained"
      style={{ borderRadius: 1 }}
      theme={{
        colors: { primary: '#ffbf00' },
      }}
      onPress={() => setShowPic(!showPic)}
    >
      {showPic ? 'Ocultar' : 'Visualizar'}
    </Button>
  );

  return (
    <>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          marginTop: '3%',
        }}
      >
        <Card accessibilityStates onPress={() => setShowCamera(true)}>
          <Card.Title
            accessibilityStates
            title="Foto"
            titleStyle={mainStyles.title}
            subtitle="Capture ou escolha uma foto do produto"
            subtitleStyle={mainStyles.subHeading}
            left={CameraIcon}
            right={() => (
              <>
                {hasPicture && (
                  <IconButton
                    accessibilityStates
                    icon="close-circle"
                    animated
                    size={32}
                    onPress={onResetPicture}
                  />
                )}
              </>
            )}
          />
          {hasPicture && (
            <>
              {showPic ? (
                <>
                  <Card.Cover
                    accessibilityStates
                    source={{ uri: picture.uri }}
                    resizeMethod="auto"
                    resizeMode="cover"
                  />
                  {renderViewPicButton()}
                </>
              ) : (
                renderViewPicButton()
              )}
            </>
          )}
          {showCamera && (
            <Card.Actions>
              <CameraComponent
                onTakePicture={onTakePicture}
                setShowCamera={setShowCamera}
              />
            </Card.Actions>
          )}
        </Card>
      </View>
    </>
  );
};

export { ProductReviewCard };
