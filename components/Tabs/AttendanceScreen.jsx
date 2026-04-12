import { ScrollView, Text, View } from "react-native";
import { teacherAvailability } from "../../constants/data";
import { avatar, avatarText } from "../../constants/styles";
import { useTheme } from "../../constants/useTheme";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function AttendanceTab() {
  const { colors } = useTheme();
  return (
    <ScrollView contentContainerStyle={{padding: 20, paddingBottom: 40}} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "800", color: colors.text, marginBottom: 4 }}>Attendance</Text>
        <Text style={{ color: colors.muted, fontSize: 13 }}>Academic Year 2025–2026</Text>
      </View>

      {/* ── Teacher Availability ── */}
      <Text style={{ fontSize: 16, fontWeight: "700", color: colors.text, marginBottom: 4 }}>Teacher Availability</Text>
      <Text style={{ color: colors.muted, fontSize: 13, marginBottom: 16 }}>Weekly school day schedule</Text>

      {teacherAvailability.map(teacher => (
        <View
          key={teacher.name}
          style={{ backgroundColor: colors.card, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: colors.border, marginBottom: 12 }}
        >
          {/* Teacher info row */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
            <View style={[avatar(teacher.color, 42), { marginRight: 12 }]}>
              <Text style={[avatarText(teacher.color), { fontSize: 14 }]}>{teacher.avatar}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "800", color: colors.text }}>{teacher.name}</Text>
              <Text style={{ fontSize: 12, color: colors.muted }}>{teacher.subject}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontSize: 10, color: colors.muted }}>Consult hours</Text>
              <Text style={{ fontSize: 11, fontWeight: "700", color: colors.accent }}>{teacher.consultHours}</Text>
            </View>
          </View>

          {/* Day availability */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {DAYS.map(d => {
              const available = teacher.availability[d];
              return (
                <View key={d} style={{ alignItems: "center", flex: 1 }}>
                  <Text style={{ fontSize: 11, fontWeight: "700", color: colors.muted, marginBottom: 6 }}>{d}</Text>
                  <View style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: available ? `${teacher.color}22` : `${colors.border}`,
                    borderWidth: 1.5,
                    borderColor: available ? teacher.color : colors.border,
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {available
                      ? <Text style={{ fontSize: 16 }}>✓</Text>
                      : <Text style={{ fontSize: 14, color: colors.muted, fontWeight: "800" }}>–</Text>
                    }
                  </View>
                  <Text style={{ fontSize: 9, marginTop: 4, color: available ? colors.green : colors.muted, fontWeight: "700" }}>
                    {available ? "In" : "Off"}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
