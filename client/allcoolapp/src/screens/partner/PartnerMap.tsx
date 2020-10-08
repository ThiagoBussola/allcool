import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, StyleSheet, View } from 'react-native';
import { PartnerService } from '../../service';
import { PartnerDTO } from '../../types/dto';
import {
  PartnerMapNavigationProp,
  PartnersMapRouteProp,
} from '../../navigation';
import {
  EmptyListPlaceholder,
  SnackbarState,
  SnackbarNotification,
} from '../../components';
import { useLoading } from '../../hooks';
import Geolocation from '@react-native-community/geolocation';
import { mapStyle } from '../../styles/mapStyle';
import { mainStyles } from '../../styles';
import { Button, Subheading, Title } from 'react-native-paper';

type Props = {
  navigation: PartnerMapNavigationProp;
  route: PartnersMapRouteProp;
};

type UserLocation = {
  latitude: number;
  longitude: number;
};

const ZOOM_LATITUDADE = 0.01;
const ZOOM_LONGITUDE = 0.01;

const { width } = Dimensions.get('window');

const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const mapRef = React.createRef<MapView>();

const PartnerMap: React.FC<Props> = ({
  navigation,
  route: {
    params: { partner },
  },
}) => {
  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation>();
  const [loading, setLoading] = useLoading();
  const [firstItem, setFirstItem] = useState<number | undefined>();
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    visible: false,
  });

  useEffect(() => {
    getUserPosition();

    setLoading(
      PartnerService.findAll()
        .then(({ data }) => {
          setPartners(data);

          const firstIndex = data.findIndex((p) => p.id === partner?.id);

          if (firstIndex) {
            setFirstItem(firstIndex);
          } else {
            setFirstItem(0);
          }
        })
        .catch(({ response }) =>
          setSnackbarState({
            message: response.data?.message || response.data,
            visible: true,
          })
        )
    );
    //eslint-disable-next-line
  }, [partner.id]);

  const deniedAcessUserLocation = () => {
    setSnackbarState({
      message: 'É necessário informar sua localização para abrir o mapa',
      visible: true,
    });

    navigation.goBack();
  };

  const getUserPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => deniedAcessUserLocation()
    );
  };

  const showPartnerDetails = (partner: PartnerDTO) =>
    navigation.navigate(`PartnerContainer`, {
      partnerId: partner.id,
    });

  const centerMapOnMarker = (markerIndex: number) => {
    if (mapRef && mapRef.current && markerIndex >= 0) {
      const partner: PartnerDTO = { ...partners[markerIndex] };

      mapRef.current.animateToRegion({
        latitude: partner.address.latitude,
        longitude: partner.address.longitude,
        latitudeDelta: ZOOM_LATITUDADE,
        longitudeDelta: ZOOM_LONGITUDE,
      });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.card} key={index}>
        <View style={{ alignItems: 'flex-start' }}>
          <Title style={mainStyles.title}>{item.name}</Title>
          <Subheading style={mainStyles.subHeading}>
            {`Cidade: ${item.address.locality} - ${item.address.federatedUnit}`}
          </Subheading>
          <Subheading style={mainStyles.subHeading}>
            {`Bairro: ${item.address.district}`}
          </Subheading>
          <Subheading style={mainStyles.subHeading}>
            {`Endereço: ${item.address.publicPlace}`}
          </Subheading>
          <Subheading style={mainStyles.subHeading}>
            {`Telefone: ${item.phoneNumber}`}
          </Subheading>
        </View>

        <View style={{ marginTop: '5%' }}>
          <Button
            accessibilityStates
            color="#FFFFFF"
            onPress={() => showPartnerDetails(item)}
            mode="text"
            labelStyle={{ color: '#ffbf00' }}
          >
            Ver Mais Detalhes
          </Button>
        </View>
      </View>
    );
  };

  return (
    <>
      {userLocation && partners && partners.length > 0 ? (
        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            region={{
              latitude: partner.address.latitude,
              longitude: partner.address.longitude,
              latitudeDelta: ZOOM_LATITUDADE,
              longitudeDelta: ZOOM_LONGITUDE,
            }}
            customMapStyle={mapStyle}
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            showsCompass={false}
            showsTraffic={false}
            showsIndoors={false}
            showsPointsOfInterest={true}
            showsBuildings={false}
          >
            {partners.map((value, index) => (
              <Marker
                key={index}
                title={value.name}
                coordinate={{
                  latitude: value.address.latitude,
                  longitude: value.address.longitude,
                }}
                image={require('../../img/icon.png')}
              />
            ))}

            <Marker
              title={'SUPER XANDÃO'}
              description={'PEITO DE AÇO'}
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
            />
          </MapView>

          <View style={styles.scrollView}>
            {firstItem && firstItem >= 0 && (
              <Carousel
                firstItem={firstItem}
                onSnapToItem={(index) => centerMapOnMarker(index)}
                data={partners}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                layout={'default'}
                inactiveSlideOpacity={0.5}
                activeAnimationType={'spring'}
              />
            )}
          </View>
        </View>
      ) : (
        <EmptyListPlaceholder
          message={
            'É necessário informar sua localização para abrir o Mapa dos Parceiros'
          }
          loading={loading}
        />
      )}
      <SnackbarNotification
        snackbarState={snackbarState}
        dismissSnackbar={() =>
          setSnackbarState({
            message: '',
            visible: false,
          })
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  tex: {
    fontSize: 15,
    marginBottom: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  cardDescription: {
    fontSize: 12,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5,
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: '#ffbf00',
    borderWidth: 1,
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffbf00',
  },
});

export { PartnerMap };
