import React from 'react';
import { View, Image } from 'react-native';
import { listImageStyle, mainStyles } from '../styles';
import { Subheading } from 'react-native-paper';
import { Loading } from './Loading';

type Props = {
  loading?: boolean;
  marginTop?: string;
  message?: string;
};

const EmptyListPlaceholder: React.FC<Props> = ({
  loading = false,
  marginTop = '50',
  message = 'Nenhum registro encontrado',
}) => {
  return (
    <View style={{ flex: 1 }}>
      {!loading ? (
        <>
          <View
            style={{ alignItems: 'center', marginTop: marginTop.concat('%') }}
          >
            <Image
              style={listImageStyle}
              source={require('../img/AllcoolV2.png')}
              resizeMode="contain"
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Subheading style={mainStyles.subHeading}>{message}</Subheading>
          </View>
        </>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export { EmptyListPlaceholder };
