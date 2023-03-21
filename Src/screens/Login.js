import {Formik} from 'formik';
import * as Yup from 'yup';
import React, {useEffect, useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  View,
  Image,
  ImageBackground,
  Linking,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import Header from '../components/Header';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import ErrorMessage from '../components/ErrorMessage';
import TouchableText from '../components/TouchableText';
import {useToast} from 'react-native-toast-notifications';
import {validatePathConfig} from '@react-navigation/native';
import GoogleButton from '../components/GoogleButton';
import Heading from '../components/Heading';
import Loading from '../components/Loading';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(5).label('Password'),
});

function Login({navigation}) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({email, password}) => {
    setLoading(true);
    const isUserCreated = await auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        setLoading(false);
        console.log(res);
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error.message);
        toast.show('Account not found', {
          type: 'danger',
          dangerColor: '#FDF2F2',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          className: '',
          animationType: 'slide-in',
          dangerIcon: (
            <Image
              source={require('../assets/images/danger.png')}
              className="h-[16] w-[16]"
            />
          ),
        });
      });
    console.log('is user updated', isUserCreated);
  };
  const signIn = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    GoogleSignin.signOut();
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    setLoading(true);
    const res = await auth().signInWithCredential(googleCredential);
    console.log(res);
    setLoading(false);
  };
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <Header isHeader={true} onPress={() => navigation.goBack()} />
        <Heading className="mt-20" text={'Log In.'} />
        <Loading isVisible={loading} loading={loading} />
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({
            handleChange,
            setFieldValue,
            handleSubmit,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <View
                className={
                  Platform.OS === 'android' ? 'mt-9 flex-1 ' : 'mt:11 flex-1 '
                }>
                <Input
                  placeholder={'Email ID'}
                  onChangeText={value => {
                    value = value.toLowerCase();
                    console.log(value);
                    setFieldValue('email', value.toLowerCase());
                  }}
                  onBlur={() => setFieldTouched('email')}
                />
                <ErrorMessage error={errors.email} visible={touched.email} />
                <Input
                  placeholder={'Password'}
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                />
                <ErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
              </View>
              {/* <ImageBackground
                style={{
                  height: height / 2.3,
                  width: wd,
                  marginTop: height * 0.06,
                }}
                source={require('../assets/images/login.png')}
                className="item-center justify-center"> */}
              <View className="flex-col flex-1 justify-center items-center">
                <PrimaryButton
                  loading={loading}
                  text={'Log in'}
                  className="mt-20 bg-offWhite self-center h-[50] w-[315] bg-secondary rounded-lg items-center justify-center "
                  onPress={handleSubmit}
                />
                <GoogleButton
                  text={'Sign in with Google'}
                  className="self-center flex-row h-[50] w-[315] bg-white rounded-lg border-2 border-secondary items-center justify-evenly mt-9"
                  onPress={signIn}
                />
                <TouchableText
                  text={'Forgot Password?'}
                  onPress={() =>
                    Linking.openURL('https://uxdx.com/forgotpassword/')
                  }
                />
              </View>

              {/* </ImageBackground> */}
            </>
          )}
        </Formik>
      </ScrollView>
      <Image
        source={require('../assets/images/login.png')}
        style={{
          height: Theme.hp(50),
          width: '100%',
          //marginTop: -Theme.dh * 0.05,
          bottom: 0,
          position: 'absolute',
          zIndex: -1,
        }}
        resizeMode={'stretch'}
      />
    </KeyboardAvoidingView>
  );
}

export default Login;
