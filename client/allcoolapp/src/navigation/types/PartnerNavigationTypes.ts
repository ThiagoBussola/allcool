import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { PartnerDTO } from 'src/types/dto';

type PartnerContainerStackParamList = {
  PartnerContainer: { partnerId: string; userId: string };
  Products: { userId: string } | undefined;
};

export type PartnerContainerNavigationProp = StackNavigationProp<
  PartnerContainerStackParamList,
  'PartnerContainer'
>;

export type PartnerContainerRouteProp = RouteProp<
  PartnerContainerStackParamList,
  'PartnerContainer'
>;

type PartnerListStackParamList = {
  Partners: { userId: string };
  PartnerContainer: { partnerId: string };
  PartnerMap: { partner: PartnerDTO };
};

export type PartnerListNavigationProp = StackNavigationProp<
  PartnerListStackParamList,
  'Partners'
>;

export type PartnersListRouteProp = RouteProp<
  PartnerListStackParamList,
  'Partners'
>;

type PartnerMapStackParamList = {
  Partners: { userId: string };
  PartnerContainer: { partnerId: string };
  PartnerMap: { partner: PartnerDTO };
};

export type PartnerMapNavigationProp = StackNavigationProp<
  PartnerMapStackParamList,
  'PartnerMap'
>;

export type PartnersMapRouteProp = RouteProp<
  PartnerMapStackParamList,
  'PartnerMap'
>;
