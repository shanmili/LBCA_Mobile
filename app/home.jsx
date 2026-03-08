import { router } from "expo-router";
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
import { notifications, earlyWarningStudents } from "../constants/data";
import { ProfileProvider } from "../constants/ProfileContext";
import { useTheme } from "../constants/useTheme";

function HomeScreenInner() {
  const { colors, isDarkMode } = useTheme();
  const [activeTab, setTab] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [prevTab, setPrevTab] = useState("home"); // for profile back button
  const [showEarlyWarning, setShowEarlyWarning] = useState(false);
  const [earlyRiskFilter, setEarlyRiskFilter] = useState(null);
  const [notificationsState, setNotificationsState] = useState(notifications);
  const unreadCount = notificationsState.filter((n) => n.unread).length;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (t) => {
    setTab(t);
    setShowEarlyWarning(false);
    setEarlyRiskFilter(null);
  };

  const handleRiskPress = (risk) => {
    const level = risk || "low";
    setShowEarlyWarning(true);
    setEarlyRiskFilter(level);

    // create alert notifications for matching early-warning students
    const matches = earlyWarningStudents.filter((s) => s.riskLevel === level);
    if (matches.length > 0) {
      const newAlerts = matches.map((s, idx) => ({
        id: Date.now() + idx,
        type: "alert",
        ionIcon: "shield-checkmark",
        title: `Early Warning: ${s.firstName} ${s.lastName}`,
        body: `${s.firstName} ${s.lastName} — ${s.subject} — ${s.status}`,
        time: "Just now",
        unread: true,
        route: "home",
      }));
      setNotificationsState((prev) => [...newAlerts, ...prev]);
      // switch to notifications/alerts so user sees them too
      setTab("notif");
    }
  };

  const renderContent = () => {
    if (activeTab === "home") {
      return (
        <DashboardTab
          unreadCount={unreadCount}
          onNotifPress={() => setTab("notif")}
          onRiskPress={() => { setTab("alert"); setShowEarlyWarning(true); }}
        />
      );
    }

    // Notification bell → notifications list
    if (activeTab === "notif") {
      return <NotificationsTab onNavigate={(r) => setTab(r)} />;
    }

    // Alerts tab or Low Risk card → risk detail
    if (activeTab === "alert") {
      return <MyRiskDetail onBack={() => { setShowEarlyWarning(false); setTab("home"); }} />;
    }

    return <UnderMaintenance />;
  };

  // These tabs manage their own scroll internally
  const selfScrolling = ["notif", "alert", "profile"].includes(activeTab);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      router.replace("/login");
    }, 1800);
  };

  const handleProfilePress = () => {
    setPrevTab(activeTab);
    setTab("profile");
  };

  if (isLoggingOut)
    return <LoadingScreen message="See you soon!" variant="logout" />;
  if (isLoading) return <LoadingScreen message="Preparing your dashboard..." />;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <TopHeader onProfilePress={handleProfilePress} onLogout={handleLogout} />
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
