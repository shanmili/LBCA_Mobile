import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../constants/useTheme";
import { notifications } from "../constants/data";
import { TopHeader } from "../components/layout/TopHeader";
import { BottomTabBar } from "../components/layout/BottomTabBar";
import { UnderMaintenance } from "../components/common/under-maintenance";

export default function HomeScreen() {
  const { colors, isDarkMode } = useTheme();
  const [activeTab, setTab] = useState("home");
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleTabChange = (t) => { setTab(t); };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <TopHeader />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <UnderMaintenance />
      </ScrollView>
      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} unreadCount={unreadCount} />
    </SafeAreaView>
  );
}
