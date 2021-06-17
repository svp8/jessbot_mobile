import React, { useState, useEffect } from 'react'
import {View,Text, Image, StyleSheet, TextInput,TouchableOpacity,Switch, ScrollView} from 'react-native'
import { color } from 'react-native-reanimated'
import ToggleSwitch from 'toggle-switch-react-native'

export const SelectStrategy = ({ navigation, route }) => {
   const {token}=route.params;
  
    return (
        <ScrollView contentContainerStyle={styles.container}>


    <Text style={{alignSelf:'center'}}>Выберите стратегию:</Text>

       <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("If",{token:token,strategy:"if"})}>
        <Text style={styles.buttonText} 
        >If</Text>
       </TouchableOpacity>

       <TouchableOpacity 
       style={styles.buttonContainer}
       onPress={() => navigation.navigate("If",{token:token,strategy:"loop"})}>
        <Text style={styles.buttonText} >Loop</Text>
      </TouchableOpacity>

      <TouchableOpacity
       style={styles.buttonContainer}
       onPress={() => navigation.navigate("If",{token:token,strategy:"sell"})}>
        <Text style={styles.buttonText}>Sell</Text>
      </TouchableOpacity>
   
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    content: {
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
    },
    container: {
        justifyContent: "center",
    
        padding: 20,
        paddingTop: 200,
      },
      buttonContainer: {
        marginTop: 10,
        width: "100%",
        backgroundColor: "#16a085",
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    tinylogo: {
        width:25,
        height:25,
    },
    input: {
        height: 40,
        width: '70%',
        padding: 5,
        paddingBottom: 10,
        backgroundColor: '#f4f6f6',
        borderColor: '#f5f7f7',
        borderRadius: 6,
        borderWidth: 1,
        fontSize: 16,
        alignItems:'center',
    },
    icontext:{
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 10
    },
   button:{
        paddingTop: '3%',
        
   },
   notifications : {
        alignItems: 'flex-start'
   }

})