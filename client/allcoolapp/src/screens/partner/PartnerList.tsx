import React, { useState, useEffect } from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { Dimensions, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { PartnerService } from '../../service';
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
import Geolocation from '@react-native-community/geolocation';

type Props = {
  navigation: PartnerListNavigationProp;
  route: PartnersListRouteProp;
};

type usera = {
  latitude: number,
  longitude: number,
};

const arrLat = [
  {
    latitude: -23.4116408,
    longitude: -51.9433306,
  },
  {
    latitude: -23.4109165,
    longitude: -51.943674,
  },
  {
    latitude: -23.4112353,
    longitude: -51.9434983,
  }
]

const PartnerList: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<PartnerDTO[]>([]);
  const [search, setSearch] = useState('');
  const [usera, setUsera] = useState<usera>();
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
    getPosition();
    
    //eslint-disable-next-line
  }, []);

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setUsera({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      e => console.log(e.message)
    );
  }

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
      {usera && filteredPartners && filteredPartners.length > 0 ? (
        <MapView 
          region={{
            latitude: -23.4121735,
            longitude: -51.9440588,
            latitudeDelta: 0.0045, // zoom
            longitudeDelta: 0.0045,
          }}
          customMapStyle={dark}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsCompass={false}
          showsTraffic={false}
          showsIndoors={false}
          showsPointsOfInterest={true}
          showsBuildings={false}
        >
          {arrLat.map((local, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: local.latitude,
                    longitude: local.longitude,
                  }}
                  image={require('../../img/icon.png')}
                />           
          ))}
          
          <Marker
            title={"SUPER XANDÃO"}
            description={"PEITO DE AÇO"}
            coordinate={{
              latitude: usera.latitude,
              longitude: usera.longitude,
            }}
          />   
        </MapView>
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

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});

export { PartnerList };

const dark =[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]