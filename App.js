import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import WeightChart from "./components/WeightChart";
import WeightCalendar from "./components/WeightCalendar";
import WeightList from "./components/WeightList"; // ✅ 경로 수정!

export default function App() {
  const [weight, setWeight] = useState("");
  const [weights, setWeights] = useState([]);

  const handleAdd = async () => {
    if (!weight) return;
    await addDoc(collection(db, "weights"), {
      weight: parseFloat(weight),
      date: new Date(),
    });
    setWeight("");
  };

  useEffect(() => {
    const q = query(collection(db, "weights"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWeights(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🐥 Weight Tracker</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter today’s weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <Button title="Save" onPress={handleAdd} />

      <WeightCalendar data={weights} />
      <WeightChart data={weights.slice().reverse()} />
      <WeightList data={weights} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
