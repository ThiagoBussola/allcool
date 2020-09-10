import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type ProfileViewStackParamList = {
  ProfileView: { userId: string };
};

export type ProfileViewNavigationProp = StackNavigationProp<
  ProfileViewStackParamList,
  'ProfileView'
>;

export type ProfileViewRouteProp = RouteProp<
  ProfileViewStackParamList,
  'ProfileView'
>;
