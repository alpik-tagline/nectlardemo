import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import numbBg from '../images/numberbg.png';
import carrotIcon from '../images/carrotRed.png';
import {register} from '../firebase/firebaseAuth';
import bottombg from '../images/bottombg.png';

const Signup = () => {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleRegister = async values => {
    try {
      await register(values.email, values.password);
      navigation.navigate('Login');
    } catch (error) {
      console.log('Registration failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.newSign}>
        <ImageBackground style={styles.bgImages} source={numbBg}>
          <Image style={styles.iconG} source={carrotIcon} />
        </ImageBackground>
        <View style={styles.alltxts}>
          <Text style={styles.enterNumb}>Sign Up</Text>
          <Text style={styles.mobN}>Enter your credentials to continue</Text>
        </View>

        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={handleRegister}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Text style={styles.email}>Email</Text>
              <TextInput
                style={styles.placeHolderTxt}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Enter Email here"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <Text style={styles.email}>Password</Text>
              <TextInput
                style={styles.placeHolderTxt}
                placeholder="****"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <Text style={styles.fpassword}>
                By continuing you agree to our
                <Text style={styles.tt}> Terms of Service </Text>
              </Text>
              <Text style={styles.fpasswordd}>
                and <Text style={styles.pp}>Privacy Policy.</Text>Privacy
                Policy.
              </Text>

              <TouchableOpacity style={styles.btnBg} onPress={handleSubmit}>
                <Text style={styles.btn}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.txt}>
                  Already have an account?
                  <Text style={styles.ltxt}> Log In</Text>
                </Text>
              </TouchableOpacity>
              <Image source={bottombg} style={styles.bbg} />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bbg: {
    height: 200,
  },
  newSign: {
    marginLeft: 10,
  },
  ltxt: {
    color: '#53B175',
  },
  pp: {
    color: '#53B175',
  },
  bgImages: {
    height: 250,
    width: '100%',
  },
  tt: {
    color: '#53B175',
  },
  iconG: {
    height: 60,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 90,
  },
  enterNumb: {
    fontFamily: 'Gilroy',
    fontWeight: '700',
    fontSize: 26,
    color: '#030303',
    marginTop: 30,
  },
  mobN: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: '#555',
    marginTop: 8,
  },
  email: {
    fontFamily: 'Gilroy',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 12,
    color: '#7C7C7C',
  },
  placeHolderTxt: {
    marginTop: 3,
    fontWeight: '400',
    fontSize: 15,
    marginRight: 20,
    borderColor: '#E2E2E2',
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
  },
  fpassword: {
    marginLeft: 16,
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    marginTop: 14,
    color: '#333',
  },
  fpasswordd: {
    marginLeft: 15,
    marginTop: 5,
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: '#333',
  },
  btnBg: {
    backgroundColor: '#53B175',
    marginTop: 30,
    height: 67,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    color: 'grey',
  },
  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  txt: {
    alignSelf: 'center',
    marginTop: 15,
    fontFamily: 'Gilroy',
    fontWeight: 'bold',
    color: 'black',
  },
  alltxts: {
    marginLeft: 10,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginLeft: 12,
  },
});
