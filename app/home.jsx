import React, { useState, useEffect } from "react";
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
import { DashboardTab } from "../components/Tabs/DashboardScreen";
import LoadingScreen from "../components/common/LoadingScreen";
import MyRiskDetail from "../components/common/students/StudentRiskDetail";

export default function HomeScreen() {
  const { colors, isDarkMode } = useTheme();
  const [activeTab, setTab] = useState("home");
  const [showEarlyWarning, setShowEarlyWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (t) => {
    setTab(t);
    setShowEarlyWarning(false);
  };

  const renderContent = () => {
    if (activeTab === "home") {
      if (showEarlyWarning) {
        return <MyRiskDetail onBack={() => setShowEarlyWarning(false)} />;
      }
      return (
        <DashboardTab
          unreadCount={unreadCount}
          onNotifPress={() => setTab("notif")}
          onRiskPress={() => setShowEarlyWarning(true)}
        />
      );
    }
    return <UnderMaintenance />;
  };

  if (isLoading) return <LoadingScreen message="Preparing your dashboard..." />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <TopHeader />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} unreadCount={unreadCount} />
    </SafeAreaView>
  );
}
