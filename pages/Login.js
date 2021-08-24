import React from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Login from '../component/Login';

const Login = () => {
  return(
      <View style={StyleSheet.wrapper}>
          <Login />
      </View>
  )
}


const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    backgroundColor: 'black',
    height: '100%',
    width: '100%'
  }
})

export default Login;