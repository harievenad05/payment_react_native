import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, ScrollView, FlatList, Alert, Keyboard} from 'react-native';
import {Block, Text} from 'galio-framework';
import RazorpayCheckout from 'react-native-razorpay';
import {Button, Icon, Input} from '../../components';
import {Images, appTheme} from '../../common/constants';
import styles from './styles';
import { connect } from 'react-redux';
import {initPaymentAction, initPaymentSuccessAction, initTransactionAction} from './action'
import { RazorpayApiKey } from '../../../config';
import Loader from '../../components/Loader';

const {width, height} = Dimensions.get('screen');
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state={
      amount: '',
      transferHistory: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    let details = {}
    this.setState({isLoading: true})
    this.props.initTransactionAction({
      details,
      onSuccess: (data) => {
        console.log('dataaa', data)
        this.setState({transferHistory: data.data, isLoading: false})
      },
      onError: (err) => {
        this.setState({isLoading: false})
      }
    })
  }

  getOrderComponent = ({item}) => {
    console.log('itemmmsss', item);
    const {LoginReducer} = this.props;
    let namee = LoginReducer.details ? LoginReducer.details.user_name : 'John Doe';
    if(item){
      return (
        <Block style={{marginBottom: 20}}>
          <Block row>
            <Text color="#32325D" style={{fontSize: 18}}>Order Id: </Text>
            <Text color="#32325D" style={{fontSize: 18}}>{item.razorpayDetails.orderId}</Text>
          </Block>
          <Block row style={{marginTop: 3}}>
            <Text color="#32325D" style={{fontSize: 18}}>Order By: </Text>
            <Text color="#32325D" style={{fontSize: 18}}>{namee}</Text>
          </Block>
        </Block>
      );
    }
  };
  handlePayment = () => {
    Keyboard.dismiss()
      if(this.state.amount !== ''){
        if(this.isValidNum(this.state.amount)){
          // console.log('amountsucceeds', this.state.amount)
          let amt = `${this.state.amount}00`
          let details = {
            amount: parseInt(amt),
            currency: 'INR'
          }
          setTimeout(() => {
            this.props.initPaymentAction({
              details,
              onSuccess: (data) => this.proceedPaymentSuccess(data),
              onError: (error) => console.log(error)
            })
          }, 1000)
        }
      } else {
        Alert.alert('Transaction Error', 'Please enter valid amount');
      }
  }
  proceedPaymentSuccess = (data) => {
    const {LoginReducer} = this.props;
    if(data.status === 200){
      // console.log('assgasgsahasghsaghas', data)
      let order_id = data.data.id
      let emailid = LoginReducer.details ? LoginReducer.details.email : 'useremail@example.com'
      let contactnum = LoginReducer.details ? LoginReducer.details.phone_no : '9191919191'
      let namee = LoginReducer.details ? LoginReducer.details.user_name : 'John Doe';
      let user_id = LoginReducer.details ? LoginReducer.details.user_id : '';
      var options = {
        order_id: order_id,
        key: RazorpayApiKey,
        prefill: {
          email: emailid,
          contact: contactnum,
          name: namee,
        },
        theme: { color: '#a29bfe' },
      };
      RazorpayCheckout.open(options)
      .then(async (response) => {
        console.log('treasactionnnn', response)
        let details = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          userId: user_id
        }
        this.props.initPaymentSuccessAction({
          details,
          onSuccess: (data) => this.onSuccessPlaceTransaction(data),
          onError: (err) => console.log(err)
        })
      })
      .catch(console.log);
    } else  {
      Alert.alert('Transaction Error', 'UnAuthorized Transaction');
    }
  }

  onSuccessPlaceTransaction = (data) => {
    console.log('Successfultrasaction', data)
    this.setState({amount: ''})
  }

  isValidNum = (val) => {
    let isnum = /^\d+$/.test(val);
    if(isnum){
      return true
    } else {
      return false
    }
  }
  render() {
    const {amount, isLoading, transferHistory} = this.state;
    console.log('aammmmmount', amount)

    return (
      <View style={{flex: 1}}>
        <Loader loading={isLoading} />
        <Block height={height} style={{alignItems: 'center'}}>
          <Block width={width * 0.8}>
            <Block height={height / 6} style={{marginTop: 45}}>
              <Block row style={{marginBottom: 10}}>
                <Block middle>
                  <Text style={{fontSize: 18, color: 'black'}}>INR:  </Text>
                </Block>
                <Input
                  borderless
                  placeholder="Amount"
                  value={this.state.amount}
                  keyboardType={'decimal-pad'}
                  onChangeText={(text) => {
                    this.setState({amount: text});
                  }}
                  iconContent={
                    <Icon
                      size={18}
                      color={appTheme.COLORS.ICON}
                      name="cash-outline"
                      style={styles.inputIcons}
                    />
                  }
                />
              </Block>
              <Block style={{marginStart: -8}}>
              <Button onPress={this.handlePayment}>
                <Text color={'#ffff'}>Pay</Text>
              </Button>
              </Block>
            </Block>
            <Block style={{marginBottom: 20}}>
              <Text bold size={20} style={{marginTop: 15}}>
                Order Details:
              </Text>
            </Block>
            <FlatList
              data={transferHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item) => this.getOrderComponent(item)}
            />
          </Block>
        </Block>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  LoginReducer: state.LoginReducer,
});

const mapDispatchToProps = {
  initPaymentAction: initPaymentAction,
  initPaymentSuccessAction: initPaymentSuccessAction,
  initTransactionAction: initTransactionAction
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
