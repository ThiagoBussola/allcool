import { StyleSheet } from 'react-native';

export const mainStyles = StyleSheet.create({
  mainAppBackgroundColor: {
    backgroundColor: '#f2f2f2',
  },
  mainColor: {
    color: '#ffbf00',
  },
  container: {
    flex: 1,
    alignContent: 'center',
    paddingHorizontal: '3.3%',
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 10,
    width: 300,
    fontSize: 15,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  button: {
    width: 300,
    height: 42,
    backgroundColor: '#ffbf00',
    marginTop: 15,
  },
  textButton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffbf00',
  },
  subHeading: { color: '#888888', fontSize: 14, marginTop: '-1%' },
});
