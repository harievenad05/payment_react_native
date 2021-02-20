import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Block, Checkbox, Text, theme} from 'galio-framework';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import {Button, Icon, Input} from '../../components';
import {Images, appTheme} from '../../common/constants';
import {CustomerLogin} from './action';
import styles from './styles';
import Loader from '../../components/Loader';

const {width, height} = Dimensions.get('screen');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
      isLoading: false,
      isLoggedIn: false,
    };
  }

  setEmail = (username) => {
    this.setState({
      username: username,
    });
    // this.props.emailChanged(email);
    console.log(this.state.username, 'aghsghasgashghsa');
  };

  setPassword = (password) => {
    if (password !== '') {
      this.setState({
        password: password,
        eye_icon: true,
      });
    } else {
      this.setState({
        password: password,
        eye_icon: false,
      });
    }
    // this.props.passwordChanged(password);
    console.log(this.state.password, 'aghsghasgashghsa');
  };

  onLoginPressHandler = () => {
    Keyboard.dismiss();
    if (this.state.username !== '' && this.state.password !== '') {
      this.setState({isLoading: true});
      let details = {
        email: this.state.username,
        password: this.state.password
      }
      this.props.CustomerLogin({
        details,
        onSuccess: isSuccess => this.setState({isLoading: false}),
        onError: error => {
          console.log(error.status);
          this.setState({isLoading: false});
          alert('Some Error Occured')
        },
      });
      // Alert.alert('Login Success', '')
    } else {
      Alert.alert('Login Error', 'Field(s) should not be empty');
    }
  };

  render() {
    const {isLoading} = this.state;
    console.log('userNameCheck', this.state.username);
    return (
      <Block flex middle>
        <StatusBar hidden />
        <Loader loading={isLoading} />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{width, height, zIndex: 1}}>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block
                flex
                style={{marginTop: Dimensions.get('window').height / 7}}>
                <Block flex={0.17} middle style={{marginTop: -20}}>
                  <Text size={22} h2={true}>
                    Login
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior="padding"
                    enabled={true}>
                    <Block width={width * 0.8} style={{marginBottom: 15}}>
                      <Input
                        borderless
                        placeholder="Email"
                        onChangeText={(username) => this.setEmail(username)}
                        value={this.state.username}
                        keyboardType={'email-address'}
                        autoCapitalize="none"
                        iconContent={
                          <Icon
                            size={16}
                            color={appTheme.COLORS.ICON}
                            name="mail-outline"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        onChangeText={(password) => this.setPassword(password)}
                        value={this.state.password}
                        iconContent={
                          <Icon
                            size={16}
                            color={appTheme.COLORS.ICON}
                            name="key-outline"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block middle style={{marginBottom: 20}}>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={this.onLoginPressHandler}>
                        <Text bold size={14} color={appTheme.COLORS.WHITE}>
                          LOGIN
                        </Text>
                      </Button>
                    </Block>
                    <Block middle>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                          <Text>Don't have Account?</Text>
                        </TouchableOpacity>
                    </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }
}

const mapStateToProps = (state) => ({
  LoginReducer: state.LoginReducer,
});

const mapDispatchToProps = {
  CustomerLogin: CustomerLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
