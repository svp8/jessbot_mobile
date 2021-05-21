import React from 'react'
import {View,Text, Image, StyleSheet, TextInput,TouchableOpacity,Switch, ScrollView} from 'react-native'
import { color } from 'react-native-reanimated'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Simulator } from "./Simulator";

export const AlgoListSimulator = props => {
    return (
        <ScrollView>
            <View style={styles.content}>

            <View style={styles.button}>
            <TouchableOpacity>
                <View style={{backgroundColor: '#16a085', alignItems: 'center', 
                     borderRadius: 15, padding: 20}}>
                <Text style={{color:'white', fontSize: 16}}>Создать алго</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View style={styles.separator}/>

            <View style={{alignItems:'center', paddingBottom: 10}}>
            <Text style={{fontSize: 16}}>Список алгоордеров:</Text>
            </View>

            <View style={styles.orders}>
                <Text style={styles.algoheader}>Основной ордер</Text>
                <Text style={styles.algotext}>■Buy: 134</Text>
                <Text style={styles.algotext}>■TP: 150</Text>
                <Text style={styles.algotext}>■SL: 120</Text>
                <Text style={styles.algotext}>■Limit: 230</Text>
            </View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content:{
        flexDirection: 'column',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
    },
    button:{
        paddingTop: 10,
        paddingBottom:10
    },
    text: {
        paddingTop: 10,
        color: 'white',
        fontSize: 20,
        padding: 10
    },
    algotext: {
        fontSize: 16
    },
    algoheader:{
        fontSize:20
    },
    tinylogo: {
        width:25,
        height:25,
    },
    separator:{
        height:1,
        backgroundColor:'#c8c8c8',
        width: '100%'
       },
    orders:{
        borderWidth: 2,
        borderRadius: 3,
        borderColor: '#34496e'
       }
})
