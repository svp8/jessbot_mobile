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
  var test1 = "a1";
  var test2 = [];

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
    if (phone.length > 2) {
      setStatePass(true);

      if(pasState!=true){
          logApi();}
      setButtonText("Войти");
    }
// Вход для теста
    if (password == 1) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {name: 'Details',
            params: { phone: phone, token: "eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhDQkMtSFMyNTYifQ.EWGA84Y_LfE1-zIA1foijerLIezeTQ6gSQeN09hCuZFgf8YXQ1prVjsDJ4Wbfz_HtIoFjT-2M_qf890CJA6mBr6wxISlZzr4DDPaOuV1lwbZfoPSlMoDKX83_INMXrkxjckD39slVW_ZWneniX_ksf1-FUxwi6bSyXtvLeI_fvFDZR0rDA67Yniq-ze2ipQXoAmpXvAXShdCR_EgMmq2ykBB6-LhsBEB2ZHQ-vokWXrKepaVE83hJeFSsSD1ulPAlPv6V8OxnYbtlUSzP5GX-ZCWW26BSITTSgDoqu4nOB2o7Mm8vnTJSxpTcK-RdCCo9fL_LaGyDq2QH9oUajpgYA.Jg1HOfhczNSHT-ilmPCyqg.sDw-DqghR9yJ0twB4Hj9eZRzKGVi1E-VBDItAJKgVo3bcI_ybFF4kKVFSAJBp-HxAHMOUKGWTswexteIfZoyQbIcZYUQbf_oNPiIcvSsXNbNKwg_3OYJ59IYEh2dPKXu.jLjq9PmCDe8sikdnbl8HOw"},
          },

          ],
        }),
      );
      // navigation.navigate("Details", { phone: phone, token: "aaa" });
      setStatePass(false);
    } else if (password != "" && pasState == true) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "kekkonen.mode": "invoke",
        },
        body: JSON.stringify({ code: password, phone: phone }),
      };
      fetch("https://staging.jess-bot.ru/auth/sign-in", requestOptions)
        .then((response) => response.json())
        .then((data4) => setData(data4))
        .then(() => setLoading(false));
      console.log(isLoading);

      if (!isLoading) {
        if (data.token != null) {
          var token = data.token;
          
          alert("Вы вошли");
          // Переход в меню (и очищение стэка окон(это сломалось)) (при нажатии кнопки назад из меню вы выходите из окна)
          navigation.navigate("Details", { phone: phone, token: token }); 
        } else {
          
          alert(data.status);
        }
      }
      
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
  },
});
export default LoginScreen;
