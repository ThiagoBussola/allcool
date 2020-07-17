import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Divider, Title, Subheading, Searchbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PartnerService } from '../../service';
import { listImageStyle, rowStyle } from '../../styles';
import { PartnerDTO } from '../../types/dto/PartnerDTO';
import {
  PartnerListNavigationProp,
  PartnersListRouteProp,
} from '../../navigation';

type Props = {
  navigation: PartnerListNavigationProp;
  route: PartnersListRouteProp;
};

const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;

const PartnerList: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  const [partners, setPartners] = useState<PartnerDTO[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<PartnerDTO[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    PartnerService.findAll().then(({ data }) => {
      setPartners(data);
      setFilteredPartners(data);
    });
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
        <FlatList
          data={filteredPartners}
          style={{
            flex: 1,
            width: screenWidth,
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity onPress={() => view(item)}>
                <View style={rowStyle}>
                  <View style={{ marginLeft: '5%' }}>
                    <View style={{ alignItems: 'flex-start', marginTop: '1%' }}>
                      <Title>{item.name}</Title>
                    </View>
                    <View>
                      <Subheading style={{ fontSize: 12 }}>
                        {`${item.address}`}
                      </Subheading>
                    </View>
                    <View>
                      <Subheading style={{ fontSize: 12 }}>
                        {`${item.locality}`} - {`${item.phoneNumber}`}
                      </Subheading>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingLeft: '5%',
                      marginTop: '7%',
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
                <View style={{ marginTop: '5%', backgroundColor: '#ffbf00' }}>
                  <Divider accessibilityStates />
                </View>
              </TouchableOpacity>
            </>
          )}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', marginTop: '50%' }}>
            <Image
              style={listImageStyle}
              source={require('../../img/AllcoolV1.1.png')}
              resizeMode="contain"
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: '5%' }}>
            <Title>Nenhum parceiro encontrado</Title>
          </View>
        </View>
      )}
    </>
  );
};

export { PartnerList };
