import { StatusBar } from "expo-status-bar";

import { Navbar } from "./src/Navbar";
import { Content } from "./src/Content";
import { AlgoListSimulator } from "./src/AlgoListSimulator";
import { Simulator } from "./src/Simulator";
import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Button, TextInput } from "react-native";
import LoginScreen from "./loginscreenfolder/LoginScreen";
import FormInput from "./loginscreenfolder/FormInput";

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();
export default function App() {
  const [phone, setPhone] = useState("");
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Simulator"
          component={Simulator}
          options={{ title: "Создать Алго" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Drawer = createDrawerNavigator();
function DetailsScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="N"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Drawer.Screen name="Settings" component={Content} options={{ title: "Настройки" }} />

      <Drawer.Screen
        name="Algo List (Simulator)"
        component={AlgoListSimulator}
        options={{ title: "Симулятор" }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "lightcyan",
  },
  text: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
  },
  button: {
    padding: 100,
  },
});
