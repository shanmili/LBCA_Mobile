import { ScrollView, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { teacherAvailability } from "../../constants/data";
import { avatar, avatarText, styles } from "../../constants/styles";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function ScheduleTab() {

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.pagePad} showsVerticalScrollIndicator={false}>
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.h2, { marginBottom: 4 }]}>Teacher Availability</Text>
        <Text style={[styles.p, { marginBottom: 16 }]}>Weekly school day schedule</Text>

        {teacherAvailability.map(teacher => (
          <View
            key={teacher.name}
            style={[styles.card, { marginBottom: 12 }]}
          >
            {/* Teacher info row */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
              <View style={[avatar(teacher.color, 42), { marginRight: 12 }]}>
                <Text style={[avatarText(teacher.color), { fontSize: 14 }]}>{teacher.avatar}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: "800", color: COLORS.text }}>{teacher.name}</Text>
                <Text style={{ fontSize: 12, color: COLORS.muted }}>{teacher.subject}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 10, color: COLORS.muted }}>Consult hours</Text>
                <Text style={{ fontSize: 11, fontWeight: "700", color: COLORS.accent }}>{teacher.consultHours}</Text>
              </View>
            </View>

            {/* Day availability */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {DAYS.map(d => {
                const available = teacher.availability[d];
                return (
                  <View key={d} style={{ alignItems: "center", flex: 1 }}>
                    <Text style={{ fontSize: 11, fontWeight: "700", color: COLORS.muted, marginBottom: 6 }}>{d}</Text>
                    <View style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: available ? `${teacher.color}22` : `${COLORS.border}`,
                      borderWidth: 1.5,
                      borderColor: available ? teacher.color : COLORS.border,
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {available
                        ? <Text style={{ fontSize: 16 }}>✓</Text>
                        : <Text style={{ fontSize: 14, color: COLORS.muted, fontWeight: "800" }}>–</Text>
                      }
                    </View>
                    <Text style={{ fontSize: 9, marginTop: 4, color: available ? COLORS.green : COLORS.muted, fontWeight: "700" }}>
                      {available ? "In" : "Off"}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
