import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Button, TextInput} from 'react-native';
import LoginScreen from './LoginScreenFolder/LoginScreen';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const EnApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Home"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const Drawer = createDrawerNavigator();
function DetailsScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="N"
      screenOptions={{
        headerShown: true,
      }}>
      <Drawer.Screen name="Settings" component={HomeScreen} />
      <Drawer.Screen name="N" component={NotificationsScreen} />
    </Drawer.Navigator>
    // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    //   <Text>Details Screen</Text>
    // </View>
  );
}
function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('N')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'lightcyan',
  },
  text: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    padding: 100,
  },
});
export default EnApp;
