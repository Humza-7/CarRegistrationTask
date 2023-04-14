import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Logo from '../../assets/images/Logo_1.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'native-base';
import messages from '../helpers/messages';



const SignInScreen = () => {

  const { control, handleSubmit, formState: { errors } } = useForm()

  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const toast = useToast()

  const loginSuccess = () => { //showing toast of successfull login and navigating to Home screen
    toast.show({
      description: messages.loginSuccessful
    })
    navigation.navigate('Home')
  }

  const onSignInPressed = async (data) => { // here data provide the data of custom input field, which can be accessable by the custom input name.
    const userString = await AsyncStorage.getItem('user')
    const user = JSON.parse(userString)
    if(user){ //Verifying the user is register in asyncStorage or not
      const userName = user.userName
      const password = user.password
      {data.Username === userName && data.Password === password ? //Checking the userName and password match to local storage or not.
       loginSuccess()
      : 
      toast.show({
        description: messages.invalid
      })
    }
    }else {
      toast.show({
        description: messages.noUser
      })
      return
    }
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          name={'Username'}
          control={control}
          rules={{ //providing the rules for the input validation.
            required: 'Username is required',
            minLength: { value: 3, message: 'Username should be of minimum 3 characters' },
            maxLength: { value: 24, message: 'Username should be of maximum 24 characters' }
          }}
          placeholder="Username"

        />
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

        <CustomButton text="Sign In" 
        onPress={handleSubmit(onSignInPressed)} //Here handleSubmit checking all the rules that are provided to the input field fulfilled or not, if not it through the error in the form error
        />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
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
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginBottom: 30,
  },
});

export default SignInScreen;
