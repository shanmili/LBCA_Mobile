import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { gradesData, subjectColors } from "../../constants/data";
import { avatar, getStyles, pill, pillText } from "../../constants/styles";
import { useTheme } from "../../constants/useTheme";
import { StatCard } from "../common/dashboard/StatCard";
import { SubjectProgress } from "../common/dashboard/SubjectProgress";

export function DashboardTab({ unreadCount, onNotifPress, onRiskPress, studentName, studentMeta }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const displayName = studentName || "";
  return (
    <View style={styles.pagePad}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <View>
          <Text style={styles.p}>
            Good morning{" "}
            <Ionicons name="hand-right" size={14} color={colors.muted} />
          </Text>
          <Text style={styles.h1}>{displayName}</Text>
          {!!studentMeta && (
            <View style={[pill(colors.green), { marginTop: 6 }]}>
              <Text style={pillText(colors.green)}>{`● ${studentMeta}`}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={onNotifPress}>
          <View style={avatar()}>
            <Ionicons name="notifications" size={20} color={colors.accent} />
          </View>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={{ fontSize: 10, fontWeight: "800", color: "#fff" }}>
                {unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <StatCard
          title="GWA"
          value="89.8"
          color={colors.green}
          icon="trending-up"
        />
        <StatCard
          title="Attendance"
          value="96%"
          color={colors.accent}
          icon="calendar"
        />
        <StatCard
          title="Risk"
          value="Low"
          color={colors.green}
          icon="shield-checkmark"
          onPress={onRiskPress}
        />
      </View>

      <View style={[styles.card, { marginBottom: 16 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={styles.h2}>Academic Trend</Text>
          <View style={pill(colors.accent)}>
            <Text style={pillText(colors.accent)}>Q1 – Q3</Text>
          </View>
        </View>
        {gradesData.slice(0, 4).map((s) => {
          const avg = Math.round((s.q1 + s.q2 + s.q3) / 3);
          const color = subjectColors[s.subject] || colors.accent;
          return (
            <SubjectProgress
              key={s.subject}
              subject={s.subject}
              value={avg}
              color={color}
            />
          );
        })}
      </View>
    </View>
  );
}
