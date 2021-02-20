import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from "moment";
import {Block, Checkbox, Text, theme} from 'galio-framework';
import {Button, Icon, Input} from '../../components';
import {Images, appTheme} from '../../common/constants';
import styles from './styles';
import {RegisterUserAction} from '../Login/action';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';

const {width, height} = Dimensions.get('screen');

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dob: '',
      dateofbirth: '',
      isDatePickerVisible: false,
      phonenum: '',
      name: '',
      email: '',
      password: '',
      isLoading: false
    };
  }

  handlePickedDate = (date) => {
  let dateReceived = moment(date).format('YYYY-MM-DD');
  console.log('agggggggeeee', this.getAge(date))
  if(this.getAge(date) >= 12){
    this.setState({dob: dateReceived})
  } else {
    Alert.alert('You should be atleast 12 years old')
  }

    this.showHideDatePicker();
  };

  showHideDatePicker = () => {
    this.setState({isDatePickerVisible: !this.state.isDatePickerVisible});
  };

   getAge = (dateOfBirth) => {
    const dob = moment(dateOfBirth);
    return moment(new Date()).diff(dob, 'years');
  };

  checkPhoneNum = () => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(format.test(this.state.phonenum)){
      this.setState({phonenum: ''})
      Alert.alert('Mobile num should not contain special characters')
      return false;
    }  else {
      // alert(this.state.phonenum)
      console.log(this.state.phonenum)
      return true;
    }
  }

  onRegisterPressHandler = () => {
    Keyboard.dismiss();
    if (this.state.name !== '' && this.state.email !== '' && this.state.dob !== '' && this.state.phonenum && this.state.password) {
      let formattedDate = moment(this.state.dob,"YYYY-MM-DD")
      this.setState({isLoading: true});
      let details = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        dob: formattedDate.toISOString(),
        phoneno: this.state.phonenum
      }
      this.props.RegisterUserAction({
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
      Alert.alert('Register Error', 'Field(s) should not be empty');
    }
  };

  render() {
    const {isLoading} = this.state;
    return (
      <Block flex middle>
        <StatusBar hidden />
        <Loader loading={isLoading} />
        <ImageBackground
          source={Images.RegisterBackground}
          style={{width, height, zIndex: 1}}>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex>
                <Block flex={0.17} middle>
                  <Text color="#8898AA" size={18} bold>
                    Register
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior="padding"
                    enabled>
                    <DateTimePickerModal
                      isVisible={this.state.isDatePickerVisible}
                      mode="date"
                      minimumDate={new Date(1950, 0, 1)}
                      maximumDate={new Date()}
                      onConfirm={(date) => this.handlePickedDate(date)}
                      onCancel={() => this.showHideDatePicker()}
                    />
                    <Block width={width * 0.8} style={{marginBottom: 15}}>
                      <Input
                        borderless
                        placeholder="Name"
                        onChangeText={text => {
                          this.setState({name: text})
                         }}
                        iconContent={
                          <Icon
                            size={16}
                            color={appTheme.COLORS.ICON}
                            name="person-outline"
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{marginBottom: 15}}>
                      <Input
                        borderless
                        placeholder="Email"
                        //email-address
                        keyboardType={'email-address'}
                        onChangeText={text => {
                          this.setState({email: text})
                         }}
                        autoCapitalize={'none'}
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
                    <Block width={width * 0.8} style={{marginBottom: 15}}>
                      <TouchableOpacity
                        style={{
                          width: '100%',
                          borderRadius: 6,
                          backgroundColor: 'transparent',
                        }}
                        onPress={() => {
                          this.showHideDatePicker();
                        }}>
                        <Input
                          borderless
                          placeholder="DOB"
                          value={this.state.dob}
                          editable={false}
                          iconContent={
                            <Icon
                              size={16}
                              color={appTheme.COLORS.ICON}
                              name="gift-outline"
                              style={styles.inputIcons}
                            />
                          }
                        />
                      </TouchableOpacity>
                    </Block>
                    <Block width={width * 0.8} style={{marginBottom: 15}}>
                      <Input
                        borderless
                        placeholder="Mobile"
                        keyboardType={'phone-pad'}
                        maxLength={10}
                        onChangeText={text => {
                         this.setState({phonenum: text})
                        }}
                        onBlur={() => {
                          this.checkPhoneNum()
                        }}
                        iconContent={
                          <Icon
                            size={16}
                            color={appTheme.COLORS.ICON}
                            name="call-outline"
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
                        onChangeText={text => {
                          this.setState({password: text})
                         }}
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

                    <Block middle style={{marginBottom: 15}}>
                      <Button color="primary" style={styles.createButton} onPress={this.onRegisterPressHandler}>
                        <Text bold size={14} color={appTheme.COLORS.WHITE}>
                          CREATE ACCOUNT
                        </Text>
                      </Button>
                    </Block>
                    <Block middle>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                          <Text>Already Registered!</Text>
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
  RegisterUserAction: RegisterUserAction
};


export default connect( mapStateToProps, mapDispatchToProps)(Register);
