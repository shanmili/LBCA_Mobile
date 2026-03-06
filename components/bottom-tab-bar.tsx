import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { COLORS } from "@/constants/colors";

const tabs = [
  { key: "home", icon: "⊞", label: "Home" },
  { key: "grades", icon: "📊", label: "Grades" },
  { key: "attend", icon: "📅", label: "Attendance" },
  { key: "notif", icon: "🔔", label: "Alerts" },
  { key: "msg", icon: "💬", label: "Messages" },
  { key: "sched", icon: "🗓️", label: "Schedule" },
];

interface BottomTabBarProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  unreadCount?: number;
}

export function BottomTabBar({ activeTab, onTabChange, unreadCount = 0 }: BottomTabBarProps) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", paddingVertical: 12, paddingBottom: Platform.OS === 'ios' ? 24 : 12, borderTopWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.card }}>
      {tabs.map(t => (
        <TouchableOpacity key={t.key} onPress={() => onTabChange(t.key)} style={{ alignItems: "center", padding: 8 }}>
          <View>
            <Text style={{ fontSize: 20, color: activeTab === t.key ? COLORS.accent : COLORS.muted, opacity: activeTab === t.key ? 1 : 0.6 }}>{t.icon}</Text>
            {t.key === "notif" && unreadCount > 0 && (
              <View style={{ position: "absolute", top: -6, right: -10, backgroundColor: COLORS.red, borderRadius: 8, minWidth: 16, height: 16, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.card }}>
                <Text style={{ fontSize: 9, fontWeight: "800", color: "#fff" }}>{unreadCount}</Text>
              </View>
            )}
          </View>
          <Text style={{ fontSize: 10, fontWeight: "600", color: activeTab === t.key ? COLORS.accent : COLORS.muted, marginTop: 4 }}>{t.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
