import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // ✅ Update if your config file is named differently

export default function WeightList({ data }) {
  // 🗑️ Handle deletion of a weight entry
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "weights", id));
      console.log("✅ Deleted:", id);
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  // 🔄 Render each weight item with delete button
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>
        📅{" "}
        {item.date?.seconds
          ? new Date(item.date.seconds * 1000).toLocaleDateString()
          : "Invalid date"}{" "}
        - ⚖️ {item.weight} kg
      </Text>
      <Button title="🗑️ Delete" onPress={() => handleDelete(item.id)} />
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fffbe6",
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});
