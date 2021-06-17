import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
  Button,
} from "react-native";
import { color } from "react-native-reanimated";
import { ListItem, BottomSheet } from "react-native-elements";

export const If = ({ navigation, route }) => {
  const { token } = route.params;
  const { strategy } = route.params;
  const [data, setData] = React.useState([]);
  setTimeout(() => {
    navigation.setOptions({ title: "Стратегия " + strategy });
  }, 0);

  const [ticker, setTicker] = React.useState("");
  const [lots, setLots] = React.useState("");
  // buy
  const [limit, setlimit] = React.useState("");
  const [triggerBuy, setTriggerBuy] = React.useState("");
  // tp
  const [triggerTp, setTriggerTp] = React.useState("");
  const [limitTp, setlimitTp] = React.useState("");
  //sl
  const [priceSl, setPriceSl] = React.useState("");
  const [triggerSl, setTriggerSl] = React.useState("");
  const [slTrailing, setSlTrailing] = React.useState("");

  const defaultTemp = { editingIndex: -1, text: "" };
  const [test1, setTest] = React.useState({ name: "" });
  const [temp, setTemp] = React.useState(defaultTemp);
  const sheetRef = React.useRef(null);
  // legs
  const [buy, setBuy] = React.useState("limit");
  const [tp, setTp] = React.useState("Не установлено");
  const [sl, setSl] = React.useState("Не установлено");

  const [refreshing, setRefreshing] = React.useState(false);
  const [isVisibleBuy, setIsVisibleBuy] = useState(false);
  const [isVisibleTp, setIsVisibleTp] = useState(false);
  const [isVisibleSl, setIsVisibleSl] = useState(false);
  // buy
  const list = [
    {
      title: "limit",
      onPress: () => (
        setIsVisibleBuy(false), setBuy("limit"), setlimit(""), setTriggerBuy("")
      ),
    },
    {
      title: "limit-min",
      onPress: () => (
        setIsVisibleBuy(false),
        setBuy("limit-min"),
        setlimit(""),
        setTriggerBuy("")
      ),
    },
    {
      title: "limit-max",
      onPress: () => {
        setBuy("limit-max");
        setIsVisibleBuy(false);
        setlimit("");
        setTriggerBuy("");
      },
    },
    {
      title: "market-min",
      onPress: () => (
        setIsVisibleBuy(false),
        setBuy("market-min"),
        setlimit(""),
        setTriggerBuy("")
      ),
    },
    {
      title: "market-max",
      onPress: () => (
        setIsVisibleBuy(false),
        setBuy("market-max"),
        setlimit(""),
        setTriggerBuy("")
      ),
    },
    {
      title: "Закрыть",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisibleBuy(false),
    },
  ];
  // Tp
  const list2 = [
    {
      title: "Не установлено",
      onPress: () => (
        setIsVisibleTp(false),
        setTp("Не установлено"),
        setlimitTp(""),
        setTriggerTp("")
      ),
    },
    {
      title: "limit-max",
      onPress: () => (setIsVisibleTp(false), setTp("limit-max")),
    },
    {
      title: "market-max",
      onPress: () => (setIsVisibleTp(false), setTp("market-max")),
    },

    {
      title: "Закрыть",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisibleTp(false),
    },
  ];
  // Sl
  const list3 = [
    {
      title: "Не установлено",
      onPress: () => (
        setIsVisibleSl(false),
        setSl("Не установлено"),
        setPriceSl(""),
        setTriggerSl(""),
        setSlTrailing("")
      ),
    },
    {
      title: "market-min",
      onPress: () => (
        setIsVisibleSl(false),
        setSl("market-min"),
        setPriceSl(""),
        setTriggerSl(""),
        setSlTrailing("")
      ),
    },
    {
      title: "simple-trailing-sl",
      onPress: () => (
        setIsVisibleSl(false),
        setSl("simple-trailing-sl"),
        setPriceSl(""),
        setTriggerSl(""),
        setSlTrailing("")
      ),
    },
    {
      title: "trailing-sl",
      onPress: () => (
        setIsVisibleSl(false),
        setSl("trailing-sl"),
        setPriceSl(""),
        setTriggerSl(""),
        setSlTrailing("")
      ),
    },
    {
      title: "limit-min",
      onPress: () => (
        setIsVisibleSl(false),
        setSl("limit-min"),
        setPriceSl(""),
        setTriggerSl(""),
        setSlTrailing("")
      ),
    },
    {
      title: "Закрыть",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisibleSl(false),
    },
  ];

  const placeAlgo = () => {
    let buyLeg;
    let tpLeg;
    let slLeg;
    switch (buy) {
      case "limit":
        buyLeg = { "exec-type": "limit", limit: limit };
        break;
      case "limit-max":
        buyLeg = { "exec-type": "limit-max", price: triggerBuy, limit: limit };
        break;
      case "market-min":
        buyLeg = { "exec-type": "market-min", price: triggerBuy, limit: limit };
        break;
      case "market-max":
        buyLeg = { "exec-type": "market-max", price: triggerBuy, limit: limit };
        break;
    }
    switch (tp) {
      case "limit-max":
        tpLeg = { "exec-type": "limit-max", price: triggerTp, limit: limitTp };
        break;
      case "market-max":
        tpLeg = { "exec-type": "market-max", price: triggerTp };
        break;
      default:
        tpLeg = null;
        break;
    }
    switch (sl) {
      case "market-min":
        slLeg = { "exec-type": "market-min", "sl-price": priceSl };
        break;
      case "simple-trailing-sl":
        slLeg = {
          "exec-type": "simple-trailing-sl",
          "sl-trailing": slTrailing,
        };
        break;
      case "trailing-sl":
        slLeg = {
          "exec-type": "trailing-sl",
          "sl-price": priceSl,
          "sl-trailing": slTrailing,
          "sl-trigger": triggerSl,
        };
        break;
      case "limit-min":
        slLeg = { "exec-type": "limit-min", "sl-price": priceSl };
        break;
      default:
        slLeg = null;
        break;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/octet-stream",
        "kekkonen.mode": "invoke",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({
        "algo-mode": "real",
        "buy-leg": buyLeg,
        "sl-leg": slLeg,
        ticker: ticker,
        //   "account-name": "string",
        //   "account-id": "string",
        strategy: strategy,
        "tp-leg": tpLeg,
        endpoint: "tinkoff-sb",
        lots: parseInt(lots),
      }),
    };
    fetch("https://staging.jess-bot.ru/algos/place-algo", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => alert(error));
    navigation.goBack();
  };
  return (
    <ScrollView style={styles.container}>
      <BottomSheet
        isVisible={isVisibleBuy}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
      >
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <BottomSheet
        isVisible={isVisibleTp}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
      >
        {list2.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <BottomSheet
        isVisible={isVisibleSl}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
      >
        {list3.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <View style={styles.content}>
        <View style={styles.object}>
          <TextInput
            style={styles.input}
            value={ticker}
            onChangeText={setTicker}
            placeholder="Тикер"
          />
        </View>

        <View style={styles.object}>
          <TextInput
            style={styles.input}
            value={lots}
            onChangeText={setLots}
            placeholder="Лоты"
          />
        </View>
        {strategy != "sell" ? (
          <View>
            <View style={styles.separator} />

            <Text style={{ alignSelf: "center" }}>Покупка</Text>
            <TouchableOpacity
          style={styles.button}
          onPress={() => setIsVisibleBuy(!isVisibleBuy)}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            Покупка(Buy): {buy} ▼
          </Text>
        </TouchableOpacity>
          </View>
        ) : null}

        
        {buy == "limit" && strategy != "sell" ? (
          <TextInput
            style={styles.input}
            placeholder="Лимит покупки"
            value={limit}
            onChangeText={setlimit}
          />
        ) : null}
        {buy != "limit" && strategy != "sell" ? (
          <View style={styles.object}>
            <TextInput
              style={styles.input}
              placeholder="Триггер покупки"
              value={triggerBuy}
              onChangeText={setTriggerBuy}
            />
            <TextInput
              style={styles.input}
              placeholder="Лимит покупки"
              value={limit}
              onChangeText={setlimit}
            />
          </View>
        ) : null}
        <View style={styles.separator} />

        <Text style={{ alignSelf: "center" }}>TP</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsVisibleTp(!isVisibleTp)}
        >
          <Text style={{ color: "white", fontSize: 16 }}>TP: {tp} ▼</Text>
        </TouchableOpacity>
        {/* TP */}
        {tp != "Не установлено" && tp == "limit-max" ? (
          <View style={styles.object}>
            <TextInput
              style={styles.input}
              placeholder="Триггер TP"
              value={triggerTp}
              onChangeText={setTriggerTp}
            />

            <TextInput
              style={styles.input}
              placeholder="Лимит TP"
              value={limitTp}
              onChangeText={setlimitTp}
            />
          </View>
        ) : null}
        {tp != "Не установлено" && tp == "market-max" ? (
          <TextInput
            style={styles.input}
            placeholder="Триггер TP"
            value={triggerTp}
            onChangeText={setTriggerTp}
          />
        ) : null}

        <View style={styles.separator} />

        <Text style={{ alignSelf: "center" }}>SL</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsVisibleSl(!isVisibleSl)}
        >
          <Text style={{ color: "white", fontSize: 16 }}>SL: {sl} ▼</Text>
        </TouchableOpacity>
        {/* SL */}
        {sl != "Не установлено" && sl == "market-min" ? (
          <TextInput
            style={styles.input}
            placeholder="SL Цена"
            value={priceSl}
            onChangeText={setPriceSl}
          />
        ) : null}
        {sl != "Не установлено" && sl == "simple-trailing-sl" ? (
          <TextInput
            style={styles.input}
            placeholder="Отставание SL лимита от рыночной цены"
            value={slTrailing}
            onChangeText={setSlTrailing}
          />
        ) : null}
        {sl != "Не установлено" && sl == "trailing-sl" ? (
          <View style={styles.object}>
            <TextInput
              style={styles.input}
              placeholder="SL Цена"
              value={priceSl}
              onChangeText={setPriceSl}
            />
            <TextInput
              style={styles.input}
              placeholder="SL триггер"
              value={triggerSl}
              onChangeText={setTriggerSl}
            />
            <TextInput
              style={styles.input}
              placeholder="Отставание SL лимита от рыночной цены "
              value={slTrailing}
              onChangeText={setSlTrailing}
            />
          </View>
        ) : null}
        {sl != "Не установлено" && sl == "limit-min" ? (
          <TextInput
            style={styles.input}
            placeholder="SL Цена"
            value={priceSl}
            onChangeText={setPriceSl}
          />
        ) : null}
        <TouchableOpacity style={styles.button2} onPress={placeAlgo}>
          <Text style={{ color: "white", fontSize: 16 }}>Создать Алго</Text>
        </TouchableOpacity>
        <View style={styles.object}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  text: {
    color: "black",
    fontSize: 16,
  },
  object: {
    // paddingBottom: 10,
    // paddingTop: 1,
  },
  tinylogo: {
    width: 25,
    height: 25,
  },
  input: {
    height: 40,
    width: "100%",
    padding: 5,
    marginBottom: 7,
    marginTop: 7,
    backgroundColor: "#FFFFFF",
    borderColor: "#4C4B63",
    borderRadius: 6,
    borderWidth: 1,
    fontSize: 16,
    alignItems: "center",
  },
  icontext: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 10,
  },
  button: {
    marginTop: 15,

    backgroundColor: "#5386E4",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
  },
  button2: {
    marginTop: 15,

    backgroundColor: "#16a085",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
  },
  notifications: {
    alignItems: "flex-start",
  },
  separator: {
    height: 1,
    backgroundColor: "#c8c8c8",
    width: "100%",
    marginTop: 3,
  },

  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
