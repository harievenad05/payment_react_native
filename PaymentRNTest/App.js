import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button} from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import { getLoginEndpoint } from './src/common/utils/api-end-points';
import { store } from './src/redux/store/configureStore';
import AuthNavigator from "./src/navigation/Screens";

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <AuthNavigator />
    </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
