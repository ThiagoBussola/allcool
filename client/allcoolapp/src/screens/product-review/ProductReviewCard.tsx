import React from 'react';
import { View } from 'react-native';
import { Card, Avatar, Button } from 'react-native-paper';

type Props = {
  showPic: boolean;
  setShowPic: (value: boolean) => void;
};

const CameraIcon = (props) => (
  <Avatar.Icon {...props} icon="camera" style={{ backgroundColor: 'black' }} />
);

const ProductReviewCard: React.FC<Props> = ({ showPic, setShowPic }) => {
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
            subtitle="Capture ou escolha uma foto do produto"
            left={CameraIcon}
          />
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
                style={{ height: 200, width: 320 }}
              />
              <Button
                accessibilityStates
                icon="arrow-up"
                mode="contained"
                theme={{
                  colors: { primary: '#ffbf00' },
                }}
                onPress={() => setShowPic(false)}
              >
                Ocultar
              </Button>
            </>
          ) : (
            <Button
              accessibilityStates
              icon="arrow-down"
              mode="contained"
              theme={{
                colors: { primary: '#ffbf00' },
              }}
              onPress={() => setShowPic(true)}
            >
              Visualizar
            </Button>
          )}
        </Card>
      </View>
    </>
  );
};

export { ProductReviewCard };
