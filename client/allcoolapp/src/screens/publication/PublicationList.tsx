import React, { useState, useEffect } from 'react';
import {
  PublicationListRouteProp,
  PublicationListNavigationProp,
} from '../../navigation';
import { View, Dimensions, RefreshControl } from 'react-native';
import { mainStyles, rowStyle } from '../../styles';
import { Title, Divider, Subheading } from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {
  SnackbarState,
  EmptyListPlaceholder,
  SnackbarNotification,
  Loading,
} from '../../components';
import { PublicationDTO } from '../../types/dto';
import { useLoading } from '../../hooks';
import { PublicationService } from '../../service';

type Props = {
  route: PublicationListRouteProp;
  navigation: PublicationListNavigationProp;
};

const dimensions = Dimensions.get('window');
const screenWidth = dimensions.width;

const PublicationList: React.FC<Props> = ({
  navigation,
  route: {
    params: { userId },
  },
}) => {
  const [loading, setLoading] = useLoading();
  const [publications, setPublications] = useState<PublicationDTO[]>([]);
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: '',
    visible: false,
  });

  const onRefresh = () =>
    setLoading(
      PublicationService.findAll()
        .then(({ data }) => setPublications(data))
        .catch(({ response }) =>
          setSnackbarState({
            message: response.data?.message || response.data,
            visible: true,
          })
        )
    );

  useEffect(() => {
    onRefresh();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {(publications && publications.length > 0) || !loading ? (
        <FlatList
          data={publications}
          style={{
            flex: 1,
            width: screenWidth,
          }}
          ListEmptyComponent={<EmptyListPlaceholder loading={loading} />}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.id!}
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.push('PublicationView', {
                    userId,
                    publicationId: '1',
                  })
                }
              >
                <View style={rowStyle}>
                  <View style={{ marginTop: '5%', marginLeft: '5%' }}>
                    <View style={{ alignItems: 'flex-start' }}>
                      <Title style={mainStyles.title}>
                        {item.review?.productName}
                      </Title>
                    </View>
                    <View style={{ alignItems: 'flex-start' }}>
                      <Subheading style={mainStyles.subHeading}>
                        {item.review?.description}
                      </Subheading>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: '3%', backgroundColor: '#ffbf00' }}>
                  <Divider accessibilityStates />
                </View>
              </TouchableOpacity>
            </>
          )}
        />
      ) : (
        <Loading />
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

export { PublicationList };
