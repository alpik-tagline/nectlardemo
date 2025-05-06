import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {store} from './src/app/store';
import GetStarted from './src/screens/GetStarted';
import EnterNumber from './src/screens/EnterNumber';
import EnterNumberSec from './src/screens/EnterNumberSec';
import Otp from './src/screens/Otp';
import Location from './src/screens/Location';
import Login from './src/screens/Login';
import Signup from './src/screens/SignUp';
import BottomTabNav from './src/BottomTab/BottomTabNav';
import OrderAccept from './src/screens/OrderAccept';
import MyOrder from './src/screens/MyOrder';
import ProductDetails from './src/screens/ProductDetails';
import Favourite from './src/screens/Favourite';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Allinone from './src/screens/Allinone';
import Explore from './src/screens/Explore';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {user ? (
              <>
                <Stack.Screen name="MainTabs" component={BottomTabNav} />
                <Stack.Screen name="OrderCon" component={OrderAccept} />
                <Stack.Screen name="Myorder" component={MyOrder} />
                <Stack.Screen
                  name="ProductDetails"
                  component={ProductDetails}
                />
                <Stack.Screen name="Favourite" component={Favourite} />
                <Stack.Screen name="Allinone" component={Allinone} />
                <Stack.Screen name="Explore" component={Explore} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
