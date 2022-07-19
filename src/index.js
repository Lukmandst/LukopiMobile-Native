import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './screens/home';
import Welcome from './screens/welcome';
import Auth from './screens/auth';
import Signin from './screens/auth/signin';
import Signup from './screens/auth/signup';
import Forgot from './screens/auth/forgot';
import Reset from './screens/auth/reset';
import MyDrawer from './screens/drawer';
import ProfilePage from './screens/home/profilePage';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductDetails from './screens/home/productDetails';
import Cart from './screens/home/cart';
import PaymentPage from './screens/home/paymentPage';
import DeliveryPage from './screens/home/deliveryPage';

const DrawerRouter = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        // headerShown: false,
        drawerActiveBackgroundColor: '#6A4029',
        drawerInactiveTintColor: '#6A4029',
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Poppins-Medium',
          fontSize: 15,
        },
      }}
      useLegacyImplementation={true}
      drawerContent={props => <MyDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="fastfood" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="person-pin" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={Cart}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="shopping-cart" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const Router = () => {
  const {Navigator, Screen} = createNativeStackNavigator();
  const {token} = useSelector(state => state.auth);
  return (
    <Navigator initialRouteName={!token ? 'welcome' : 'HomeScreen'}>
      <Screen
        options={{headerShown: false}}
        name="welcome"
        component={Welcome}
      />
      <Screen options={{headerShown: false}} name="signin" component={Signin} />
      <Screen options={{headerShown: false}} name="signup" component={Signup} />
      <Screen options={{headerShown: false}} name="forgot" component={Forgot} />
      <Screen options={{headerShown: false}} name="reset" component={Reset} />
      <Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={DrawerRouter}
      />
      <Screen options={{headerShown: false}} name="auth" component={Auth} />
      <Screen
        options={{headerShown: true}}
        name="details"
        component={ProductDetails}
      />
      <Screen options={{headerShown: true}} name="cart" component={Cart} />
      <Screen
        options={{headerShown: true}}
        name="checkout"
        component={DeliveryPage}
      />
      <Screen
        options={{headerShown: true}}
        name="payment"
        component={PaymentPage}
      />
    </Navigator>
  );
};

export default Router;
