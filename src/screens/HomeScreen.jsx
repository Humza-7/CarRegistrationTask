import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CustomCard from '../components/CustomCard';
import CustomButton from '../components/CustomButton';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'


const HomeScreen = () => {

  const registerCars = useSelector((state) => state.registerCars.registerCars) // fetching the register cars detail dummy data from the store
  const renderItem = ({ item }) => <CustomCard {...item}/>; // creating the renderer for the flatlist
  const navigation = useNavigation();

  const OnPressRegisterCar = () => {
    navigation.navigate('RegisterCar')
  }


  return (
    <View style = {styles.root}>
    <CustomButton 
    text={'Register a New Car'}
    onPress={OnPressRegisterCar}
    />
    <FlatList data={registerCars} renderItem={renderItem} keyExtractor={item => item.id} />
    </ View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    padding: 10,
    height: '100%'
  },
})
