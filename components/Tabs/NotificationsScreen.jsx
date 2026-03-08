import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { notifications } from "../../constants/data";
import { pill, pillText, styles } from "../../constants/styles";

const TYPE_CONFIG = {
  grade: { color: "#38BDF8", label: "Grade" },
  alert: { color: "#F59E0B", label: "Alert" },
  announcement: { color: "#A78BFA", label: "Announcement" },
  schedule: { color: "#34D399", label: "Schedule" },
};

export function NotificationsTab({ onNavigate, items: initialItems }) {
  const [items, setItems] = useState(initialItems || notifications);
  const unreadCount = items.filter((n) => n.unread).length;

  const markAllRead = () =>
    setItems(items.map((n) => ({ ...n, unread: false })));

  const handlePress = (item) => {
    setItems(
      items.map((n) => (n.id === item.id ? { ...n, unread: false } : n)),
    );
    if (item.route && onNavigate) {
      onNavigate(item.route);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.pagePad}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={styles.h1}>Notifications</Text>
            <Text style={styles.p}>
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
            </Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllRead} style={pill(COLORS.accent)}>
              <Text style={pillText(COLORS.accent)}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Notification List */}
        {items.map((n) => {
          const config = TYPE_CONFIG[n.type] || TYPE_CONFIG.announcement;
          const isRoutable = !!n.route;

          return (
            <TouchableOpacity
              key={n.id}
              onPress={() => handlePress(n)}
              activeOpacity={0.75}
              style={[
                styles.card,
                {
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "flex-start",
                  backgroundColor: n.unread ? COLORS.cardLight : COLORS.card,
                  borderLeftWidth: 3,
                  borderLeftColor: n.unread ? config.color : "transparent",
                },
              ]}
            >
              {/* Icon */}
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: `${config.color}22`,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                  flexShrink: 0,
                }}
              >
                <Ionicons name={n.ionIcon} size={20} color={config.color} />
              </View>

              {/* Content */}
              <View style={{ flex: 1 }}>
                {/* Type badge + unread dot */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                    gap: 6,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: `${config.color}22`,
                      borderRadius: 100,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color: config.color,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {config.label}
                    </Text>
                  </View>
                  {n.unread && (
                    <View
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: 4,
                        backgroundColor: COLORS.accent,
                      }}
                    />
                  )}
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: COLORS.text,
                    marginBottom: 4,
                  }}
                >
                  {n.title}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: COLORS.muted,
                    lineHeight: 18,
                    marginBottom: 8,
                  }}
                >
                  {n.body}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      color: COLORS.muted,
                      fontWeight: "600",
                    }}
                  >
                    {n.time}
                  </Text>
                  {isRoutable && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          color: COLORS.accent,
                          fontWeight: "700",
                        }}
                      >
                        View Details
                      </Text>
                      <Ionicons
                        name="chevron-forward"
                        size={12}
                        color={COLORS.accent}
                      />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {items.length === 0 && (
          <View style={{ alignItems: "center", paddingVertical: 60 }}>
            <Ionicons
              name="notifications-off-outline"
              size={48}
              color={COLORS.muted}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: COLORS.text,
                marginTop: 16,
              }}
            >
              No notifications yet
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.muted, marginTop: 4 }}>
              You're all caught up!
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
