import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../../constants/useTheme";

const Theme = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.7}
      style={{
        width: 48,
        height: 26,
        borderRadius: 13,
        backgroundColor: isDarkMode ? colors.accent : "#CBD5E1",
        justifyContent: "center",
        paddingHorizontal: 3,
        marginLeft: "auto",
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: isDarkMode ? "flex-end" : "flex-start",
        }}
      >
        <Text style={{ fontSize: 10 }}>{isDarkMode ? "🌙" : "☀️"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Theme;