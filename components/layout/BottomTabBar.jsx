import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "../../constants/useTheme";

const tabs = [
  { key: "home", icon: "⊞", label: "Home" },
  { key: "grades", icon: "📊", label: "Grades" },
  { key: "attend", icon: "📅", label: "Attendance" },
  { key: "notif", icon: "🔔", label: "Alerts" },
  { key: "msg", icon: "💬", label: "Messages" },
  { key: "sched", icon: "🗓️", label: "Schedule" },
];

export function BottomTabBar({ activeTab, onTabChange, unreadCount = 0 }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: 12, paddingBottom: Platform.OS === 'ios' ? 24 : 12, borderTopWidth: 1, borderColor: colors.border, backgroundColor: colors.card }}>
      {tabs.map(t => (
        <TouchableOpacity key={t.key} onPress={() => onTabChange(t.key)} style={{ alignItems: "center", padding: 8 }}>
          <View>
            <Text style={{ fontSize: 20, color: activeTab === t.key ? colors.accent : colors.muted, opacity: activeTab === t.key ? 1 : 0.6 }}>{t.icon}</Text>
            {t.key === "notif" && unreadCount > 0 && (
              <View style={{ position: "absolute", top: -6, right: -10, backgroundColor: colors.red, borderRadius: 8, minWidth: 16, height: 16, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.card }}>
                <Text style={{ fontSize: 9, fontWeight: "800", color: "#fff" }}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <Text style={{ fontSize: 10, fontWeight: "600", color: activeTab === t.key ? colors.accent : colors.muted, marginTop: 4 }}>{t.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
