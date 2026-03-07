import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../constants/useTheme";
import Theme from "../common/Theme";

export function TopHeader({
  userRole = "admin",
  adminPhoto = null,
  onLogout,
  onNavigate,
}) {
  const { colors } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogout = () => {
    closeDropdown();
    if (onLogout) {
      onLogout();
    } else {
      router.replace("/login");
    }
  };

  const handleProfile = () => {
    closeDropdown();
    if (onNavigate) onNavigate("account-settings");
  };

  const userName = userRole === "admin" ? "Admin User" : "Teacher User";
  const userRoleLabel = userRole === "admin" ? "Administrator" : "Teacher";
  const avatarInitials = userRole === "admin" ? "AD" : "TC";

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: "800",
          color: colors.accent,
          letterSpacing: 1,
        }}
      >
        LBCA MONITOR
      </Text>

      {/* User Profile Container */}
      <TouchableOpacity
        onPress={toggleDropdown}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Text style={{ fontSize: 12, color: colors.muted, marginRight: 8 }}>
          S.Y. 2025–26
        </Text>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.accent,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {adminPhoto ? (
            <Image
              source={{ uri: adminPhoto }}
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
          ) : (
            <Text style={{ fontSize: 11, fontWeight: "800", color: "#0F172A" }}>
              {avatarInitials}
            </Text>
          )}
        </View>
        <Ionicons
          name={isDropdownOpen ? "chevron-up" : "chevron-down"}
          size={10}
          color={colors.muted}
          style={{ marginLeft: 4 }}
        />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      <Modal
        visible={isDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <Pressable onPress={closeDropdown} style={{ flex: 1 }}>
          <View
            style={{
              position: "absolute",
              top: 56,
              right: 16,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 14,
              width: 220,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            {/* Header */}
            <View
              style={{
                padding: 14,
                borderBottomWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ fontSize: 12, color: colors.muted }}>
                Signed in as{" "}
                <Text style={{ fontWeight: "700", color: colors.text }}>
                  {userName}
                </Text>
              </Text>
              <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2 }}>
                {userRoleLabel}
              </Text>
            </View>

            {/* Profile */}
            <TouchableOpacity
              onPress={handleProfile}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
              }}
            >
              <Ionicons
                name="person"
                size={16}
                color={colors.text}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 13, fontWeight: "600", color: colors.text }}
              >
                Profile
              </Text>
            </TouchableOpacity>

            {/* Theme */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 14,
                paddingVertical: 12,
              }}
            >
              <Ionicons
                name="sunny"
                size={16}
                color={colors.text}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 13, fontWeight: "600", color: colors.text }}
              >
                Theme
              </Text>
              <Theme />
            </View>

            {/* Separator */}
            <View style={{ height: 1, backgroundColor: colors.border }} />

            {/* Log Out */}
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
              }}
            >
              <Ionicons
                name="log-out-outline"
                size={16}
                color={colors.red}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{ fontSize: 13, fontWeight: "600", color: colors.red }}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
