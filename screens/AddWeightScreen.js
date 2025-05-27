// screens/AddWeightScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import styles from "../styles/addWeightStyles";

export default function AddWeightScreen({ navigation }) {
  const [weight, setWeight] = useState("");

  const handleSave = () => {
    const today = new Date().toISOString().slice(0, 10);
    const parsedWeight = parseFloat(weight);

    if (!parsedWeight || parsedWeight <= 0) {
      Alert.alert("❌ Invalid", "Please enter a valid weight (kg)");
      return;
    }

    console.log("✅ Saved:", {
      date: today,
      weight: parsedWeight,
    });

    Alert.alert("✅ Saved!", `Date: ${today}\nWeight: ${parsedWeight} kg`);
    setWeight("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your weight (kg):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 55.5"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <Button title="💾 Save" onPress={handleSave} />
    </View>
  );
}
