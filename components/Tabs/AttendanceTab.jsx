import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../../constants/colors";
import { attendanceData } from "../../constants/data";
import { styles } from "../../constants/styles";

export function AttendanceTab() {
  return (
    <View style={styles.pagePad}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.h1}>Attendance</Text>
        <Text style={styles.p}>Academic Year 2025–2026</Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.h2, { marginBottom: 16 }]}>Monthly Breakdown</Text>
        {attendanceData.map(m => (
          <View key={m.month} style={{ marginBottom: 14 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
              <Text style={{ fontSize: 13, fontWeight: "700", color: COLORS.text }}>{m.month} 2025</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 10, color: COLORS.green, fontWeight: "700", marginRight: 8 }}>{m.present}P</Text>
                {m.late > 0 && <Text style={{ fontSize: 10, color: COLORS.amber, fontWeight: "700", marginRight: 8 }}>{m.late}L</Text>}
                {m.absent > 0 && <Text style={{ fontSize: 10, color: COLORS.red, fontWeight: "700" }}>{m.absent}A</Text>}
              </View>
            </View>
            <View style={{ flexDirection: "row", height: 8, borderRadius: 100, overflow: "hidden" }}>
              <View style={{ flex: m.present, backgroundColor: COLORS.green }} />
              {m.late > 0 && <View style={{ flex: m.late, backgroundColor: COLORS.amber }} /> }
              {m.absent > 0 && <View style={{ flex: m.absent, backgroundColor: COLORS.red }} />}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
