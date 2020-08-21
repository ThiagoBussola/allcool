import React from 'react';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { News } from '../../types';

type Props = {
  news: News;
};

const NewsPublicationCardChildren: React.FC<Props> = ({ news }) => (
  <>
    {!!news.file?.url && (
      <Card.Cover accessibilityStates source={{ uri: news.file?.url }} />
    )}
    <Card.Title
      accessibilityStates
      title={news.eventDate}
      left={() => (
        <Avatar.Image
          accessibilityStates
          size={40}
          source={require('../../img/AllcoolV1.1.png')}
        />
      )}
    />
    <Card.Content>
      <Title>{news.rating}</Title>
      <Paragraph>{news.description}</Paragraph>
    </Card.Content>
  </>
);

export { NewsPublicationCardChildren };
