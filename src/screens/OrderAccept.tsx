import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import numbBg from '../images/numberbg.png';
import bottomBg from '../images/bottombg.png';
import confirm from '../images/confirm.png';
import {useNavigation} from '@react-navigation/native';

const OrderAccept = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ImageBackground style={styles.bgImage} source={numbBg}>
        <Image style={styles.confirmImage} source={confirm} />
        <View style={styles.allTxts}>
          <Text style={styles.orderTxt}>Your Order has been</Text>
          <Text style={styles.accepted}>accepted</Text>
        </View>
        <Text style={styles.descTxtone}>
          Your items has been placed and is on
        </Text>
        <Text style={styles.descTxtwo}>it's way to being processed</Text>
        <View style={styles.bottomContainer}>
          <Image source={bottomBg} style={styles.bottom} />
          <TouchableOpacity style={styles.btnBg}>
            <Text
              style={styles.btn}
              onPress={() => navigation.navigate('MainTabs')}>
              Track Order
            </Text>
          </TouchableOpacity>
          <Text style={styles.backtohome}>Back to Home</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OrderAccept;

const styles = StyleSheet.create({
  bgImage: {
    height: 800,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmImage: {
    marginRight: 40,
    width: 270,
    height: 250,
  },
  orderTxt: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Gilroy',
  },
  accepted: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Gilroy',
  },
  allTxts: {
    marginTop: 60,
  },
  descTxtone: {
    marginTop: 20,
    color: '#7C7C7C',
    fontFamily: 'Gilroy-Medium',
    fontWeight: '400',
    fontSize: 18,
  },
  descTxtwo: {
    color: '#7C7C7C',
    fontFamily: 'Gilroy-Medium',
    fontWeight: '400',
    fontSize: 18,
  },
  bottomContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 780,
  },
  bottom: {
    width: 800,
    height: 200,
  },
  backtohome: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: '700',
    color: '#181725',
    fontFamily: 'Gilroy',
    marginTop: 40,
  },
  btnBg: {
    backgroundColor: '#53B175',
    position: 'absolute',
    height: 67,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    marginBottom: 90,
  },
  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});
