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
  RefreshControl,
} from "react-native";
import { color } from "react-native-reanimated";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export const AlgoListSimulator = ({ navigation, route }) => {
  const { token } = route.params;
  // Пока использую мой токен для тестов
  const t =
    "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYifQ.EWGA84Y_LfE1-zIA1foijerLIezeTQ6gSQeN09hCuZFgf8YXQ1prVjsDJ4Wbfz_HtIoFjT-2M_qf890CJA6mBr6wxISlZzr4DDPaOuV1lwbZfoPSlMoDKX83_INMXrkxjckD39slVW_ZWneniX_ksf1-FUxwi6bSyXtvLeI_fvFDZR0rDA67Yniq-ze2ipQXoAmpXvAXShdCR_EgMmq2ykBB6-LhsBEB2ZHQ-vokWXrKepaVE83hJeFSsSD1ulPAlPv6V8OxnYbtlUSzP5GX-ZCWW26BSITTSgDoqu4nOB2o7Mm8vnTJSxpTcK-RdCCo9fL_LaGyDq2QH9oUajpgYA.Jg1HOfhczNSHT-ilmPCyqg.sDw-DqghR9yJ0twB4Hj9eZRzKGVi1E-VBDItAJKgVo3bcI_ybFF4kKVFSAJBp-HxAHMOUKGWTswexteIfZoyQbIcZYUQbf_oNPiIcvSsXNbNKwg_3OYJ59IYEh2dPKXu.jLjq9PmCDe8sikdnbl8HOw";
  var dBuy=new Date();
  var dSell=new Date();
  var d2=" ";
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  var l1 = "buy-leg";
  const showInfo = (id) => {
    console.log("ase",d2);
    var d = data.find((item) => item.id === id);
    navigation.navigate("AlgoListInfo", { id: id, data: d,token:token,dSell:d2,dBuy:dBuy.getFromFormat('yyyy-mm-dd hh:ii:ss')});
  };
  Date.prototype.getFromFormat = function(format) {
    var yyyy = this.getFullYear().toString();
    format = format.replace(/yyyy/g, yyyy)
    var mm = (this.getMonth()+1).toString(); 
    format = format.replace(/mm/g, (mm[1]?mm:"0"+mm[0]));
    var dd  = this.getDate().toString();
    format = format.replace(/dd/g, (dd[1]?dd:"0"+dd[0]));
    var hh = this.getHours().toString();
    format = format.replace(/hh/g, (hh[1]?hh:"0"+hh[0]));
    var ii = this.getMinutes().toString();
    format = format.replace(/ii/g, (ii[1]?ii:"0"+ii[0]));
    var ss  = this.getSeconds().toString();
    format = format.replace(/ss/g, (ss[1]?ss:"0"+ss[0]));
    return format;
};

  // API Fetch на фоне
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "kekkonen.mode": "invoke",
        Authorization: "Token " + token,
      },
    };
    fetch("https://staging.jess-bot.ru/algos/my-algos", requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data.algos))
      .then(() => setLoading(false)).then(() => setRefreshing(false));
  }, [refreshing]);
  console.log(data);
  // const showInfo=(id)=>{
  //   console.log(id);
  // }
  const handleRefresh=()=>{
setRefreshing(true);
// if (data[0]["price-details"].price.bids[0].price>20){
//   d2=dSell.getFromFormat('yyyy-mm-dd hh:ii:ss');
//   console.log("sell, ",d2);
//   // alert("Вы продали");
// }
// else if (data[0]["price-details"].price.bids[0].price>=12&&data[0]["price-details"].price.bids[0].price<=14){
//   dBuy=new Date();
//   console.log("buy, ",dBuy);
//   // alert("Вы купили");
// }
console.log("sae")
  }
  return (
    <ScrollView refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SelectStrategy",{token:token})}
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
            <TouchableOpacity
              style={styles.orders}
              onPress={() => showInfo(item.id)}
            >
              <Text style={{ fontSize: 20 }}>
                {item.request.lots} {item.request.ticker} ({item.state})
              </Text>

              {item["price-details"] != null ? (
                <Text
                  style={{
                    position: "absolute",
                    right: 0,
                    fontSize: 20,
                    padding: 6,
                  }}
                >
                  {item["price-details"].price.bids[0].price}/
                  {item["price-details"].price.asks[0].price}
                </Text>
              ) : null}

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
            </TouchableOpacity>
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
    backgroundColor: "#7CB9E8",
    borderWidth: 2,
    borderRadius: 3,
    borderColor: "#34496e",
    marginBottom: 8,
    padding: 6,
  },
});
