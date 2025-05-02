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
import location from '../images/location.png';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import bottomBg from '../images/bottombg.png';

const data = [{label: 'Banasree', value: '1'}];

const Location = () => {
  const [value, setValue] = useState(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImages} source={numbBg}>
        <Image style={styles.locationIcon} source={location} />
      </ImageBackground>

      <Text style={styles.locationTxt}>Select Your Location</Text>
      <Text style={styles.descTxt}>
        Switch on your location to stay in tune with
      </Text>
      <Text style={styles.descTxt1}>what’s happening in your area</Text>

      <Text style={styles.zone}>Your Zone</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholderStyle={{color: 'black'}}
        placeholder="Select item"
        value={value}
        onChange={item => setValue(item.value)}
      />

      <Text style={styles.area}>Your Area</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Types of your area"
      />

      <ImageBackground style={styles.bgImagebottom} source={bottomBg}>
        <TouchableOpacity
          style={styles.btnBg}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btn}>Submit</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bgImages: {
    height: 340,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationIcon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  locationTxt: {
    fontFamily: 'Gilroy',
    fontWeight: 'bold',
    fontSize: 23,
    marginTop: 20,
    alignSelf: 'center',
    color: 'black',
  },
  descTxt: {
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  descTxt1: {
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 3,
    fontFamily: 'Gilroy-Medium',
  },
  zone: {
    fontFamily: 'Gilroy',
    marginTop: 90,
    fontWeight: 'bold',
    marginLeft: 18,
    color:'#7C7C7C'
  },
  dropdown: {
    height: 50,
    borderColor: '#E2E2E2',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 18,
    marginTop: 10,
  },
  area: {
    fontFamily: 'Gilroy',
    marginTop: 20,
    fontWeight: 'bold',
    marginLeft: 18,
    color:'#7C7C7C'
  },
  bgImagebottom: {
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBg: {
    backgroundColor: '#53B175',
    height: 67,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});
