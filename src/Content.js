import React, { useState, useEffect } from 'react'
import {View,Text, Image, StyleSheet, TextInput,TouchableOpacity,Switch, ScrollView} from 'react-native'
import { color } from 'react-native-reanimated'
import ToggleSwitch from 'toggle-switch-react-native'

export const Content = ({ navigation, route }) => {
    const {phone}=route.params;
    const [data, setData] = React.useState("");
    const [isSwitchEnabled1, setSwitch1]= React.useState(false),
    [isSwitchEnabled2, setSwitch2]= React.useState(false)
    
    const test=()=>{
    const requestOptions = {
    method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "kekkonen.mode": "invoke",
      },
    };
    fetch('https://staging.jess-bot.ru/algos/my-algos', requestOptions)
        .then(response => response.text())
        .then(data => setData(data));
    alert(data);
}
    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
            
            <View style={styles.icontext}>
                <Image 
                style={styles.tinylogo}
                source={require('../assets/phone.png')}/>
                <Text style={styles.text}> Телефон: </Text>
            </View>
            <TextInput style={styles.input}
            value={"+"+phone} 
            
/>
            <View style={styles.notifications}>
            <View style={styles.icontext}>
                <Image 
                style={styles.tinylogo}
                source={require('../assets/bell.png')}/>
                <Text style={styles.text}> Уведомления (алго): </Text>
            </View>

            <Switch 
            value={isSwitchEnabled1}
            onValueChange={(value)=>setSwitch1(value)}
            trackColor={{true: '#16a085',
                        false: '#34495e'}}
            />

            <View style={styles.icontext}>
                <Image 
                style={styles.tinylogo}
                source={require('../assets/bell.png')}/>
                <Text style={styles.text}> Уведомления (симулятор): </Text>
            </View>
            
            <Switch 
            value={isSwitchEnabled2}
            onValueChange={(value)=>setSwitch2(value)}
            trackColor={{true: '#16a085',
                        false: '#34495e'}}
            />
            </View>

            <View style={styles.icontext}>
                <Image 
                style={styles.tinylogo}
                source={require('../assets/qr-code.png')}/>
                <Text style={styles.text}> API токен: </Text>
            </View>
            <TextInput style={{borderRadius: 6, 
                borderColor: '#bdc3c7', 
                width:'100%', 
                height: 300, 
                borderWidth: 2,
                textAlignVertical: 'top',
                padding: 10
                }} multiline={true}
                numberOfLines={15}
                placeholder="Вставьте здесь ваш API токен"
                 />

        <View style={styles.button}>
            <TouchableOpacity onPress = {test}>
            <View style = {{backgroundColor: '#16a085', alignItems: 'center', 
                    justifyContent: 'flex-end', borderRadius: 15, paddingTop:10, paddingBottom:10, height:48,justifyContent: 'center',}}
           >
            <Text style = {{color: 'white',fontSize: 16,}}>Сохранить настройки</Text>
            </View>
            </TouchableOpacity>
        </View>

        </View>
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
    text: {
        color: 'black',
        fontSize: 16,
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