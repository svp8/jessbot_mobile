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
  const [data, setData] = React.useState([]);
  const [lots, setLots] = React.useState("");
  const [limit, setlimit] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [slTrailing, setSlTrailing] = React.useState("");
  const [ticker, setTicker] = React.useState("");
  const sheetRef = React.useRef(null);

  const [refreshing, setRefreshing] = React.useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const list = [
    { title: "List Item 1" ,onPress: () => setIsVisible(false)},
    { title: "List Item 2" ,onPress: () => setIsVisible(false)},
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];
const list2 = [
    { title: "List Item22 1" ,onPress: () => setIsVisible(false)},
    { title: "List Item 2" ,onPress: () => setIsVisible(false)},
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible2(false),
    },
  ];
  const placeAlgo = () => {
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
        "buy-leg": {
          "exec-type": "limit-max",
          price: price,
          limit: limit,
        },

        "sl-leg": {
          "exec-type": "simple-trailing-sl",
          "sl-trailing": slTrailing,
        },
        ticker: ticker,
        //   "account-name": "string",
        //   "account-id": "string",
        strategy: "if",
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
        endpoint: "tinkoff-sb",
        lots: parseInt(lots),
      }),
    };
    fetch("https://staging.jess-bot.ru/algos/place-algo", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        isVisible={isVisible}
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
        isVisible={isVisible2}
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

        <View style={styles.separator} />

        <Text style={{ alignSelf: "center" }}>Покупка:</Text>
        <Button
          onPress={()=>(setIsVisible(!isVisible))}
          //on Press of the button bottom sheet will be visible
          title="Show Bottom Sheet"
        />
         <Button
          onPress={()=>(setIsVisible2(!isVisible2))}
          //on Press of the button bottom sheet will be visible
          title="Show Bottom Sheet"
        />
        <View style={styles.object}>
          <TextInput style={styles.input} placeholder="Лимит(мин)" />
        </View>

        <View style={styles.object}>
          <TextInput style={styles.input} placeholder="Лимит(макс)" />
        </View>
      </View>
      {/* 
        <View style={styles.object}>
          <TextInput
            style={styles.input}
            value={limit}
            onChangeText={setlimit}
            placeholder="Лимит покупки"
          />
        </View>

        

        <View style={styles.object}>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Триггер"
          />
        </View>

        <View style={styles.object}>
          <TextInput style={styles.input} placeholder="Маркет(макс)" />
        </View>

        <Text style={{ alignSelf: "center" }}>Продажа:</Text>

        <View style={styles.object}>
          <TextInput style={styles.input} placeholder="TP Лимит (макс)" />
        </View>

        <View style={styles.object}>
          <TextInput style={styles.input} placeholder="TP Маркет (мин)" />
        </View>

        <View style={styles.object}>
          <TextInput style={styles.input} placeholder="TP Маркет (мин)" />
        </View>

        <View style={styles.object}>
          <TextInput style={styles.input} placeholder="SL Лимит (мин)" />
        </View>

        <View style={styles.object}>
          <TextInput
            style={styles.input}
            placeholder="SL Отставание от рын. цены"
          />
        </View>

        <Text>Trailing SL:</Text>
        <View style={styles.object}>
          <TextInput style={styles.input} placeholder="SL цена" />
        </View>

        <View style={styles.object}>
          <TextInput style={styles.input} placeholder="SL Триггер" />
        </View>

        <View style={styles.object}>
          <TextInput
            style={styles.input}
            value={slTrailing}
            onChangeText={setSlTrailing}
            placeholder="SL Отставания (traling)"
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={placeAlgo}>
            <View
              style={{
                backgroundColor: "#16a085",
                alignItems: "center",
                justifyContent: "flex-end",
                borderRadius: 15,
                paddingTop: 10,
                paddingBottom: 10,
                height: 48,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                Сохранить алгоордер
              </Text>
            </View>
          </TouchableOpacity>
        </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 0,
    paddingBottom: 20,
  },
  text: {
    color: "black",
    fontSize: 16,
  },
  object: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  tinylogo: {
    width: 25,
    height: 25,
  },
  input: {
    height: 40,
    width: "80%",
    padding: 5,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#f5f7f7",
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
    paddingTop: "3%",
  },
  notifications: {
    alignItems: "flex-start",
  },
  separator: {
    height: 1,
    backgroundColor: "#c8c8c8",
    width: "100%",
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
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
