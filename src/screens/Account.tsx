import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import profilep from '../images/profilep.png';
import auth from '@react-native-firebase/auth';
import line from '../images/accLine.png';
import Orderss from '../images/Orderss.png';
import details from '../images/cardd.png';
import address from '../images/addressD.png';
import newcard from '../images/newcard.png';
import promo from '../images/promo.png';
import bell from '../images/bell.png';
import help from '../images/helpp.png';
import about from '../images/aboutt.png';
import logout from '../images/logout.png';
import {useNavigation} from '@react-navigation/native';

const Account = () => {
  const user = auth().currentUser;
  const navigation = useNavigation();

  const logoutt = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={profilep} />
        <View style={styles.uDetails}>
          <Text style={styles.uName}>User name</Text>
          <Text style={styles.pEmail}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.allOptions}>
        <Image source={line} style={styles.accLine} />
        <TouchableOpacity onPress={() => navigation.navigate('Myorder')}>
          <View style={styles.all}>
            <Image source={Orderss} />
            <Text style={styles.allTxt}>Orders</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.allOptions}>
        <Image source={line} style={styles.accLine} />
        <View style={styles.all}>
          <Image source={details} />
          <Text style={styles.allTxt}>My Details</Text>
        </View>
      </View>
      <View style={styles.allOptions}>
        <Image source={line} style={styles.accLine} />
        <View style={styles.all}>
          <Image source={address} />
          <Text style={styles.allTxt}>Delivery Address</Text>
        </View>
      </View>
      <View style={styles.allOptions}>
        <Image source={line} style={styles.accLine} />
        <View style={styles.all}>
          <Image source={newcard} />
          <Text style={styles.allTxt}>Payment Methods</Text>
        </View>
      </View>
      <View style={styles.allOptions}>
        <Image source={line} style={styles.accLine} />
        <View style={styles.all}>
          <Image source={promo} />
          <Text style={styles.allTxt}>Promo Card</Text>
        </View>
      </View>
      <View style={styles.allOptions}>
        <Image source={line} style={styles.accLine} />
        <View style={styles.all}>
          <Image source={bell} />
          <Text style={styles.allTxt}>Notifications</Text>
        </View>
      </View>
      <View style={styles.allOptions}>
        <Image source={line} style={styles.accLine} />
        <View style={styles.all}>
          <Image source={help} />
          <Text style={styles.allTxt}>Help</Text>
        </View>
      </View>
      <View style={styles.allOptions}>
        <Image source={line} style={styles.accLine} />
        <View style={styles.all}>
          <Image source={about} />
          <Text style={styles.allTxt}>About</Text>
        </View>
        <Image source={line} style={styles.accLine} />
      </View>
      <TouchableOpacity style={styles.btnBg} onPress={logoutt}>
        <Image source={logout} style={styles.logoutImg} />
        <Text style={styles.btn}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profile: {
    marginTop: 50,
    marginLeft: 30,
    flexDirection: 'row',
  },
  uDetails: {
    marginTop: 10,
  },
  pEmail: {
    marginTop: 1,
    marginLeft: 15,
  },
  uName: {
    marginLeft: 15,
  },
  accLine: {
    marginTop: 20,
    height: 3,
  },
  allOptions: {},
  all: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 20,
  },
  allTxt: {
    marginLeft: 20,
    fontFamily: 'Gilroy',
    fontWeight: '700',
    height: 23,
  },
  btnBg: {
    flexDirection: 'row',
    backgroundColor: '#F2F3F2',
    marginTop: 160,
    height: 67,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  btn: {
    fontSize: 18,
    color: '#53B175',
    fontWeight: '600',
  },
  logoutImg: {
    position: 'absolute',
    marginRight: 290,
  },
});
