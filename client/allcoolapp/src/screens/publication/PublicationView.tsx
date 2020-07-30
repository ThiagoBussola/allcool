import React from 'react';
import {
  PublicationViewRouteProp,
  PublicationViewNavigationProp,
} from '../../navigation';
import { ImageComponent } from '../../components';

type Props = {
  route: PublicationViewRouteProp;
  navigation: PublicationViewNavigationProp;
};

const PublicationView: React.FC<Props> = ({ navigation, route }) => {
  return (
    <ImageComponent
      url="https://p2.piqsels.com/preview/443/865/234/beer-corona-extra-beach-lake-thumbnail.jpg"
      imageStyle={{
        marginTop: '30%',
        alignSelf: 'center',
        height: 400,
        width: 500,
      }}
    />
  );
};

export { PublicationView };
