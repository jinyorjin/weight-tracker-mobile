// screens/HomeScreen.js
import React from "react";
import { Button, Image, Text, View } from "react-native";
import styles from "../styles/homeStyles";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/chick.png")} style={styles.image} />
      <Text style={styles.title}>🐥 Welcome to Weight Tracker</Text>
      <Button
        title="➕ Add Today's Weight"
        onPress={() => navigation.navigate("Add")}
      />
      <Button
        title="📋 View History"
        onPress={() => navigation.navigate("WeightList")}
      />
    </View>
  );
}
