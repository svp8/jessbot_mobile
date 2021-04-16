import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Navbar } from './src/Navbar';
import { Content } from './src/Content'



export default function App() {
  return (
    <View>
      <Navbar title="Настройки"/>
      <Content/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
