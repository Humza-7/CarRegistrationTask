import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'


import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import SelectDropdown from 'react-native-select-dropdown'
import { v4 as uuidv4 } from 'uuid';
import {carMakesData, carModelsData} from '../helpers/dummyData'
import { registerNewCar, updateRegisterCarDetail } from '../features/carRegistration/carRegistrationSlice'
import messages from '../helpers/messages'

//Using this screen for both update the register car details and to register a new car

const RegisterCarScreen = (props) => {

    const carData = props.route.params // here cardata that is fetched from the props coming from the Home screen when the user select to update a register car detail. On the behalf of this carData all the logics are handle for update and register
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const toast = useToast()
    const { control, handleSubmit, formState: { errors } } = useForm()
    const [maker, SetMaker] = useState(carData ? carData.make : null) //if the user coming from the update button setting the intial values of the field or dropdown.
    const [model, SetModel] = useState(carData ? carData.model : null) //if the user coming from the update button setting the intial values of the field or dropdown.
    const [makerError, setMakerError] = useState(null)
    const [modelError, setModelError] = useState(null)
    const carMakes = carMakesData // dummy data
    const carModels = carModelsData // dummy Data

    const handleMakerSelect = (value) => { //setting the selected value of the car maker when the user select maker from the drop down.
        SetMaker(value)
        setMakerError(null)
    }

    const handleModelSelect = (value) => { //setting the selected value of the car model when the user select model from the drop down.
        SetModel(value)
        setModelError(null)
    }
    
    const onPressHandler = (data) => {
        if(!maker || !model){ // validating the model and maker drop dowm fields
            !maker ? setMakerError('Select the makers of the car') : setModelError('Select the model of the car')
        }
        if(carData){ // carData only exist when the user try to update the details of the registered car as it is passed from the home screen
            const updatedCarData = {
                id: carData.id, 
                registrationNumber: data.RegistrationNumber ? data.RegistrationNumber : carData.registrationNumber, 
                color: data.Color ? data.Color : carData.color, 
                model: model, 
                make: maker
            }
            dispatch(updateRegisterCarDetail(updatedCarData)) //action to update the details of the registered car
            toast.show({
                description: messages.updateSuccess
            })
            navigation.navigate('Home')

        } else {
            const newCarData = {
                id: Math.floor(Math.random() * 100000) + '-' + Date.now(),  // here generating the unique id for the object so on this behalf we can update the details 
                registrationNumber: data.RegistrationNumber, 
                color: data.Color, 
                model: model, 
                make: maker
            }
            dispatch(registerNewCar(newCarData)) //action to register the details of the new car
            toast.show({
                description: messages.registerSuccess
            })
            navigation.navigate('Home')
        }

    }

  return (
    <View style= {styles.root}>
      <SelectDropdown
        data={carMakes}
        onSelect={(index) => handleMakerSelect(index)}
        buttonTextAfterSelection={(selectedItem, index) => selectedItem}
        rowTextForSelection={(item, index) => item}
        buttonStyle={[styles.button, { borderColor: makerError ? 'red' : '#e8e8e8' }]} // changing the boder color according to the error
        buttonTextStyle={styles.buttonText}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.row}
        rowTextStyle={styles.rowText}
        defaultButtonText={carData ? carData.make :'Select the Maker of car'}
      />
      {makerError && <Text //show the error message if user not select the value from the dropdown
      style={styles.errorMessage}>{makerError} 
      </Text>} 
      {maker &&
      <>
       <SelectDropdown
        data={carModels[maker]}
        onSelect={(index) => handleModelSelect(index)}
        buttonTextAfterSelection={(selectedItem, index) => selectedItem}
        rowTextForSelection={(item, index) => item}
        buttonStyle={[styles.button, { borderColor: modelError ? 'red' : '#e8e8e8' }]}
        buttonTextStyle={styles.buttonText}
        dropdownStyle={styles.dropdown}
        rowStyle={styles.row}
        rowTextStyle={styles.rowText}
        defaultButtonText={carData ? carData.model : 'Select the Model of car'}
      />
      {modelError && <Text //show the error message if user not select the value from the dropdown
      style={styles.errorMessage}>{modelError}</Text>}
      </>
    }
    <CustomInput 
     name={'RegistrationNumber'}
     control={control}
     rules={carData ? null :{
       required: 'Registration Number is required',
     }}
     placeholder="What is the Registration number of Car"
     defaultValue={carData ? carData.registrationNumber : null} //setting the default value of the input field when the user updating the details of the car
    />
    <CustomInput 
     name={'Color'}
     control={control}
     rules={carData ? null : {
       required: 'Color is required',
     }}
     placeholder="What is the Color of Car"
     defaultValue={carData ? carData.color : null} //setting the default value of the input field when the user updating the details of the car
    />
    <CustomButton 
    text={carData? 'Update' : 'Register'} //on the behalf of carData availability showing the text of the button
    onPress={handleSubmit(onPressHandler)}
    />
    </ View>
  )
}

export default RegisterCarScreen

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
      },
      button: {
        backgroundColor: '#fff',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        // justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        width: '100%',
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
      },
      dropdown: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        marginTop: 10,
      },
      row: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
      },
      rowText: {
        fontSize: 16,
        color: '#000',
      },
      errorMessage: {
        color: 'red',
        alignSelf: 'stretch'
      }
})