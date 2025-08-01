import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  // App Container Styles
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Screen Content Styles
  content: {
    padding: 20,
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Header Styles
  headerContainer: {
    backgroundColor: '#007AFF',
  },
  header: {
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    height: 56,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Text Styles
  pluginVersion: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  sdkVersion: {
    marginBottom: 20,
    fontWeight: 'bold',
  },

  // Button Styles
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  backButton: {
    backgroundColor: '#FF3B30',
    marginTop: 20,
  },

  // Ad Component Styles
  banner: {
    marginTop: 40,
    height: 50,
    width: 320,
    alignSelf: 'center',
  },
  mrec: {
    height: 250,
    marginTop: 40,
    width: 300,
    alignSelf: 'center',
  },
});
