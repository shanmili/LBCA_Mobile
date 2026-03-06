import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/colors";
import { gradesData, subjectColors } from "@/constants/data";
import { styles, pill, pillText, avatar, avatarText } from "@/constants/styles";

interface HomeTabProps {
  unreadCount: number;
  onNotifPress: () => void;
}

export function HomeTab({ unreadCount, onNotifPress }: HomeTabProps) {
  return (
    <View style={styles.pagePad}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 24 }}>
        <View>
          <Text style={styles.p}>Good morning 👋</Text>
          <Text style={styles.h1}>Maria Santos</Text>
          <View style={[pill(COLORS.green), { marginTop: 6 }]}>
            <Text style={pillText(COLORS.green)}>● Grade 8 – Section A</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onNotifPress}>
          <View style={avatar()}>
            <Text style={avatarText(COLORS.accent)}>🔔</Text>
          </View>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={{ fontSize: 10, fontWeight: "800", color: "#fff" }}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        {[ { label: "GWA", value: "89.8", color: COLORS.green, icon: "📈" }, { label: "Attendance", value: "96%", color: COLORS.accent, icon: "📅" }, { label: "Risk", value: "Low", color: COLORS.green, icon: "🛡️" } ].map(k => (
          <View key={k.label} style={{ flex: 1, backgroundColor: `${k.color}11`, borderWidth: 1, borderColor: `${k.color}33`, borderRadius: 18, paddingVertical: 14, alignItems: "center", marginHorizontal: 4 }}>
            <Text style={{ fontSize: 20, marginBottom: 4 }}>{k.icon}</Text>
            <Text style={{ fontSize: 18, fontWeight: "800", color: k.color }}>{k.value}</Text>
            <Text style={{ fontSize: 11, color: COLORS.muted, fontWeight: "600", marginTop: 4 }}>{k.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.card, { marginBottom: 16 }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <Text style={styles.h2}>Academic Trend</Text>
          <View style={pill(COLORS.accent)}>
            <Text style={pillText(COLORS.accent)}>Q1 – Q3</Text>
          </View>
        </View>
        {gradesData.slice(0, 4).map(s => {
          const avg = Math.round((s.q1 + s.q2 + s.q3) / 3);
          const color = subjectColors[s.subject] || COLORS.accent;
          return (
            <View key={s.subject} style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ fontSize: 12, color: COLORS.muted, fontWeight: "600" }}>{s.subject}</Text>
                <Text style={{ fontSize: 12, fontWeight: "800", color }}>{avg}</Text>
              </View>
              <View style={{ height: 6, backgroundColor: COLORS.cardLight, borderRadius: 100, overflow: "hidden" }}>
                <View style={{ height: "100%", width: `${avg}%`, backgroundColor: color, borderRadius: 100 }} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
