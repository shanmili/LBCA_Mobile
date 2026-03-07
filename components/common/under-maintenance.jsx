import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { useTheme } from "../../constants/useTheme";

export function UnderMaintenance() {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        marginTop: 80,
      }}
    >
      <Ionicons
        name="construct"
        size={64}
        color={colors.muted}
        style={{ marginBottom: 20 }}
      />
      <Text
        style={{
          fontSize: 22,
          fontWeight: "800",
          color: colors.text,
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        Under Maintenance
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: colors.muted,
          textAlign: "center",
          lineHeight: 22,
        }}
      >
        This feature is currently unavailable. We're working on it and it will
        be back soon.
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: `${colors.amber}22`,
          borderRadius: 100,
          paddingVertical: 4,
          paddingHorizontal: 10,
          alignSelf: "flex-start",
          marginTop: 20,
          gap: 4,
        }}
      >
        <Ionicons name="warning" size={11} color={colors.amber} />
        <Text style={{ color: colors.amber, fontSize: 11, fontWeight: "700" }}>
          Coming Soon
        </Text>
      </View>
    </View>
  );
}
