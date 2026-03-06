import React from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { COLORS } from "@/constants/colors";
import { TopHeader } from "@/components/top-header";
import { BottomTabBar } from "@/components/bottom-tab-bar";
import { UnderMaintenance } from "@/components/under-maintenance";

const notifications = [
  { id: 1, type: "grade", icon: "📊", title: "Q3 Math Grade Posted", body: "Your Mathematics Q3 grade: 85", time: "2m ago", unread: true },
  { id: 2, type: "alert", icon: "⚠️", title: "Attendance Alert", body: "2 absences recorded this month — please monitor.", time: "1h ago", unread: true },
  { id: 3, type: "announcement", icon: "📢", title: "School Announcement", body: "Quarterly PTA meeting on March 15, 2026, 2:00 PM.", time: "3h ago", unread: false },
  { id: 4, type: "message", icon: "💬", title: "New message from Mr. Reyes", body: "Maria has been performing well. Keep it up!", time: "Yesterday", unread: false },
];

export default function HomeScreen() {
  const [activeTab, setTab] = React.useState("home");
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="light-content" />
      <TopHeader />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <UnderMaintenance />
      </ScrollView>
      <BottomTabBar activeTab={activeTab} onTabChange={setTab} unreadCount={unreadCount} />
    </SafeAreaView>
  );
}
