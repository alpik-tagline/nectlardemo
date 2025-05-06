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
import {loginValidationSchema} from '../utils/validations';
import {register} from '../firebase/firebaseAuth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import bottombg from '../images/bottombg.png';
import Button from '../component/Button';
import numbBg from '../images/numberbg.png';
import carrotIcon from '../images/carrotRed.png';

const SignUp = () => {
  const navigation = useNavigation();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
      <ImageBackground style={styles.bgImages} source={numbBg}>
        <Image style={styles.iconG} source={carrotIcon} />
      </ImageBackground>
      <View style={styles.alltxts}>
        <Text style={styles.enterNumb}>Sign Up</Text>
        <Text style={styles.mobN}>Enter your emails and password</Text>
      </View>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginValidationSchema}
        onSubmit={handleRegister}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <>
            <Text style={styles.email}>Email</Text>
            <TextInput
              style={styles.placeHolderTxt}
              placeholder="Enter email here"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text style={styles.email}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="****"
                secureTextEntry={!passwordVisible}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.iconWrapper}>
                <Icon
                  name={passwordVisible ? 'visibility' : 'visibility-off'}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Text style={styles.forgotpass}>Forgot Password?</Text>
            <Button title="Sign up" onPress={handleSubmit} />
          </>
        )}
      </Formik>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.txt}>
          Don't have an account? <Text style={styles.stxt}>Signup</Text>
        </Text>
      </TouchableOpacity>
      <Image source={bottombg} style={styles.bbg} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
    marginHorizontal: 10,
    marginTop: 3,
    paddingBottom: 5,
    width: 350,
  },
  forgotpass: {
    marginLeft: 250,
    marginTop: 10,
    fontFamily: 'Gilroy-Medium',
  },
  alltxts: {
    marginLeft: 15,
  },
  iconWrapper: {paddingLeft: 10},
  bgImages: {
    height: 250,
    alignItems: 'center',
    paddingTop: 100,
    marginBottom: 35,
  },
  iconG: {height: 60, width: 50, marginBottom: 20},
  enterNumb: {
    fontWeight: '500',
    marginTop: 10,
    marginRight: 290,
    fontSize: 26,
    color: '#030303',
  },
  mobN: {
    fontFamily: 'Gilroy-Medium',
    marginTop: 10,
    fontSize: 13,
    color: '#606060',
    marginRight: 180,
  },
  email: {
    fontFamily: 'Gilroy',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 20,
    color: '#7C7C7C',
  },
  placeHolderTxt: {
    marginTop: 3,
    marginRight: 30,
    fontWeight: '400',
    fontSize: 15,
    borderColor: '#E2E2E2',
    borderBottomWidth: 1,
    width: 350,
    alignSelf: 'center',
    paddingBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
    width: 350,
    marginLeft: 6,
  },
  errorText: {color: 'red', fontSize: 12, marginLeft: 20, marginTop: 5},
  btnBg: {
    backgroundColor: '#53B175',
    marginTop: 30,
    height: 67,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  btn: {fontSize: 18, color: 'white', fontWeight: '600'},
  txt: {
    alignSelf: 'center',
    marginTop: 15,
    fontFamily: 'Gilroy',
    fontWeight: 'bold',
    color: 'black',
  },
  stxt: {color: '#53B175'},
  bbg: {height: 200},
});
