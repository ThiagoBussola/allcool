import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import {
  PartnerContainerNavigationProp,
  PartnerContainerRouteProp,
} from '../../navigation';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { boldTextStyles, textStyles, mainStyles } from '../../styles';
import { Headline, Chip } from 'react-native-paper';
import { PartnerService } from '../../service';
import { PartnerViewDTO } from '../../types/dto';
import { SnackbarNotification, SnackbarState } from '../../components';
import { Rating } from 'react-native-ratings';

type Props = {
  navigation: PartnerContainerNavigationProp;
  route: PartnerContainerRouteProp;
};

const PartnerContainer: React.FC<Props> = ({
  navigation,
  route: {
    params: { partnerId, userId },
  },
}) => {
  const [partner, setPartner] = useState<PartnerViewDTO>({});
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    visible: false,
  });

  useEffect(() => {
    PartnerService.findById(partnerId)
      .then(({ data }) => setPartner(data))
      .catch(({ response }) =>
        setSnackbarState({
          message: response.data?.message || response.data,
          visible: true,
        })
      );
  }, [partnerId, userId]);

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={{}}>
          {!!partner.fileDTO?.id && (
            <View style={{ alignSelf: 'center' }}>
              <Image
                style={{ width: 360, height: 240 }}
                source={{
                  uri: partner.fileDTO?.url,
                }}
                resizeMode="stretch"
              />
            </View>
          )}
        </View>

        <View style={mainStyles.container}>
          <View style={{ alignItems: 'flex-start' }}>
            <View style={{ marginTop: '3%' }}>
              <Headline style={boldTextStyles}>{partner.name}</Headline>
            </View>
            <View>
              <Rating
                type="custom"
                startingValue={partner.rating}
                readonly
                imageSize={20}
              />
            </View>
          </View>

          <View>
            <Text style={textStyles}>{partner.address}</Text>
          </View>

          <View>
            <Text style={textStyles}>{partner.locality}</Text>
          </View>

          <View>
            <Text style={textStyles}>{`Fone: ${partner.phoneNumber}`}</Text>
          </View>

          <View>
            <View style={{ marginTop: '2%' }}>
              <Headline style={boldTextStyles}>Descrição</Headline>
            </View>
            <Text style={textStyles}>{partner.description}</Text>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: '5%',
              flexWrap: 'nowrap',
            }}
          >
            <View style={{ marginTop: '2%' }}>
              <Headline style={boldTextStyles}>
                Horário de Funcionamento
              </Headline>
            </View>
            {partner.workingPeriodDTOList?.map((wp, index) => (
              <View
                key={index}
                style={{
                  margin: '1%',
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{ marginTop: '3%', alignItems: 'stretch', width: 85 }}
                >
                  <Text style={textStyles}>{`${wp.day}:`}</Text>
                </View>
                <View style={{ marginLeft: '5%' }}>
                  <Chip
                    accessibilityStates
                    key={wp.id}
                    mode="outlined"
                    textStyle={{ color: 'black', fontSize: 14 }}
                    selectedColor="black"
                    style={{
                      backgroundColor: '#ffbf00',
                    }}
                  >
                    {wp.openingTime}
                  </Chip>
                </View>
                <View style={{ marginLeft: '3%' }}>
                  <Chip
                    accessibilityStates
                    key={wp.id}
                    mode="outlined"
                    textStyle={{ color: 'black', fontSize: 14 }}
                    selectedColor="black"
                    style={{
                      backgroundColor: '#ffbf00',
                    }}
                  >
                    {wp.closingTime}
                  </Chip>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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

export { PartnerContainer };
