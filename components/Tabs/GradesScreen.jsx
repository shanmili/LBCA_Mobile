import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/colors";
import { gradesData, subjectColors, getGradeColor } from "../../constants/data";
import { styles, pill, pillText } from "../../constants/styles";

export function GradesTab() {
  return (
    <View style={styles.pagePad}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.h1}>Grades</Text>
        <Text style={styles.p}>School Year 2025–2026</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
        {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
          <TouchableOpacity key={q} style={{ paddingVertical: 8, paddingHorizontal: 18, borderRadius: 100, backgroundColor: i === 2 ? COLORS.accent : COLORS.card, borderWidth: 1, borderColor: i === 2 ? COLORS.accent : COLORS.border, marginRight: 8 }}>
            <Text style={{ color: i === 2 ? "#0F172A" : COLORS.muted, fontSize: 13, fontWeight: "700" }}>{q} {i === 3 ? "🔒" : ""}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {gradesData.map((s, idx) => {
        const q = s.q3;
        const color = subjectColors[s.subject] || COLORS.accent;
        return (
          <View key={s.subject} style={[styles.card, { marginBottom: 10, flexDirection: "row", alignItems: "center" }]}>
            <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: `${color}22`, alignItems: "center", justifyContent: "center", marginRight: 14 }}>
              <Text style={{ fontSize: 20 }}>{["📐","📖","🔬","🇵🇭","🌏","🎵"][idx]}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "700", color: COLORS.text }}>{s.subject}</Text>
              <Text style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{s.teacher}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 22, fontWeight: "800", color: getGradeColor(q), marginBottom: 4 }}>{q}</Text>
              <View style={pill(getGradeColor(q))}>
                <Text style={pillText(getGradeColor(q))}>{q >= 90 ? "Outstanding" : "Good"}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
