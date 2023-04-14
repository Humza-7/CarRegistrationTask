import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CustomButton from './CustomButton';

import { useNavigation } from '@react-navigation/native';

const CustomCard = (props) => { //card component to show the details of the car

    const navigation = useNavigation()

    const onPressUpdate = () => {
        navigation.navigate('RegisterCar', {...props}) // on pressing the update passing the data to the register screen to show as intial values
    }

    return (
      <View style={styles.card}>
        <Text style={styles.label}>Registration Number: {props.registrationNumber}</Text>
        <Text style={styles.label}>Color: {props.color}</Text>
        <Text style={styles.label}>Model: {props.model}</Text>
        <Text style={styles.label}>Make: {props.make}</Text>
        <CustomButton
        text={'Update'}
        onPress={onPressUpdate}
        />
      </View>
    );
  };

export default CustomCard


const styles = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      margin: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    button: {
      backgroundColor: '#007AFF',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignSelf: 'flex-end',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  