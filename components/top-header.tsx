import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "@/constants/colors";

export function TopHeader() {
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Text style={{ fontSize: 13, fontWeight: "800", color: COLORS.accent, letterSpacing: 1 }}>LBCA MONITOR</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 12, color: COLORS.muted, marginRight: 8 }}>S.Y. 2025–26</Text>
        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.accent, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 10, fontWeight: "800", color: "#0F172A" }}>MS</Text>
        </View>
      </View>
    </View>
  );
}
