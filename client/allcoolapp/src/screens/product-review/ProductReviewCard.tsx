import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Avatar, Button } from 'react-native-paper';
import { mainStyles } from '../../styles';

type Props = {
  showPic: boolean;
  setShowPic: (value: boolean) => void;
};

const CameraIcon = (props) => (
  <Avatar.Icon {...props} icon="camera" style={{ backgroundColor: 'black' }} />
);

const ProductReviewCard: React.FC<Props> = ({ showPic, setShowPic }) => {
  const [hasPic] = useState(false);
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
        <Card accessibilityStates onPress={() => {}}>
          <Card.Title
            accessibilityStates
            title="Foto"
            titleStyle={mainStyles.title}
            subtitle="Capture ou escolha uma foto do produto"
            subtitleStyle={mainStyles.subHeading}
            left={CameraIcon}
          />
          {hasPic && (
            <>
              {showPic ? (
                <>
                  <Card.Cover
                    accessibilityStates
                    source={{
                      uri:
                        'https://p2.piqsels.com/preview/443/865/234/beer-corona-extra-beach-lake-thumbnail.jpg',
                    }}
                    resizeMethod="auto"
                    resizeMode="contain"
                    style={{ height: 200, width: 367 }}
                  />
                  {renderViewPicButton()}
                </>
              ) : (
                renderViewPicButton()
              )}
            </>
          )}
        </Card>
      </View>
    </>
  );
};

export { ProductReviewCard };
