import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import FormInput from '../LoginScreenFolder/FormInput';
import {CommonActions} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const [buttonText, setButtonText] = useState('Отправить пароль');
  const [phone, setPhone] = useState('');
  const [pasState, setStatePass] = useState(false);
  const [password, setPasword] = useState();
  // кнопка Войти
  // const resetAction = StackActions.reset({
  //   actions: [NavigationActions.navigate({routeName: 'Details'})],
  // });
  const checkPass = () => {
    if (password == 1) {
      alert('You tapped the button!');
      // Переход в меню и очищение стэка окон (при нажатии кнопки назад из меню вы выходите из окна)
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'Details',
            },
          ],
        }),
      );
    }

    if (phone.length > 2) {
      setStatePass(true);
      setButtonText('Войти');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../logo.png')}
        resizeMode="contain"
        style={{width: 200, height: 111}}
      />
      <FormInput
        labelValue={phone}
        onChangeText={userPhone => setPhone(userPhone)}
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
          onChangeText={userPass => setPasword(userPass)}
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
        style={{marginVertical: 35}}
        onPress={() =>
          Linking.openURL('https://app.jess-bot.ru/index.html#/signup')
        }>
        <Text style={styles.text}>Создать аккаунт</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 120,
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    backgroundColor: 'cyan',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Lato-Regular',
  },
});
export default LoginScreen;
