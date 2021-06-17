import React, { useState, useEffect } from "react";
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

export const AlgoListInfo = ({ navigation, route }) => {
  const { id } = route.params;
  const { data } = route.params;
  const { token } = route.params;
  

  // Пока использую мой токен для тестов
  const t =
    "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYifQ.EWGA84Y_LfE1-zIA1foijerLIezeTQ6gSQeN09hCuZFgf8YXQ1prVjsDJ4Wbfz_HtIoFjT-2M_qf890CJA6mBr6wxISlZzr4DDPaOuV1lwbZfoPSlMoDKX83_INMXrkxjckD39slVW_ZWneniX_ksf1-FUxwi6bSyXtvLeI_fvFDZR0rDA67Yniq-ze2ipQXoAmpXvAXShdCR_EgMmq2ykBB6-LhsBEB2ZHQ-vokWXrKepaVE83hJeFSsSD1ulPAlPv6V8OxnYbtlUSzP5GX-ZCWW26BSITTSgDoqu4nOB2o7Mm8vnTJSxpTcK-RdCCo9fL_LaGyDq2QH9oUajpgYA.Jg1HOfhczNSHT-ilmPCyqg.sDw-DqghR9yJ0twB4Hj9eZRzKGVi1E-VBDItAJKgVo3bcI_ybFF4kKVFSAJBp-HxAHMOUKGWTswexteIfZoyQbIcZYUQbf_oNPiIcvSsXNbNKwg_3OYJ59IYEh2dPKXu.jLjq9PmCDe8sikdnbl8HOw";
  console.log(data);

  const [isLoading, setLoading] = useState(true);




const stopAlgo=()=>{
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/octet-stream",
        "kekkonen.mode": "invoke",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ "algo-id": id }),
    };
    fetch("https://staging.jess-bot.ru/algos/cancel-algo", requestOptions).then((response) => response.text())
      .then((data) => console.log(data));
    console.log("123");
}
const deleteAlgo=()=>{
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/octet-stream",
        "kekkonen.mode": "invoke",
        Authorization: "Token " + t,
      },
      body: JSON.stringify({ "algo-id": id }),
    };
    fetch("https://staging.jess-bot.ru/algos/delete-algo", requestOptions).then((response) => response.text())
      .then((data) => console.log(data));
    console.log("231");
}
  return (
    <ScrollView style={styles.body}>
    <TouchableOpacity
          style={styles.buttonStop}
          onPress={() => stopAlgo()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Остановить</Text>
        </TouchableOpacity>
<TouchableOpacity
          style={styles.buttonChange}
        //   onPress={() => deleteAlgo()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Изменить</Text>
        </TouchableOpacity>
      <View style={styles.orders}>
        <Text style={styles.headers}>Тикер/Лоты</Text>
        <Text style={styles.text}>
          VTBR / {data.request.lots}
        </Text>
      </View>
      <View style={styles.orders}>
        <Text style={styles.headers}>{data.request.strategy} стратегия:</Text>
        <View style={styles.table}>
          <Text>Время                 </Text>
          <Text>Операция</Text>
          <Text>Цена</Text>
        </View>
        <View style={styles.table2}>
          <Text>11.06.21 12:10</Text>
          <Text>buy</Text>
          <Text>12</Text>
        </View>
        <View style={styles.table2}>
          <Text>11.06.21 12:12</Text>
          <Text>sell</Text>
          <Text>18</Text>
        </View>
        <View style={styles.separator} />
      </View>
      <View style={styles.orders}>
        <Text style={styles.headers}>Метрики</Text>
        <View style={styles.table}>
          <Text>Min цена</Text>
          <Text>Max цена</Text>
          <Text>T позиции</Text>
          <Text>Прибыль</Text>
        </View>
        <View style={styles.separator} />
      </View>
      <View style={styles.orders}>
        <Text style={styles.headers}>Состояние алгоритма</Text>
        <Text style={styles.text}>{data.state}</Text>
      </View>
      <View style={styles.orders}>
        <Text style={styles.headers}>Заявка на рынке</Text>
        <Text style={styles.text}>Нет заявок на рынке</Text>
      </View>
      <View style={styles.orders}>
        <Text style={styles.headers}>Algo Id/Счет</Text>
        <Text style={styles.text}>{id}/Tinkoff</Text>
      </View>
      <View style={styles.orders}>
        <Text style={styles.headers}>Формула</Text>
        <Text style={styles.algotext}>
          {data.request.lots} {data.request.ticker}:
        </Text>
         {data.request["buy-leg"]["exec-type"] != "limit" ? (
                <Text style={styles.algotext}>
                  Buy: {data.request["buy-leg"]["exec-type"]}(trigger ={" "}
                  {data.request["buy-leg"].price}, limit ={" "}
                  {data.request["buy-leg"].limit});
                </Text>
              ) : (
                <Text style={styles.algotext}>
                  Buy: {data.request["buy-leg"]["exec-type"]}(
                  {data.request["buy-leg"].limit});
                </Text>
              )}
              {data.request["tp-leg"] != null ? (
                <Text style={styles.algotext}>
                  TP: {data.request["tp-leg"]["exec-type"]}(trigger ={" "}
                  {data.request["tp-leg"].price}, limit ={" "}
                  {data.request["tp-leg"].limit});
                </Text>
              ) : null}
              {data.request["sl-leg"] != null &&
              data.request["sl-leg"]["sl-trigger"] != null ? (
                <Text style={styles.algotext}>
                  SL: {data.request["sl-leg"]["exec-type"]}(
                  {data.request["sl-leg"]["sl-price"]}+
                  {data.request["sl-leg"]["sl-trailing"]}@
                  {data.request["sl-leg"]["sl-trigger"]});
                </Text>
              ) : null}
              {data.request["sl-leg"] != null &&
              data.request["sl-leg"]["sl-trigger"] == null ? (
                <Text style={styles.algotext}>
                  SL: {data.request["sl-leg"]["exec-type"]}(
                  {data.request["sl-leg"]["sl-price"]}
                  {data.request["sl-leg"]["sl-trailing"]});
                </Text>
              ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "column",
    padding: 10,
  },
algotext: {
    fontSize: 16,
  },
  text: {
    fontSize: 19,
    paddingTop: 10,
  },
  headers: {
    fontSize: 18,
    color: "#34495e",
    fontWeight: "bold",
  },
  table: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
  },
  table2: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
  },
  buttonStop: {
    marginTop: 10,
    marginBottom:5,
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 15,
    padding: 15,
  },
buttonChange: {
    marginTop: 5,
    marginBottom:10,
    backgroundColor: "lime",
    alignItems: "center",
    borderRadius: 15,
    padding: 15,
  },
  orders: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#e7e9ec",
    marginBottom:12,
    padding: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#e7e9ec",
    width: "100%",
  },
});
