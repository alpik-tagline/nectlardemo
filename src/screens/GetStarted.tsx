import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import appStrings from '@utils/appStrings';
import React from 'react';
import bgImage from '../images/getStarted.png';
import carrotIcon from '../images/iconG.png';
import {useNavigation} from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ImageBackground style={styles.bgImages} source={bgImage} />
      <Image style={styles.iconG} source={carrotIcon} />
      <Text style={styles.welcmTxt}>Welcome</Text>
      <Text style={styles.welcmTxt2}>to our store</Text>
      <Text style={styles.descTxt}>
        Ger your groceries in as fast as one hour
      </Text>
      <TouchableOpacity style={styles.btnBg}>
        <Text
          style={styles.btn}
          onPress={() => navigation.navigate('NumberOne')}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  bgImages: {
    flex: 1,
    height: 900,
  },
  iconG: {
    marginTop: 485,
    alignSelf: 'center',
  },
  welcmTxt: {
    fontSize: 45,
    color: 'white',
    marginLeft: 120,
    fontFamily: 'Gilroy',
    fontWeight: '600',
  },
  welcmTxt2: {
    fontSize: 45,
    color: 'white',
    marginLeft: 100,
    fontFamily: 'Gilroy',
    fontWeight: '600',
  },
  descTxt: {
    color: '#FCFCFCB2',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
  },

  btnBg: {
    backgroundColor: '#53B175',
    marginTop: 30,
    height: 67,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});
