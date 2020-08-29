import React from 'react';
import { UserClientDTO } from '../../types/dto';
import {
  Avatar,
  Title,
  Divider,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import { mainStyles, rowStyle } from '../../styles';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  loggedUser: UserClientDTO;
};

const ProfileViewHeader: React.FC<Props> = ({ loggedUser }) => {
  return (
    <>
      <View style={[rowStyle, { marginTop: '2%' }]}>
        <View>
          <Avatar.Image
            accessibilityStates
            size={50}
            source={
              loggedUser.userPicture?.url
                ? { uri: loggedUser.userPicture.url }
                : require('../../img/AllcoolV1.1.png')
            }
            style={{
              backgroundColor: 'white',
              marginLeft: '5%',
              marginTop: '3%',
            }}
          />
          <Title
            style={[
              mainStyles.title,
              {
                marginLeft: '5%',
              },
            ]}
          >
            {loggedUser.name}
          </Title>
          <Paragraph
            style={[
              {
                fontSize: 18,
                marginLeft: '5%',
                marginBottom: '5%',
              },
            ]}
          >
            {loggedUser.bio}
          </Paragraph>
          {loggedUser.location && (
            <View style={{ marginLeft: '4%' }}>
              <View style={rowStyle}>
                <MaterialCommunityIcons
                  name="map-marker"
                  color="grey"
                  size={20}
                />
                <Paragraph
                  style={[
                    {
                      color: 'grey',
                      marginLeft: '1%',
                      fontSize: 18,
                    },
                  ]}
                >
                  {loggedUser.location}
                </Paragraph>
              </View>
            </View>
          )}
          <View style={{ marginLeft: '4%', marginBottom: '3%' }}>
            <View style={rowStyle}>
              <MaterialCommunityIcons name="calendar" color="grey" size={20} />
              <Paragraph
                style={[
                  {
                    color: 'grey',
                    marginLeft: '1%',
                    fontSize: 18,
                  },
                ]}
              >
                Nascido em {loggedUser.birthDate}
              </Paragraph>
            </View>
          </View>
          <View style={{ marginLeft: '5%' }}>
            <View style={rowStyle}>
              <Paragraph
                style={[
                  {
                    fontSize: 18,
                  },
                ]}
              >
                {`42 `}
              </Paragraph>
              <Paragraph
                style={[
                  {
                    color: 'grey',
                    fontSize: 18,
                  },
                ]}
              >
                Conexões
              </Paragraph>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
          }}
        >
          <IconButton
            accessibilityStates
            icon="account-cog"
            color="#ffbf00"
            animated
            size={32}
            onPress={() => {}}
          />
        </View>
      </View>
      <View style={{ marginTop: '3%', backgroundColor: '#ffbf00' }}>
        <Divider accessibilityStates />
      </View>
    </>
  );
};

export { ProfileViewHeader };
