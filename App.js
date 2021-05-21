import { StatusBar } from "expo-status-bar";

import { Navbar } from "./src/Navbar";
import { Content } from "./src/Content";
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
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
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
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Settings" component={Content} />

    </Drawer.Navigator>
    
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        
        title="Go to notifications"
      />
    </View>
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
