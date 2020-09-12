import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
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

type Props = {
  navigation: PartnerMapNavigationProp;
  route: PartnersMapRouteProp;
};

type userLocation = {
  latitude: number;
  longitude: number;
};

const ZOOM_LATITUDADE = 0.01;
const ZOOM_LONGITUDE = 0.01;

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const PartnerMap: React.FC<Props> = ({
  navigation,
  route: {
    params: { partner },
  },
}) => {
  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const [userLocation, setUserLocation] = useState<userLocation>();
  const [loading, setLoading] = useLoading();
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    visible: false,
  });

  let mapAnimation = new Animated.Value(0);
  const _scrollView = React.useRef(null);

  useEffect(() => {
    getUserPosition();

    setLoading(
      PartnerService.findAll()
        .then(({ data }) => {
          setPartners(data);
        })
        .catch(({ response }) =>
          setSnackbarState({
            message: response.data?.message || response.data,
            visible: true,
          })
        )
    );
  }, []);

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

  return (
    <>
      {userLocation && partners && partners.length > 0 ? (
        <View style={{ flex: 1 }}>
          <MapView
            region={{
              latitude: partner.latitude,
              longitude: partner.longitude,
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
                  latitude: value.latitude,
                  longitude: value.longitude,
                }}
                image={require('../../img/icon.png')}
              >
                <Callout tooltip>
                  <View style={styles.bubble}>
                    <Text style={styles.tex}>{value.name}</Text>
                  </View>
                  <View style={styles.arrowBorder} />
                  <View style={styles.arrow} />
                </Callout>
              </Marker>
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

          <Animated.ScrollView
            ref={_scrollView}
            horizontal
            pagingEnabled
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 20}
            snapToAlignment="center"
            style={styles.scrollView}
            contentInset={{
              top: 0,
              left: SPACING_FOR_CARD_INSET,
              bottom: 0,
              right: SPACING_FOR_CARD_INSET,
            }}
            contentContainerStyle={{
              paddingHorizontal: SPACING_FOR_CARD_INSET,
            }}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          >
            {partners.map((marker, index) => (
              <View style={styles.card} key={index}>
                <View style={styles.textContent}>
                  <Text numberOfLines={1} style={styles.cardtitle}>
                    {marker.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.locality}
                  </Text>
                  <View style={styles.button}>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={[
                        styles.signIn,
                        {
                          borderColor: '#ffbf00',
                          borderWidth: 1,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.textSign,
                          {
                            color: '#ffbf00',
                          },
                        ]}
                      >
                        Ver Detalhes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </Animated.ScrollView>
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
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
  },
  tex: {
    fontSize: 15,
    marginBottom: 10,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15
  },
  searchBox: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
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
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: 'bold',
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
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export { PartnerMap };
