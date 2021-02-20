import { Block } from 'galio-framework';
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      const {LoginReducer} = this.props;
      const {isLoggedIn = false} = LoginReducer;
      const replaceText = isLoggedIn ? 'AppTabNav' : 'LoginScreen';
      this.props.navigation.replace(replaceText);
    }, 3000);
  }

  render() {
    return (
      <SafeAreaView style={styles.background}>
        <StatusBar hidden={true} />
        <Image
          source={require('../../assets/imgs/dummy-logo.png')}
          style={styles.logo}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  LoginReducer: state.LoginReducer,
});

export default connect(mapStateToProps)(SplashScreen);
