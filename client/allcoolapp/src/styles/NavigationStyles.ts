import { StackNavigationOptions } from '@react-navigation/stack';

export const screenOptions = (headerTitle: string): StackNavigationOptions => ({
  headerTitle: headerTitle,
  headerStyle: {
    backgroundColor: '#ffbf00',
  },
  headerTintColor: '#fff',
});
