import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
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
        <Ionicons
          name={isDarkMode ? "moon" : "sunny"}
          size={12}
          color={isDarkMode ? colors.accent : "#F59E0B"}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Theme;
