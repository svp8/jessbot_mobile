import React, { useState, useEffect } from 'react'
import {View,Text, Image, StyleSheet, TextInput,TouchableOpacity,Switch, ScrollView} from 'react-native'
import { color } from 'react-native-reanimated'
import ToggleSwitch from 'toggle-switch-react-native'

export const If = ({ navigation, route }) => {
    const {token}=route.params;
 const [data, setData] = React.useState([]);
  const [lots, setLots] =React.useState("");
  const [limit, setlimit] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [slTrailing, setSlTrailing] = React.useState("");
  const [ticker, setTicker] = React.useState("");
  
  const [refreshing, setRefreshing] = React.useState(false);
  
  
   const placeAlgo = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/octet-stream",
        "kekkonen.mode": "invoke",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ "algo-mode": "real",
    "buy-leg": {
    "exec-type": "limit-max",
    "price": price,
    "limit": limit,
    },
  
  "sl-leg": {
    "exec-type": "simple-trailing-sl",
    "sl-trailing": slTrailing,
  },
  "ticker": ticker,
//   "account-name": "string",
//   "account-id": "string",
  "strategy": "if",
//   "tp-leg": {
//     "exec-type": "limit-max",
//     "price": "string",
//     "limit": "string",
//     "indicator": {
//       "indicator": "rsi",
//       "interval": "30min",
//       "time-period": 0,
//       "threshold-buy": 0,
//       "threshold-sell": 0,
//       "score": 0
//     },
//     "signal-id": "string",
//     "signal": {
//       "id": "string",
//       "user-id": "string",
//       "meta": {
//         "combination-type": "except"
//       },
//       "state": "deleted",
//       "signal-id": "string",
//       "indicators": {},
//       "threshold": 0
//     }
//   },
  "endpoint": "tinkoff-sb",
  "lots": parseInt(lots),})};
    fetch("https://staging.jess-bot.ru/algos/place-algo", requestOptions).then((response) => response.json())
      .then((data) => console.log(data));
  };
    return (
        <ScrollView style={styles.scrollView}>

<View style={styles.content}>
    <View style={styles.object}> 
    
    <TextInput style={styles.input} value={ticker}
        onChangeText={setTicker}
         placeholder='Тикер'/>
    </View>  

    <View style={styles.object}>
        <TextInput style={styles.input}
        value={lots}
        onChangeText={setLots}
         placeholder='Лоты'/>
    </View>


    <View style={styles.separator}/>

    <Text style={{alignSelf:'center'}}>Покупка:</Text>
        

    <View style={styles.object}>
        <TextInput style={styles.input}
        value={limit}
        onChangeText={setlimit}
           placeholder='Лимит покупки'/>
    </View>

    <View style={styles.object}>
        <TextInput style={styles.input}
           placeholder='Лимит(мин)'/>
    </View>    

           <View style={styles.object}>
           <TextInput style={styles.input}
           placeholder='Лимит(макс)'/>
    </View>

    <View style={styles.object}>
        <TextInput style={styles.input}
        value={price}
        onChangeText={setPrice}
           placeholder='Маркет(мин)'/>
    </View>

    <View style={styles.object}>
    <TextInput style={styles.input}
         placeholder='Маркет(макс)'/>
    </View>


    <Text style={{alignSelf:'center'}}>Продажа:</Text>

    <View style={styles.object}>
        <TextInput style={styles.input}
           placeholder='TP Лимит (макс)'/>
    </View>

    <View style={styles.object}>
           <TextInput style={styles.input}
           placeholder='TP Маркет (мин)'/>
    </View>

    <View style={styles.object}>
           <TextInput style={styles.input}
           placeholder='TP Маркет (мин)'/>
    </View>

    <View style={styles.object}>
        <TextInput style={styles.input}
           placeholder='SL Лимит (мин)'/>
    </View>

    <View style={styles.object}>
        <TextInput style={styles.input}
           placeholder='SL Отставание от рын. цены'/>
    </View>

    <Text>Trailing SL:</Text>
    <View style={styles.object}>
           <TextInput style={styles.input}
           placeholder='SL цена'/>
    </View>

    <View style={styles.object}>
        <TextInput style={styles.input}
           placeholder='SL Триггер'/>
    </View>

    <View style={styles.object}>
        <TextInput style={styles.input}
        value={slTrailing}
        onChangeText={setSlTrailing}
           placeholder='SL Отставания (traling)'/>
    </View>

        <View style={styles.button}>
            <TouchableOpacity onPress={placeAlgo}>
            <View style = {{backgroundColor: '#16a085', alignItems: 'center', 
                    justifyContent: 'flex-end', borderRadius: 15, paddingTop:10, paddingBottom:10, height:48,justifyContent: 'center',}}
           >
            <Text style = {{color: 'white',fontSize: 16,}}>Сохранить алгоордер</Text>
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
    object:{
        paddingBottom:10,
        paddingTop: 10,
    },
    tinylogo: {
        width:25,
        height:25,
    },
    input: {
        height: 40,
        width: '80%',
        padding: 5,
        paddingBottom: 10,
        backgroundColor: '#FFFFFF',
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
   },
   separator: {
    height: 1,
    backgroundColor: "#c8c8c8",
    width: "100%",
  },

})