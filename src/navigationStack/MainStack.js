import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterCarForm from '../screens/RegisterCarScreen';
import CarRegistrationForm from '../screens/RegisterCarScreen';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: true}} name="RegisterCar" component={CarRegistrationForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
