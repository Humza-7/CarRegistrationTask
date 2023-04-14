import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import { useNavigation } from '@react-navigation/core';
import { useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {

  const email_REGAX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; //Email validation
  const { control, handleSubmit, watch } = useForm()
  const pwd = watch('Password') // here watch check either the confirm password actual match to the user password

  const navigation = useNavigation();

  const onRegisterPressed = (data) => { // here data provide the data of custom input field, which can be accessable by the custom input name.
    const user = {
      userName: data.Username,
      email: data.Email,
      password: data.Password
    }
    AsyncStorage.setItem('user', JSON.stringify(user)) // Storing or registering the user into the local storage
    Alert.alert( //Alert of successful registering
      'SuccessFull',
      'You Register Successfully',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => navigation.navigate('SignIn') }
      ],
      { cancelable: false }
    );
    
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');

  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name={'Username'}
          control={control}
          rules={{
            required: 'Username is required',
            minLength: { value: 3, message: 'Username should be of minimum 3 characters' },
            maxLength: { value: 24, message: 'Username should be of maximum 24 characters' }
          }}
          placeholder="Username"

        />
        <CustomInput
          name={'Email'}
          control={control}
          rules={{
            required: 'Email is requiured',
            pattern: { value: email_REGAX, message: 'Email is invalid' }
          }}
          placeholder="Email" />
        <CustomInput
          name={'Password'}
          control={control}
          rules={{
            required: 'Username is required',
            minLength: { value: 8, message: 'Password should be of minimum 8 characters' },
          }}
          placeholder="Password"
          secureTextEntry
        />
        <CustomInput
          name={'Repeat Password'}
          control={control}
          rules={{ validate: value => value === pwd || 'Password do not match' }}
          placeholder="Repeat Password"
          secureTextEntry
        />

        <CustomButton text="Register" onPress={handleSubmit(onRegisterPressed)} />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;
