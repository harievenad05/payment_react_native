import React, {Component} from 'react';
import {Easing, Animated, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import CustomDrawerContent from './Menu';

import {Icon, Header} from '../components';

import SplashScreen from '../pages/AuthScreen';
import Login from '../pages/Login';
import Register from '../pages/Register';

const {width} = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({navigation, scene}) => (
            <Header
              transparent
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: {backgroundColor: '#FFFFFF'},
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="OnboardingStack"
        component={OnboardingStack}
        options={({route, navigation}) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={SplashScreen}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AuthStack} />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({navigation, scene}) => (
            <Header title="Home" navigation={navigation} scene={scene} />
          ),
          cardStyle: {backgroundColor: '#F8F9FE'},
        }}
      />
    </Stack.Navigator>
  );
}

const AuthStack = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={({route, navigation}) => ({
          headerShown: false,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={({route, navigation}) => ({
          headerShown: false,
          headerBackTitleVisible: false,
        })}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={({route, navigation}) => ({
          headerShown: false,
          headerBackTitleVisible: false,
        })}
      />

      <Stack.Screen
        name="AppTabNav"
        component={AppStack}
        options={({route, navigation}) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{flex: 1}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: 'white',
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: 'white',
        inactiveTintColor: '#000',
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Profile" component={ProfileStack} />
    </Drawer.Navigator>
  );
}

class AuthNavigator extends Component {
  state = {
    isLoggedIn: false,
  };

  async componentDidMount() {}

  componentDidUpdate(prevProps) {
    const {LoginReducer} = this.props;
    if (LoginReducer.userToken !== prevProps.LoginReducer.userToken) {
      if (LoginReducer.userToken !== '') {
        this.setState({isLoggedIn: true});
      } else {
        this.setState({isLoggedIn: false});
      }
    }
  }

  render() {
    console.log(this.props, 'popspropsprops');
    return (
      <Stack.Navigator>
        {this.state.isLoggedIn ? (
          <>
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={({route, navigation}) => ({
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="AppTabNav"
              component={AppStack}
              options={({route, navigation}) => ({
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="AuthScreen"
              component={OnboardingStack}
              options={({route, navigation}) => ({
                headerShown: false,
              })}
            />
          </>
        ) : (
          <Stack.Screen
            name="AuthStackNav"
            component={AuthStack}
            options={({route, navigation}) => ({
              headerShown: false,
            })}
          />
        )}
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
  LoginReducer: state.LoginReducer,
});

export default connect(mapStateToProps)(AuthNavigator);
