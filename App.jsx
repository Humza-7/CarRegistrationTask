/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import MainNavigation from './src/navigationStack/MainStack';
import { NativeBaseProvider } from "native-base";
import { store } from './src/store/store'
import { Provider } from 'react-redux'

const App = () => {

  return (
    <Provider store={store}>
    <NativeBaseProvider>
    <SafeAreaView style={styles.root}>
      <MainNavigation />
    </SafeAreaView>
    </NativeBaseProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
