import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import { COLORS } from "@/constants/colors";

export default function LoginScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgDark, justifyContent: "center", padding: 32 }}>
      <StatusBar barStyle="light-content" />
      <View style={{ alignItems: "center", marginBottom: 48 }}>
        <View style={{ width: 72, height: 72, borderRadius: 20, backgroundColor: COLORS.accent, alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 32 }}>🎓</Text>
        </View>
        <Text style={{ fontSize: 26, fontWeight: "800", color: COLORS.text }}>LBCA Monitor</Text>
        <Text style={{ color: COLORS.muted, fontSize: 13 }}>Lapasan Baptist Christian Academy</Text>
      </View>

      <View>
        <View style={{ marginBottom: 14 }}>
          <Text style={{ fontSize: 12, fontWeight: "700", color: COLORS.muted, marginBottom: 6 }}>EMAIL</Text>
          <View style={{ backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, padding: 16 }}>
            <Text style={{ color: COLORS.text, fontSize: 15 }}>parent@example.com</Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: "700", color: COLORS.muted, marginBottom: 6 }}>PASSWORD</Text>
          <View style={{ backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: 14, padding: 16 }}>
            <Text style={{ color: COLORS.muted, fontSize: 15 }}>••••••••</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => router.replace("/home")} style={{ backgroundColor: COLORS.accent, borderRadius: 16, padding: 16, alignItems: "center" }}>
          <Text style={{ color: "#0F172A", fontSize: 16, fontWeight: "800" }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
