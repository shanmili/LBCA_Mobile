import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from "../components/common/LoadingScreen";
import MyRiskDetail from "../components/common/students/StudentRiskDetail";
import { UnderMaintenance } from "../components/common/under-maintenance";
import { BottomTabBar } from "../components/layout/BottomTabBar";
import { TopHeader } from "../components/layout/TopHeader";
import { DashboardTab } from "../components/Tabs/DashboardScreen";
import { GradesScreen } from "../components/Tabs/GradesScreen";
import { NotificationsTab } from "../components/Tabs/NotificationsScreen";
import { ProfileTab } from "../components/Tabs/ProfileScreen";
import { ScheduleTab } from "../components/Tabs/ScheduleScreen";
import { notifications } from "../constants/data";
import { ProfileProvider } from "../constants/ProfileContext";
import { useTheme } from "../constants/useTheme";
import { getLoggedParentStudentInfo, signOut } from "../services/authService";
import { getAuthSession } from "../services/authToken";


function HomeScreenInner() {
  const { colors, isDarkMode } = useTheme();
  const [activeTab, setTab] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [loggedStudentId, setLoggedStudentId] = useState(null);
  const [parentStudentInfo, setParentStudentInfo] = useState(null);
  const [prevTab, setPrevTab] = useState("home"); // for profile back button
  const [unreadCount, setUnreadCount] = useState(
    notifications.filter((n) => n.unread).length,
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const session = await getAuthSession();
      if (!mounted || !session) return;
      if (session.role === "parent") {
        try {
          const parentStudentInfo = await getLoggedParentStudentInfo();
          if (mounted && parentStudentInfo?.student_id) {
            setLoggedStudentId(parentStudentInfo.student_id);
            setParentStudentInfo(parentStudentInfo);
            return;
          }
        } catch {
          // fall back to any student id already stored during login
        }

        if (session.studentId) {
          setLoggedStudentId(session.studentId);
        }
      }
    };

    loadSession();

    return () => {
      mounted = false;
    };
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
          studentName={
            parentStudentInfo
              ? `${parentStudentInfo.first_name || ""} ${parentStudentInfo.last_name || ""}`.trim()
              : null
          }
          studentMeta={
            parentStudentInfo && (parentStudentInfo.grade_level || parentStudentInfo.section)
              ? `${parentStudentInfo.grade_level || ""}${
                  parentStudentInfo.grade_level && parentStudentInfo.section ? " - " : ""
                }${parentStudentInfo.section || ""}`
              : null
          }
        />
      );
    }

    if (activeTab === "alert") {
      return (
        <MyRiskDetail
          onBack={() => setTab("home")}
          studentId={loggedStudentId}
          baseStudent={
            parentStudentInfo
              ? {
                  id: parentStudentInfo.student_id,
                  firstName: parentStudentInfo.first_name,
                  middleName: parentStudentInfo.middle_name,
                  lastName: parentStudentInfo.last_name,
                  gradeLevel: parentStudentInfo.grade_level,
                  section: parentStudentInfo.section,
                }
              : null
          }
        />
      );
    }

    if (activeTab === "grades") return <GradesScreen />;
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
  const selfScrolling = ["notif", "profile", "grades"].includes(activeTab);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    setTimeout(() => {
      router.replace("/login");
    }, 1800);
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
