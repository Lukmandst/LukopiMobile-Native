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
import ProfilePage from './screens/home/profilePage';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialComIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductDetails from './screens/home/productDetails';
import Cart from './screens/home/cart';
import PaymentPage from './screens/home/paymentPage';
import DeliveryPage from './screens/home/deliveryPage';
import SeeMorePage from './screens/home/seeMorePage';
import MyDrawer from './components/drawer';
import EditprofilePage from './screens/home/editprofilePage';
import HistoryPage from './screens/home/historyPage';
import PrivacyPage from './screens/home/privacyPage';
import SecurityPage from './screens/home/securityPage';
import EditPassPage from './screens/home/editPassPage';

const DrawerRouter = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#6A4029',
        drawerInactiveTintColor: '#6A4029',
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Poppins-SemiBold',
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
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPage}
        options={{
          drawerIcon: ({color}) => (
            <MaterialComIcons
              name="sticker-text-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Security"
        component={SecurityPage}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="security" size={22} color={color} />
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
    <Navigator
      initialRouteName={!token ? 'welcome' : 'HomeScreen'}
      screenOptions={{statusBarTranslucent: false, headerShown: false}}>
      <Screen name="welcome" component={Welcome} />
      <Screen
        options={{statusBarTranslucent: true}}
        name="signin"
        component={Signin}
      />
      <Screen
        options={{statusBarTranslucent: true}}
        name="signup"
        component={Signup}
      />
      <Screen
        options={{statusBarTranslucent: true}}
        name="forgot"
        component={Forgot}
      />
      <Screen
        options={{statusBarTranslucent: true}}
        name="reset"
        component={Reset}
      />
      <Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={DrawerRouter}
      />
      <Screen options={{headerShown: false}} name="auth" component={Auth} />
      <Screen name="details" component={ProductDetails} />
      <Screen name="cart" component={Cart} />
      <Screen name="checkout" component={DeliveryPage} />
      <Screen name="payment" component={PaymentPage} />
      <Screen
        name="seeMore"
        component={SeeMorePage}
        options={({route}) => ({
          title: route.params?.title,
          headerShown: false,
        })}
      />
      <Screen name="editProfile" component={EditprofilePage} />
      <Screen name="editPass" component={EditPassPage} />
      <Screen name="history" component={HistoryPage} />
    </Navigator>
  );
};

export default Router;
