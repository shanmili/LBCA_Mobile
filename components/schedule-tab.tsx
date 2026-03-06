import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/colors";
import { schedule, subjectColors } from "@/constants/data";
import { styles, pill, pillText } from "@/constants/styles";

export function ScheduleTab() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <View style={styles.pagePad}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.h1}>Schedule</Text>
        <Text style={styles.p}>Grade 8 – Section A</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {schedule.map((d, i) => (
          <TouchableOpacity key={d.day} onPress={() => setActiveDay(i)} style={{ paddingVertical: 8, paddingHorizontal: 18, borderRadius: 100, backgroundColor: activeDay === i ? COLORS.accent : COLORS.card, borderWidth: 1, borderColor: activeDay === i ? COLORS.accent : COLORS.border, marginRight: 8 }}>
            <Text style={{ color: activeDay === i ? "#0F172A" : COLORS.muted, fontSize: 13, fontWeight: "700" }}>{d.day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {schedule[activeDay].periods.map((p, i) => {
        const color = subjectColors[p.subject] || COLORS.accent;
        const isNow = i === 1;
        return (
          <View key={i} style={{ flexDirection: "row", marginBottom: 12 }}>
            <View style={{ width: 50, alignItems: "flex-end", paddingTop: 14, marginRight: 14 }}>
              <Text style={{ fontSize: 12, fontWeight: "700", color: isNow ? COLORS.accent : COLORS.muted }}>{p.time}</Text>
            </View>
            <View style={{ width: 3, borderRadius: 3, backgroundColor: color, marginRight: 14 }} />
            <View style={{ flex: 1, backgroundColor: isNow ? `${color}22` : COLORS.card, borderWidth: 1, borderColor: isNow ? color : COLORS.border, borderRadius: 16, padding: 14 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: COLORS.text }}>{p.subject}</Text>
              <View style={{ flexDirection: "row", marginTop: 6 }}>
                <Text style={{ fontSize: 12, color: COLORS.muted, marginRight: 12 }}>🚪 {p.room}</Text>
                <Text style={{ fontSize: 12, color: COLORS.muted }}>👤 {p.teacher}</Text>
              </View>
              {isNow && <View style={[pill(color), { marginTop: 10 }]}><Text style={pillText(color)}>● Now</Text></View>}
            </View>
          </View>
        );
      })}
    </View>
  );
}
