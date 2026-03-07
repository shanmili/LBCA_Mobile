import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../constants/useTheme";

export default function LoginScreen() {
  const { colors, isDarkMode } = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bgDark,
        justifyContent: "center",
        padding: 32,
      }}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={{ alignItems: "center", marginBottom: 48 }}>
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            backgroundColor: colors.accent,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons name="school" size={32} color="#0F172A" />
        </View>
        <Text style={{ fontSize: 26, fontWeight: "800", color: colors.text }}>
          LBCA Monitor
        </Text>
        <Text style={{ color: colors.muted, fontSize: 13 }}>
          Lapasan Baptist Christian Academy
        </Text>
      </View>

      <View>
        <View style={{ marginBottom: 14 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: colors.muted,
              marginBottom: 6,
            }}
          >
            EMAIL
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 14,
              padding: 16,
            }}
          >
            <Text style={{ color: colors.text, fontSize: 15 }}>
              parent@example.com
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: colors.muted,
              marginBottom: 6,
            }}
          >
            PASSWORD
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 14,
              padding: 16,
            }}
          >
            <Text style={{ color: colors.muted, fontSize: 15 }}>••••••••</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.replace("/home")}
          style={{
            backgroundColor: colors.accent,
            borderRadius: 16,
            padding: 16,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#0F172A", fontSize: 16, fontWeight: "800" }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
