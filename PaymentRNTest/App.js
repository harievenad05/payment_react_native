import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'galio-framework';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Block, GalioProvider} from 'galio-framework';
import {getLoginEndpoint} from './src/common/utils/api-end-points';
import {store} from './src/redux/store/configureStore';
import {appTheme} from './src/common/constants';
import AuthNavigator from './src/navigation/Screens';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GalioProvider theme={appTheme}>
          <Block flex>
            <AuthNavigator />
          </Block>
        </GalioProvider>
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
