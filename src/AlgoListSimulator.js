import React, { useState, useEffect }from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  FlatList,
} from "react-native";
import { color } from "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export const AlgoListSimulator = ({ navigation }) => {
    const [algo, setAlgo] = useState([
    { name: 'A1',buy:'22',tp:'12',sl:'123',limit:'4', id: '1' },
    { name: 'A2',buy:'22',tp:'12',sl:'123',limit:'4', id: '2' },
    { name: 'A3',buy:'22',tp:'12',sl:'123',limit:'4', id: '3' },
    { name: 'A4',buy:'22',tp:'12',sl:'123',limit:'4', id: '4' },
    { name: 'A5',buy:'22',tp:'12',sl:'123',limit:'4', id: '5' },
  ]);
  return (
    <ScrollView>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Simulator")}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Создать алго</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <View style={{ alignItems: "center", paddingBottom: 10 }}>
          <Text style={{ fontSize: 16 }}>Список алгоордеров:</Text>
        </View>
 <FlatList 
        
        keyExtractor={(item) => item.id} 
        data={algo} 
        renderItem={({ item }) => ( 
            <View style={styles.orders}>
          <Text style={styles.algotext}>{item.name}</Text>
          <Text style={styles.algotext}>■Buy :{item.buy}</Text>
          <Text style={styles.algotext}>■TP:{item.tp}</Text>
          <Text style={styles.algotext}>■SL:{item.sl} </Text>
          <Text style={styles.algotext}>■Limit: {item.limit}</Text>
          </View>
        )}
      />
        {/* <View style={styles.orders}>
          <Text style={styles.algoheader}>Основной ордер</Text>
          <Text style={styles.algotext}>■Buy: 134</Text>
          <Text style={styles.algotext}>■TP: 150</Text>
          <Text style={styles.algotext}>■SL: 120</Text>
          <Text style={styles.algotext}>■Limit: 230</Text>
        </View> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#16a085",
    alignItems: "center",
    borderRadius: 15,
    padding: 20,
  },
  text: {
    paddingTop: 10,
    color: "white",
    fontSize: 20,
    padding: 10,
  },
  algotext: {
    fontSize: 16,
  },
  algoheader: {
    fontSize: 20,
  },
  tinylogo: {
    width: 25,
    height: 25,
  },
  separator: {
    height: 1,
    backgroundColor: "#c8c8c8",
    width: "100%",
  },
  orders: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: "#34496e",
    marginBottom:8,
  },
});
