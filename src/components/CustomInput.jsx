import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';


//Custom input text fields to get data from the user and to validate the data by using the controller
const CustomInput = ({ control, name, rules, placeholder, secureTextEntry, defaultValue }) => { // here defaultValue is optional
  return (

    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? 'red' : '#e8e8e8' }]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              defaultValue={defaultValue}
              onBlur={onBlur}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && <Text style={styles.errorMessage}>{error.message || 'Error'}</Text>}
        </>
      )}
    />



  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 50,
  },
  errorMessage: {
    color: 'red',
    alignSelf: 'stretch'
  }
});

export default CustomInput;
