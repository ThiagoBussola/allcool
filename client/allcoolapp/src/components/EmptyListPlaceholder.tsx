import React from 'react';
import { View, Image } from 'react-native';
import { listImageStyle, mainStyles } from '../styles';
import { Subheading } from 'react-native-paper';
import { Loading } from './Loading';

type Props = {
  loading: boolean;
};

const EmptyListPlaceholder: React.FC<Props> = ({ loading }) => {
  return (
    <View style={{ flex: 1 }}>
      {!loading ? (
        <>
          <View style={{ alignItems: 'center', marginTop: '50%' }}>
            <Image
              style={listImageStyle}
              source={require('../img/AllcoolV1.1.png')}
              resizeMode="contain"
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Subheading style={mainStyles.subHeading}>
              Nenhum registro encontrado
            </Subheading>
          </View>
        </>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export { EmptyListPlaceholder };