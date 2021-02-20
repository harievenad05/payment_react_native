import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, ScrollView, Dimensions, Image, Alert, Platform,} from 'react-native';
import {connect} from 'react-redux';
import {Block, Text, theme} from 'galio-framework';
import styles from './styles';
import {doLogout} from '../Login/action'

import {Images, appTheme} from '../../common/constants';
import {HeaderHeight} from '../../common/constants/commonUtils';
import {Button, Icon, Input} from '../../components';
import moment from 'moment'

const { width, height } = Dimensions.get("screen");

class Profile extends Component {

  onLogoutHandler = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to Logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Logout',
          //style: 'destructive',
          onPress: () => {
            this.props.doLogout(
              this.props.navigation.replace('OnboardingStack'),
            );
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {LoginReducer} = this.props
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <View style={{marginTop: Platform.OS === 'ios' ? HeaderHeight + 35 :HeaderHeight + 5, zIndex: 10 }}>
            <ImageBackground
              source={Images.ProfileBackground}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}>
                <ScrollView showsVerticalScrollIndicator={false}
                  style={{width, marginTop: '10%'}}>

                <Block flex style={styles.profileCard}>
                <Block middle style={styles.avatarContainer}>
                  <Image
                    source={{uri: Images.ProfilePicture}}
                    style={styles.avatar}
                  />
                </Block>

                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      {LoginReducer.details.user_name !== '' ? LoginReducer.details.user_name : ''}
                    </Text>
                    <Text size={16} color="#32325D" style={{marginTop: 15}}>
                      {LoginReducer.details.phone_no}
                    </Text>
                    <Text size={16} color="#32325D" style={{marginTop: 15}}>
                      {LoginReducer.details.email}
                    </Text>
                    <Text size={16} color="#32325D" style={{marginTop: 15}}>
                      { LoginReducer.details && LoginReducer.details.dob && LoginReducer.details.dob.substring(0, 16)}
                    </Text>
                  </Block>
                  <Block middle style={{marginTop: 30, marginBottom: 16}}>
                    <Block style={styles.divider} />
                  </Block>
                  <Block middle>
                    <Button
                      small
                      style={{backgroundColor: appTheme.COLORS.INFO}}
                      onPress={() => this.onLogoutHandler()}>
                      LOGOUT
                    </Button>
                  </Block>
                </Block>
                </Block>
                </ScrollView>
              </ImageBackground>
          </View>
        </Block>
        {/* <Text>{this.props.LoginReducer.details.user_name}</Text> */}
      </Block>
    );
  }
}

const mapStateToProps = (state) => ({
  LoginReducer: state.LoginReducer,
});
const mapDispatchToProps = {
  doLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
