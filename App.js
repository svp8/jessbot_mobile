import React from 'react';
import { View } from 'react-native';
import { Navbar } from './src/Navbar';
import { Algoinf } from './src/Algoinf'
import { Algocreate } from './src/Algocreate';

export default function App() {
  return (
  <View >
    <Navbar/>
    <Algoinf/>
    <Algocreate/>
  </View>
  );
}
 