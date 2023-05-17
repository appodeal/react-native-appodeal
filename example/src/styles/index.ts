import {StyleSheet, Platform} from 'react-native';

const statusBarHeight = Platform.OS === 'ios' ? 35 : 0;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    backgroundColor: '#hsl(0, 0%, 97%)',
    height: 44 + statusBarHeight,
    alignSelf: 'stretch',
    paddingTop: statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: 'black',
    fontSize: 16,
  },
  _scrollView: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'hsl(0, 0%, 97%)',
  },
  get scrollView() {
    return this._scrollView;
  },
  set scrollView(value) {
    this._scrollView = value;
  },
  sectionHeader: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
    color: '#999',
    fontSize: 14,
  },
  sectionFooter: {
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    color: '#999',
    fontSize: 12,
  },
  rowContainer: {
    backgroundColor: 'transparent',
    height: 44,
    alignItems: 'stretch',
  },
  borderContainer: {
    alignSelf: 'stretch',
    height: 1,
    paddingLeft: 16,
    backgroundColor: 'white',
  },
  border: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  link: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    alignContent: 'stretch',
  },
  contentRowContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titlesRowContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },
  accessoryContainer: {
    alignContent: 'stretch',
    paddingRight: 8,
  },
  rowTitle: {
    color: 'black',
    fontSize: 16,
    marginRight: 16,
  },
  rowRightDetail: {
    color: 'gray',
    fontSize: 16,
    marginRight: 15,
  },
  banner: {
    height: 50,
    marginVertical: 8,
    width: '100%',
    backgroundColor: 'hsl(0, 0%, 97%)',
    alignContent: 'stretch',
  },
  mrec: {
    height: 250,
    marginVertical: 8,
    width: '100%',
    backgroundColor: 'hsl(0, 0%, 97%)',
    alignContent: 'stretch',
  },
  buttonSelected: {
    flex: 1,
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    margin: 8,
    height: 26,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#53d769',
  },
  buttonPlain: {
    flex: 1,
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    margin: 8,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  segmentedControl: {
    margin: 8,
  },
});
