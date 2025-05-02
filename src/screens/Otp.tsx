import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import numbBg from '../images/numberbg.png';
import React from 'react';
import nextBtn from '../images/next.png';
import {useNavigation} from '@react-navigation/native';
import bottomBg from '../images/bottombg.png';

const Otp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImages} source={numbBg}>
        <Text style={styles.enterNumb}>Enter your 4-digit code</Text>
      </ImageBackground>

      <Text style={styles.code}>Code</Text>
      <TextInput
        style={styles.placeHolderTxt}
        placeholder="- - - -"
        keyboardType="numeric"
      />

      <View style={styles.btns}>
        <Text style={styles.resendTxt}>Resend Code</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Location')}>
          <Image source={nextBtn} style={styles.nextbtn} />
        </TouchableOpacity>
      </View>
      <ImageBackground style={styles.bgImagebottom} source={bottomBg} />
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgImages: {
    height: 170,
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  enterNumb: {
    fontFamily: 'Gilroy',
    marginLeft: 20,
    fontWeight: '700',
    fontSize: 26,
    color: '#181725',
  },
  code: {
    fontFamily: 'Gilroy',
    marginTop: 22,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: '100',
    color: '#000',
  },
  placeHolderTxt: {
    marginTop: 3,
    fontWeight: '500',
    fontSize: 20,
    marginLeft: 16,
    borderColor: '#E2E2E2',
    borderBottomWidth: 1,
    width: '90%',
    color: '#000',
  },
  resendTxt: {
    color: '#53B175',
    fontSize: 18,
    marginTop: 1,
    paddingLeft: 10,
  },
  nextbtn: {
    height: 67,
    width: 67,
  },
  btns: {
    marginTop: 190,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  bgImagebottom: {
    height: 300,
    marginTop: 100,
    width: '100%',
    justifyContent: 'flex-end',
  },
});
