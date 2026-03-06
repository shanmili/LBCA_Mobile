import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "@/constants/colors";
import { notifications } from "@/constants/data";
import { styles, pill, pillText } from "@/constants/styles";

interface NotificationsTabProps {
  unreadCount: number;
}

export function NotificationsTab({ unreadCount }: NotificationsTabProps) {
  return (
    <View style={styles.pagePad}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <View>
          <Text style={styles.h1}>Notifications</Text>
          <Text style={styles.p}>{unreadCount} unread</Text>
        </View>
        <TouchableOpacity style={pill(COLORS.accent)}>
          <Text style={pillText(COLORS.accent)}>Mark all read</Text>
        </TouchableOpacity>
      </View>
      {notifications.map(n => (
        <View key={n.id} style={[styles.card, { marginBottom: 10, flexDirection: "row", backgroundColor: n.unread ? COLORS.cardLight : COLORS.card }]}>
          {n.unread && <View style={{ position: "absolute", top: 16, right: 16, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent }} />}
          <Text style={{ fontSize: 28, marginRight: 14 }}>{n.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: "700", color: COLORS.text }}>{n.title}</Text>
            <Text style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>{n.body}</Text>
            <Text style={{ fontSize: 11, color: COLORS.muted, marginTop: 8, fontWeight: "600" }}>{n.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
