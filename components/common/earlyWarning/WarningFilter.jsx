import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../../../constants/useTheme";

const riskLevels = [
  { key: "all", label: "All" },
  { key: "critical", label: "Critical" },
  { key: "high", label: "High" },
  { key: "moderate", label: "Moderate" },
  { key: "low", label: "Low" },
];

const WarningFilter = ({ filters, onFilterChange }) => {
  const { colors } = useTheme();

  return (
    <View style={{ marginBottom: 14 }}>
      {/* Search */}
      <TextInput
        style={{
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          paddingHorizontal: 14,
          paddingVertical: 10,
          color: colors.text,
          fontSize: 13,
          marginBottom: 10,
        }}
        placeholder="Search student, subject, grade..."
        placeholderTextColor={colors.muted}
        value={filters.search}
        onChangeText={(val) => onFilterChange("search", val)}
      />

      {/* Risk level pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {riskLevels.map((r) => {
            const active = filters.riskLevel === r.key;
            return (
              <TouchableOpacity
                key={r.key}
                onPress={() => onFilterChange("riskLevel", r.key)}
                activeOpacity={0.7}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  borderRadius: 20,
                  backgroundColor: active ? colors.accent : colors.card,
                  borderWidth: 1,
                  borderColor: active ? colors.accent : colors.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: active ? "#0F172A" : colors.muted,
                  }}
                >
                  {r.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default WarningFilter;
