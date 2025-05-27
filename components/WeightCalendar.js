import React from "react";
import { Calendar } from "react-native-calendars";

export default function WeightCalendar({ data }) {
  const markedDates = {};

  data.forEach((item) => {
    if (!item?.date?.seconds) return; // ⛔ 잘못된 날짜 방지
    const dateStr = new Date(item.date.seconds * 1000)
      .toISOString()
      .split("T")[0];
    markedDates[dateStr] = {
      marked: true,
      dotColor: "blue",
      customStyles: {
        container: { backgroundColor: "#fdcb6e" },
        text: { color: "black", fontWeight: "bold" },
      },
    };
  });

  return (
    <Calendar
      markedDates={markedDates}
      markingType={"custom"}
      style={{ marginVertical: 10 }}
    />
  );
}
