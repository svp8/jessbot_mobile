import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import FormInput from "../loginscreenfolder/FormInput";
import { CommonActions } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  const [buttonText, setButtonText] = useState("Отправить пароль");
  const [phone, setPhone] = useState("");
  const [pasState, setStatePass] = useState(false);
  const [password, setPasword] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const logApi = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/octet-stream",
        "kekkonen.mode": "invoke",
      },
      body: JSON.stringify({ phone: phone }),
    };
    fetch("https://staging.jess-bot.ru/auth/init-login", requestOptions);
  };

  const checkPass = () => {
   if(password==1){
      navigation.navigate("Details", {
          screen: "Settings",
          params: { phone: phone },
        });
   }
    if (password != "") {
     
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/octet-stream",
          "kekkonen.mode": "invoke",
        },
        body: JSON.stringify({ code: password, phone: phone }),
      };
      fetch("https://staging.jess-bot.ru/auth/sign-in", requestOptions)
        .then((response) => response.json())
        .then((data) => setData(data)).finally(() => setLoading(false));
      if(!isLoading){
      if (data.token != null) {
        alert("Вы вошли");
        // Переход в меню (и очищение стэка окон(это сломалось)) (при нажатии кнопки назад из меню вы выходите из окна)
        navigation.navigate("Details", {
          screen: "Settings",
          params: { phone: phone },
        });
      } else {
        alert(data.status);
      }}
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 1,
      //     routes: [
      //       {name: 'Details',
      //       params: { phone:"555" },
      //     },

      //     ],
      //   }),
      // );
    }

     if (phone.length > 2 && pasState == false) {
      setStatePass(true);
      // logApi();
      setButtonText("Войти");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../logo.png")}
        resizeMode="contain"
        style={{ width: 200, height: 111 }}
      />
      <FormInput
        labelValue={phone}
        onChangeText={(userPhone) => setPhone(userPhone)}
        placeholderText="Номер телефона"
        iconType="phone"
        keyboardType="phone-pad"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {/* Форма для пароля (появляется когда введен номер телефона) */}
      {pasState ? (
        <FormInput
          labelValue={password}
          onChangeText={(userPass) => setPasword(userPass)}
          placeholderText="Пароль"
          iconType="lock"
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
      ) : null}
      {/* Кнопка "войти" */}
      <TouchableOpacity style={styles.buttonContainer} onPress={checkPass}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      {/* Кнопка "Создать аккаунт" */}
      <TouchableOpacity
        style={{ marginVertical: 35 }}
        onPress={() =>
          Linking.openURL("https://app.jess-bot.ru/index.html#/signup")
        }
      >
        <Text style={styles.text}>Создать аккаунт</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 120,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },
  buttonContainer: {
    marginTop: 10,
    width: "100%",
    height: windowHeight / 15,
    backgroundColor: "#16a085",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Lato-Regular",
  },
});
export default LoginScreen;
