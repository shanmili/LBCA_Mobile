import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../constants/useTheme";

export function StatCard({
  title,
  value,
  icon,
  color,
  trend,
  subtext,
  onPress,
}) {
  const { colors } = useTheme();

  const Container = onPress ? TouchableOpacity : View;
  const containerProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

  return (
    <Container
      {...containerProps}
      style={{
        flex: 1,
        backgroundColor: `${color}11`,
        borderWidth: 1,
        borderColor: `${color}33`,
        borderRadius: 18,
        paddingVertical: 14,
        alignItems: "center",
        marginHorizontal: 4,
      }}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={color}
          style={{ marginBottom: 4 }}
        />
      )}
      <Text style={{ fontSize: 18, fontWeight: "800", color }}>{value}</Text>
      <Text
        style={{
          fontSize: 11,
          color: colors.muted,
          fontWeight: "600",
          marginTop: 4,
        }}
      >
        {title}
      </Text>
      {(trend || subtext) && (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
        >
          {trend && (
            <Ionicons
              name={trend === "up" ? "arrow-up" : "arrow-down"}
              size={11}
              color={trend === "up" ? colors.green : colors.red}
              style={{ marginRight: 4 }}
            />
          )}
          {subtext && (
            <Text style={{ fontSize: 10, color: colors.muted }}>{subtext}</Text>
          )}
        </View>
      )}
    </Container>
  );
}
