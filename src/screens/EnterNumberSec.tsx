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
import bottomBg from '../images/bottombg.png';
import {useNavigation} from '@react-navigation/native';

const EnterNumberSec = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImage} source={numbBg}>
        <Text style={styles.enterNumb}>Enter your mobile number</Text>
      </ImageBackground>

      <Text style={styles.mobN}>Mobile Number</Text>
      <TextInput
        style={styles.placeHolderTxt}
        placeholder="Enter Number here"
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={() => navigation.navigate('OTP')}>
        <Image source={nextBtn} style={styles.nextBtn} />
      </TouchableOpacity>
      <ImageBackground style={styles.bgImagebottom} source={bottomBg} />
    </View>
  );
};

export default EnterNumberSec;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgImage: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  enterNumb: {
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 26,
    color: 'black',
  },
  mobN: {
    fontFamily: 'Gilroy',
    marginTop: 22,
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7C7C7C',
  },
  placeHolderTxt: {
    marginTop: 3,
    fontWeight: '500',
    fontSize: 20,
    marginLeft: 14,
    borderColor: '#E2E2E2',
    borderBottomWidth: 1,
    width: '90%',
    color: '#000',
  },
  nextBtn: {
    height: 67,
    width: 67,
    marginTop: 180,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  bgImagebottom: {
    height: 300,
    marginTop: 100,
    width: '100%',
    justifyContent: 'flex-end',
  },
});
