import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import bg from '../images/Bg.png';
import googleIcon from '../images/google.png';
import facebook from '../images/facebook.png';
import {useNavigation} from '@react-navigation/native';

const EnterNumber = () => {
    const navigation = useNavigation();
  return (
    <View>
      <Image source={bg} />
      <Text style={styles.startTxt}>Get your groceries</Text>
      <Text style={styles.startTxt}>with nectar</Text>
      <TextInput
        style={styles.placeHolderTxt}
        placeholder="Enter Number here"
      />
      <Text style={styles.desc}>Or connect with social media</Text>
      <View style={styles.btns}>
        <TouchableOpacity style={styles.btnBg}  onPress={() => navigation.navigate('NumberTwo')}>
          <Image style={styles.icon} source={googleIcon} />
          <Text style={styles.btn}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBgs}  onPress={() => navigation.navigate('NumberTwo')}>
          <Image style={styles.icons} source={facebook} />
          <Text style={styles.btn}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnterNumber;

const styles = StyleSheet.create({
  startTxt: {
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 26,
    color: '#030303',
  },
  placeHolderTxt: {
    marginTop: 20,
    fontWeight: '500',
    fontSize: 26,
    marginLeft: 30,
    borderColor: '#E2E2E2',
    borderBottomWidth: 1,
    width: 350,
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Gilroy',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '700',
  },

  btns: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 25,
  },
  btnBg: {
    backgroundColor: '#5383EC',
    marginTop: 30,
    height: 60,
    width: 353,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginLeft: 40,
  },

  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
  },
  icons: {
    marginLeft: 20,
  },
  btnBgs: {
    backgroundColor: '#4A66AC',
    marginTop: 30,
    height: 60,
    width: 353,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
