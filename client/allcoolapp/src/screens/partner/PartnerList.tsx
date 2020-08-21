import React, { useState, useEffect } from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { View, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { Divider, Title, Subheading, Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PartnerService } from '../../service';
import { rowStyle, mainStyles } from '../../styles';
import { PartnerDTO } from '../../types/dto';
import {
  PartnerListNavigationProp,
  PartnersListRouteProp,
} from '../../navigation';
import {
  EmptyListPlaceholder,
  SnackbarState,
  SnackbarNotification,
} from '../../components';
import { useLoading } from '../../hooks';
import { Text } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

type Props = {
  navigation: PartnerListNavigationProp;
  route: PartnersListRouteProp;
};

const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
})

const PartnerList: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<PartnerDTO[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useLoading();
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    visible: false,
  });

  useEffect(() => {
    setLoading(
      PartnerService.findAll()
        .then(({ data }) => {
          setPartners(data);
          setFilteredPartners(data);
        })
        .catch(({ response }) =>
          setSnackbarState({
            message: response.data?.message || response.data,
            visible: true,
          })
        )
    );
    //eslint-disable-next-line
  }, []);

  const filter = () => {
    const filteredArray = partners.filter((p) =>
      p.name.trim().toLowerCase().includes(search.trim().toLowerCase())
    );

    setFilteredPartners(filteredArray);
  };

  const view = (partner: PartnerDTO) =>
    navigation.navigate(`PartnerContainer`, {
      partnerId: partner.id,
    });

  const handleChange = (text: string) => {
    if (text) {
      return setSearch(text);
    }

    setFilteredPartners(partners);
    setSearch('');
  };

  return (
    <>
      <Searchbar
        accessibilityStates
        placeholder="Pesquisar"
        onChangeText={(text) => handleChange(text)}
        onBlur={filter}
        value={search}
      />
      {filteredPartners && filteredPartners.length > 0 ? (

        <View style={{ flex: 1, width: screenWidth}}>

          <View style={{width: 400, height: 300, margin: 6}}>
            <MapView 
              region={{
                latitude: -23.444792,
                longitude: -51.918083,
                latitudeDelta: 0.0050, // zoom
                longitudeDelta: 0.0050,
              }}
              customMapStyle={dark}
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              showsPointsOfInterest={false}
              showsBuildings={false}
              showsCompass={false}
              showsIndoors={false}
              
            >
            </MapView>
          </View>


            <FlatList
                data={filteredPartners}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <>
                  <TouchableOpacity onPress={() => view(item)}>
                    <View style={rowStyle}>
                      <View style={{ marginLeft: '5%', marginTop: '6.5%' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                          <Title style={mainStyles.title}>{item.name}</Title>
                        </View>
                        <View>
                          <Subheading style={mainStyles.subHeading}>
                            {`${
                              item.address.length > 40
                                ? item.address.slice(0, 40).concat('...')
                                : item.address
                            }`}
                          </Subheading>
                        </View>
                        <View>
                          <Subheading style={mainStyles.subHeading}>
                            {`${item.locality}`} - {`${item.phoneNumber}`}
                          </Subheading>
                        </View>
                      </View>
                      <View
                        style={{
                          paddingLeft: '5%',
                          marginTop: '10%',
                          flex: 1,
                          flexDirection: 'row-reverse',
                        }}
                      >
                        <MaterialCommunityIcons
                          name="map-search-outline"
                          color={'#ffbf00'}
                          size={50}
                        />
                      </View>
                    </View>
                    <View style={{ marginTop: '6.5%', backgroundColor: '#ffbf00' }}>
                      <Divider accessibilityStates />
                    </View>
                  </TouchableOpacity>
              </>
              )}
            />

  
        </View>
      
      ) : (
        <EmptyListPlaceholder loading={loading} />
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

export { PartnerList };

const dark = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]