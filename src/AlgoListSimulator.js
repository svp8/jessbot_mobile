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

export const AlgoListSimulator = ({ navigation, route }) => {
  const { token } = "route.params";
  // Пока использую мой токен для тестов
  const t =
    "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYifQ.EWGA84Y_LfE1-zIA1foijerLIezeTQ6gSQeN09hCuZFgf8YXQ1prVjsDJ4Wbfz_HtIoFjT-2M_qf890CJA6mBr6wxISlZzr4DDPaOuV1lwbZfoPSlMoDKX83_INMXrkxjckD39slVW_ZWneniX_ksf1-FUxwi6bSyXtvLeI_fvFDZR0rDA67Yniq-ze2ipQXoAmpXvAXShdCR_EgMmq2ykBB6-LhsBEB2ZHQ-vokWXrKepaVE83hJeFSsSD1ulPAlPv6V8OxnYbtlUSzP5GX-ZCWW26BSITTSgDoqu4nOB2o7Mm8vnTJSxpTcK-RdCCo9fL_LaGyDq2QH9oUajpgYA.Jg1HOfhczNSHT-ilmPCyqg.sDw-DqghR9yJ0twB4Hj9eZRzKGVi1E-VBDItAJKgVo3bcI_ybFF4kKVFSAJBp-HxAHMOUKGWTswexteIfZoyQbIcZYUQbf_oNPiIcvSsXNbNKwg_3OYJ59IYEh2dPKXu.jLjq9PmCDe8sikdnbl8HOw";
  console.log(token);
  const [algo, setAlgo] = useState([
    { name: "A1", buy: "22", tp: "12", sl: "123", limit: "4", id: "1" },
    { name: "A2", buy: "22", tp: "12", sl: "123", limit: "4", id: "2" },
    { name: "A3", buy: "22", tp: "12", sl: "123", limit: "4", id: "3" },
    { name: "A4", buy: "22", tp: "12", sl: "123", limit: "4", id: "4" },
    { name: "A5", buy: "22", tp: "12", sl: "123", limit: "4", id: "5" },
  ]);
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = useState(true);
  var l1 = "buy-leg";
  // API Fetch на фоне
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "kekkonen.mode": "invoke",
        Authorization: "Token " + t,
      },
    };
    fetch("https://staging.jess-bot.ru/algos/my-algos", requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data.algos))
      .then(() => setLoading(false));
  }, []);
  console.log(data);
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
          data={data}
          renderItem={({ item }) => (
            <View style={styles.orders}>
              <Text style={{ fontSize: 20 }}>
                {item.request.lots} {item.request.ticker} ({item.state})
              </Text>
              {item.request["buy-leg"]["exec-type"] != "limit" ? (
                <Text style={styles.algotext}>
                  Buy: {item.request["buy-leg"]["exec-type"]}(trigger ={" "}
                  {item.request["buy-leg"].price}, limit ={" "}
                  {item.request["buy-leg"].limit})
                </Text>
              ) : (
                <Text style={styles.algotext}>
                  Buy: {item.request["buy-leg"]["exec-type"]}(
                  {item.request["buy-leg"].limit})
                </Text>
              )}
{/* Проверки на SL.TP */}
              {item.request["tp-leg"] != null ? (
                <Text style={styles.algotext}>
                  TP: {item.request["tp-leg"]["exec-type"]}(trigger ={" "}
                  {item.request["tp-leg"].price}, limit ={" "}
                  {item.request["tp-leg"].limit})
                </Text>
              ) : null}
              {item.request["sl-leg"] != null &&
              item.request["sl-leg"]["sl-trigger"] != null ? (
                <Text style={styles.algotext}>
                  SL: {item.request["sl-leg"]["exec-type"]}(
                  {item.request["sl-leg"]["sl-price"]}+
                  {item.request["sl-leg"]["sl-trailing"]}@
                  {item.request["sl-leg"]["sl-trigger"]})
                </Text>
              ) : null}
              {item.request["sl-leg"] != null &&
              item.request["sl-leg"]["sl-trigger"] == null ? (
                <Text style={styles.algotext}>
                  SL: {item.request["sl-leg"]["exec-type"]}(
                  {item.request["sl-leg"]["sl-price"]}
                  {item.request["sl-leg"]["sl-trailing"]})
                </Text>
              ) : null}
              
            </View>
          )}
        />
       
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
    marginBottom: 8,
    padding: 6,
  },
});
