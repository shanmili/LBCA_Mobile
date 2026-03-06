import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import { notifications } from "@/constants/data";
import { TopHeader } from "@/components/top-header";
import { BottomTabBar } from "@/components/bottom-tab-bar";
import { UnderMaintenance } from "@/components/under-maintenance";

export default function HomeScreen() {
  const [activeTab, setTab] = useState("home");
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleTabChange = (t: string) => { setTab(t); };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <TopHeader />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <UnderMaintenance />
      </ScrollView>
      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} unreadCount={unreadCount} />
    </SafeAreaView>
  );
}
