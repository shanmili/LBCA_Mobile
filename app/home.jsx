import { useEffect, useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "../components/common/LoadingScreen";
import MyRiskDetail from "../components/common/students/StudentRiskDetail";
import { UnderMaintenance } from "../components/common/under-maintenance";
import { BottomTabBar } from "../components/layout/BottomTabBar";
import { TopHeader } from "../components/layout/TopHeader";
import { AttendanceTab } from "../components/Tabs/AttendanceScreen";
import { DashboardTab } from "../components/Tabs/DashboardScreen";
import { GradesTab } from "../components/Tabs/GradesScreen";
import { NotificationsTab } from "../components/Tabs/NotificationsScreen";
import { ProfileTab } from "../components/Tabs/ProfileScreen";
import { ScheduleTab } from "../components/Tabs/ScheduleScreen";
import { notifications } from "../constants/data";
import { ProfileProvider } from "../constants/ProfileContext";
import { useTheme } from "../constants/useTheme";

function HomeScreenInner() {
  const { colors, isDarkMode } = useTheme();
  const [activeTab, setTab] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [prevTab, setPrevTab] = useState("home"); // for profile back button
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => n.unread).length,
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (t) => {
    setTab(t);
  };

  const handleNotifNavigate = (route) => {
    setTab(route);
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const handleProfilePress = () => {
    setPrevTab(activeTab);
    setTab("profile");
  };

  const renderContent = () => {
    if (activeTab === "home") {
      return (
        <DashboardTab
          unreadCount={unreadCount}
          onNotifPress={() => setTab("notif")}
          onRiskPress={() => setTab("alert")}
        />
      );
    }

    if (activeTab === "alert") {
      return <MyRiskDetail onBack={() => setTab("home")} />;
    }

    if (activeTab === "grades") return <GradesTab />;
    if (activeTab === "attend") return <AttendanceTab />;
    if (activeTab === "sched") return <ScheduleTab />;

    if (activeTab === "notif") {
      return <NotificationsTab onNavigate={handleNotifNavigate} />;
    }

    if (activeTab === "profile") {
      return <ProfileTab onBack={() => setTab(prevTab)} />;
    }

    return <UnderMaintenance />;
  };

  // These tabs manage their own scroll internally
  const selfScrolling = ["notif", "profile"].includes(activeTab);

  if (isLoading) return <LoadingScreen message="Preparing your dashboard..." />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <TopHeader onProfilePress={handleProfilePress} />
      {selfScrolling ? (
        <>{renderContent()}</>
      ) : (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>
      )}
      {/* Hide bottom tab bar when in profile screen for a focused experience */}
      {activeTab !== "profile" && (
        <BottomTabBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          unreadCount={unreadCount}
        />
      )}
    </SafeAreaView>
  );
}

export default function HomeScreen() {
  return (
    <ProfileProvider>
      <HomeScreenInner />
    </ProfileProvider>
  );
}
