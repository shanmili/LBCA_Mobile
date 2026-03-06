import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "@/constants/colors";

export function UnderMaintenance() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 40, marginTop: 80 }}>
      <Text style={{ fontSize: 64, marginBottom: 20 }}>🔧</Text>
      <Text style={{ fontSize: 22, fontWeight: "800", color: COLORS.text, textAlign: "center", marginBottom: 12 }}>Under Maintenance</Text>
      <Text style={{ fontSize: 14, color: COLORS.muted, textAlign: "center", lineHeight: 22 }}>
        This feature is currently unavailable. We're working on it and it will be back soon.
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: `${COLORS.amber}22`, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 10, alignSelf: "flex-start", marginTop: 20 }}>
        <Text style={{ color: COLORS.amber, fontSize: 11, fontWeight: "700" }}>⚠ Coming Soon</Text>
      </View>
    </View>
  );
}
