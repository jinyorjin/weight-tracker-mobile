import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function WeightChart({ data }) {
  // ⛔ 비정상 데이터 방지용 함수
  const parseSafeFloat = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num) && num > 0 ? num : null;
  };

  // ✅ 안전하게 필터링
  const validData = (Array.isArray(data) ? data : []).filter((item) => {
    const weight = parseSafeFloat(item?.weight);
    return item?.date?.seconds && weight !== null;
  });

  if (validData.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <LineChart
          data={{
            labels: ["No", "Data"],
            datasets: [{ data: [0, 0] }],
          }}
          width={Dimensions.get("window").width - 32}
          height={220}
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#eee",
            backgroundGradientTo: "#ddd",
            color: () => `rgba(0,0,0,0.5)`,
            decimalPlaces: 1,
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
      </View>
    );
  }

  const chartData = {
    labels: validData.map((item) =>
      new Date(item.date.seconds * 1000).toLocaleDateString().slice(5)
    ),
    datasets: [
      {
        data: validData.map((item) => parseSafeFloat(item.weight)),
      },
    ],
  };

  return (
    <View>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 32}
        height={220}
        yAxisSuffix="kg"
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffeaa7",
          backgroundGradientTo: "#fdcb6e",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{ borderRadius: 16, marginVertical: 8 }}
      />
    </View>
  );
}
