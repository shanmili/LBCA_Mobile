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
import { ScheduleTab } from "../components/Tabs/ScheduleScreen";
import { notifications } from "../constants/data";
import { useTheme } from "../constants/useTheme";

export default function HomeScreen() {
  const { colors, isDarkMode } = useTheme();
  const [activeTab, setTab] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
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

  // Called from NotificationsTab when user taps a routable notification
  const handleNotifNavigate = (route) => {
    setTab(route);
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const renderContent = () => {
    // Home tab
    if (activeTab === "home") {
      return (
        <DashboardTab
          unreadCount={unreadCount}
          onNotifPress={() => setTab("notif")}
          onRiskPress={() => setTab("alert")}
        />
      );
    }

    // Alerts tab — Early Warning / Risk Detail (independent, unchanged)
    if (activeTab === "alert") {
      return <MyRiskDetail onBack={() => setTab("home")} />;
    }

    // Grades tab
    if (activeTab === "grades") return <GradesTab />;

    // Attendance tab
    if (activeTab === "attend") return <AttendanceTab />;

    // Notifications tab (replaces Messages)
    if (activeTab === "notif") {
      return <NotificationsTab onNavigate={handleNotifNavigate} />;
    }

    // Schedule tab
    if (activeTab === "sched") return <ScheduleTab />;

    return <UnderMaintenance />;
  };

  // NotificationsTab manages its own scroll internally
  const needsScrollWrapper = activeTab !== "notif";

  if (isLoading) return <LoadingScreen message="Preparing your dashboard..." />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <TopHeader />
      {needsScrollWrapper ? (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {renderContent()}
        </ScrollView>
      ) : (
        <>{renderContent()}</>
      )}
      <BottomTabBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        unreadCount={unreadCount}
      />
    </SafeAreaView>
  );
}
