import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { schedule, subjectColors } from "../../constants/data";
import { pill, pillText } from "../../constants/styles";
import { useTheme } from "../../constants/useTheme";

export function ScheduleTab() {
  const { colors } = useTheme();
  const [activeDay, setActiveDay] = useState(0);

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: colors.text, marginBottom: 4 }}>Schedule</Text>
        <Text style={{ color: colors.muted, fontSize: 13 }}>Grade 8 – Section A</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {schedule.map((d, i) => (
          <TouchableOpacity
            key={d.day}
            onPress={() => setActiveDay(i)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 18,
              borderRadius: 100,
              backgroundColor: activeDay === i ? colors.accent : colors.card,
              borderWidth: 1,
              borderColor: activeDay === i ? colors.accent : colors.border,
              marginRight: 8,
            }}
          >
            <Text
              style={{
                color: activeDay === i ? colors.bg : colors.muted,
                fontSize: 13,
                fontWeight: "700",
              }}
            >
              {d.day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {schedule[activeDay].periods.map((p, i) => {
        const color = subjectColors[p.subject] || colors.accent;
        const isNow = i === 1;
        return (
          <View key={i} style={{ flexDirection: "row", marginBottom: 12 }}>
            <View
              style={{
                width: 50,
                alignItems: "flex-end",
                paddingTop: 14,
                marginRight: 14,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: isNow ? colors.accent : colors.muted,
                }}
              >
                {p.time}
              </Text>
            </View>
            <View
              style={{
                width: 3,
                borderRadius: 3,
                backgroundColor: color,
                marginRight: 14,
              }}
            />
            <View
              style={{
                flex: 1,
                backgroundColor: isNow ? `${color}22` : colors.card,
                borderWidth: 1,
                borderColor: isNow ? color : colors.border,
                borderRadius: 16,
                padding: 14,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "700", color: colors.text }}
              >
                {p.subject}
              </Text>
              <View style={{ flexDirection: "row", marginTop: 6 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <Ionicons
                    name="location-outline"
                    size={12}
                    color={colors.muted}
                    style={{ marginRight: 3 }}
                  />
                  <Text style={{ fontSize: 12, color: colors.muted }}>
                    {p.room}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="person-outline"
                    size={12}
                    color={colors.muted}
                    style={{ marginRight: 3 }}
                  />
                  <Text style={{ fontSize: 12, color: colors.muted }}>
                    {p.teacher}
                  </Text>
                </View>
              </View>
              {isNow && (
                <View style={[pill(color), { marginTop: 10 }]}>
                  <Text style={pillText(color)}>● Now</Text>
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}
