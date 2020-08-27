import React from 'react';
import { Card, Paragraph, IconButton } from 'react-native-paper';
import { ReadOnlyStarRating } from '../../components';
import { NewsDTO } from '../../types/dto';

type Props = {
  news: NewsDTO;
  itemIndex: number;
  touched: boolean;
  onLikePublication: (index: number) => void;
};

const NewsPublicationCardChildren: React.FC<Props> = ({
  news,
  itemIndex,
  touched,
  onLikePublication,
}) => (
  <>
    {!!news.pictureUrl && (
      <Card.Cover accessibilityStates source={{ uri: news.pictureUrl }} />
    )}
    <Card.Title
      accessibilityStates
      title={news.title}
      subtitle={`${
        news.address?.id &&
        `Endereço: ${news.address.publicPlace}, ${news.address.locality}, ${news.address.federatedUnit}\n`
      }Data: ${news.eventDate}`}
      subtitleNumberOfLines={2}
      subtitleStyle={{ fontSize: 14 }}
      titleStyle={{ fontSize: 22, marginTop: '4%' }}
      right={() => <ReadOnlyStarRating rating={news.rating || 0} />}
    />
    <Card.Content style={{ marginTop: '2%' }}>
      <Paragraph>
        {news.description && news.description.length > 200
          ? news.description?.slice(0, 500)
          : news.description}
      </Paragraph>
    </Card.Content>
    <Card.Actions style={{ justifyContent: 'flex-end', margin: '-4%' }}>
      <IconButton
        accessibilityStates
        icon={touched ? 'beer' : 'beer-outline'}
        color="#ffbf00"
        animated
        size={36}
        onPress={() => onLikePublication(itemIndex)}
      />
    </Card.Actions>
  </>
);

export { NewsPublicationCardChildren };
