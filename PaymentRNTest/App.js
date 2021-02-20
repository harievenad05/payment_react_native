import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button} from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import { getLoginEndpoint } from './src/common/utils/api-end-points';
import { store } from './src/redux/store/configureStore';
import Register from './src/pages/Register';
import Login from './src/pages/Login';

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <View style={styles.container}>
      <Login/>
    </View>
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
