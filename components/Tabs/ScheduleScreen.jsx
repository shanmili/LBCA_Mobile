import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { schedule, subjectColors, teacherAvailability } from "../../constants/data";
import { avatar, avatarText, styles } from "../../constants/styles";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function ScheduleTab() {
  const [activeSection, setActiveSection] = useState("student");
  const [activeDay, setActiveDay] = useState("Mon");

  const todaySchedule = schedule.find((s) => s.day === activeDay);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.pagePad}
      showsVerticalScrollIndicator={false}
    >
      {/* Section Toggle */}
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.h2, { marginBottom: 4 }]}>Schedule</Text>
        <Text style={[styles.p, { marginBottom: 16 }]}>
          Weekly class schedule & teacher availability
        </Text>

        <View
          style={{
            flexDirection: "row",
            backgroundColor: COLORS.card,
            borderRadius: 14,
            padding: 4,
            borderWidth: 1,
            borderColor: COLORS.border,
          }}
        >
          {[
            { key: "student", label: "Student Schedule", icon: "school" },
            { key: "teacher", label: "Teacher Availability", icon: "person" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveSection(tab.key)}
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                borderRadius: 11,
                gap: 6,
                backgroundColor:
                  activeSection === tab.key ? COLORS.accent + "22" : "transparent",
                borderWidth: activeSection === tab.key ? 1 : 0,
                borderColor: activeSection === tab.key ? COLORS.accent : "transparent",
              }}
            >
              <Ionicons
                name={tab.icon}
                size={14}
                color={activeSection === tab.key ? COLORS.accent : COLORS.muted}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: activeSection === tab.key ? COLORS.accent : COLORS.muted,
                }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Student Schedule Section */}
      {activeSection === "student" && (
        <View>
          {/* Day Selector */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            {DAYS.map((d) => (
              <TouchableOpacity
                key={d}
                onPress={() => setActiveDay(d)}
                style={{
                  flex: 1,
                  marginHorizontal: 3,
                  paddingVertical: 10,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: activeDay === d ? COLORS.accent : COLORS.card,
                  borderWidth: 1,
                  borderColor: activeDay === d ? COLORS.accent : COLORS.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "800",
                    color: activeDay === d ? "#0F172A" : COLORS.muted,
                  }}
                >
                  {d}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Period Cards */}
          {todaySchedule ? (
            todaySchedule.periods.map((period, idx) => {
              const color = subjectColors[period.subject] || COLORS.accent;
              return (
                <View
                  key={idx}
                  style={[
                    styles.card,
                    {
                      marginBottom: 10,
                      flexDirection: "row",
                      alignItems: "stretch",
                      padding: 14,
                      overflow: "hidden",
                    },
                  ]}
                >
                  {/* Color bar */}
                  <View
                    style={{
                      width: 4,
                      borderRadius: 4,
                      backgroundColor: color,
                      marginRight: 14,
                      minHeight: 52,
                    }}
                  />
                  {/* Info */}
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "800",
                        color: COLORS.text,
                        marginBottom: 5,
                      }}
                    >
                      {period.subject}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 12 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Ionicons name="person-outline" size={11} color={COLORS.muted} />
                        <Text style={{ fontSize: 11, color: COLORS.muted }}>{period.teacher}</Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Ionicons name="location-outline" size={11} color={COLORS.muted} />
                        <Text style={{ fontSize: 11, color: COLORS.muted }}>{period.room}</Text>
                      </View>
                    </View>
                  </View>
                  {/* Time */}
                  <View
                    style={{
                      backgroundColor: `${color}22`,
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderWidth: 1,
                      borderColor: `${color}44`,
                      alignItems: "center",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontSize: 10, fontWeight: "700", color: color }}>
                      {period.time}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={[styles.card, { alignItems: "center", paddingVertical: 40 }]}>
              <Ionicons name="calendar-outline" size={36} color={COLORS.muted} />
              <Text style={{ color: COLORS.muted, marginTop: 10, fontSize: 13, fontWeight: "600" }}>
                No classes on {activeDay}
              </Text>
            </View>
          )}

          {/* Summary Bar */}
          {todaySchedule && (
            <View
              style={[
                styles.card,
                {
                  marginTop: 6,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingVertical: 14,
                },
              ]}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "800", color: COLORS.accent }}>
                  {todaySchedule.periods.length}
                </Text>
                <Text style={{ fontSize: 11, color: COLORS.muted }}>Classes</Text>
              </View>
              <View style={{ width: 1, backgroundColor: COLORS.border }} />
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "800", color: COLORS.green }}>
                  {todaySchedule.periods.length}h
                </Text>
                <Text style={{ fontSize: 11, color: COLORS.muted }}>Total Hours</Text>
              </View>
              <View style={{ width: 1, backgroundColor: COLORS.border }} />
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "800", color: COLORS.amber }}>
                  {todaySchedule.periods[0]?.time.split(" – ")[0]}
                </Text>
                <Text style={{ fontSize: 11, color: COLORS.muted }}>First Class</Text>
              </View>
            </View>
          )}
        </View>
      )}

      {/* Teacher Availability Section */}
      {activeSection === "teacher" && (
        <View>
          {teacherAvailability.map((teacher) => (
            <View key={teacher.name} style={[styles.card, { marginBottom: 12 }]}>
              {/* Teacher info row */}
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
                <View style={[avatar(teacher.color, 42), { marginRight: 12 }]}>
                  <Text style={[avatarText(teacher.color), { fontSize: 14 }]}>
                    {teacher.avatar}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, fontWeight: "800", color: COLORS.text }}>
                    {teacher.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: COLORS.muted }}>{teacher.subject}</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Text style={{ fontSize: 10, color: COLORS.muted }}>Consult hours</Text>
                  <Text style={{ fontSize: 11, fontWeight: "700", color: COLORS.accent }}>
                    {teacher.consultHours}
                  </Text>
                </View>
              </View>

              {/* Day availability */}
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {DAYS.map((d) => {
                  const available = teacher.availability[d];
                  return (
                    <View key={d} style={{ alignItems: "center", flex: 1 }}>
                      <Text
                        style={{ fontSize: 11, fontWeight: "700", color: COLORS.muted, marginBottom: 6 }}
                      >
                        {d}
                      </Text>
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          backgroundColor: available ? `${teacher.color}22` : `${COLORS.border}`,
                          borderWidth: 1.5,
                          borderColor: available ? teacher.color : COLORS.border,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {available ? (
                          <Text style={{ fontSize: 16 }}>✓</Text>
                        ) : (
                          <Text style={{ fontSize: 14, color: COLORS.muted, fontWeight: "800" }}>–</Text>
                        )}
                      </View>
                      <Text
                        style={{
                          fontSize: 9,
                          marginTop: 4,
                          color: available ? COLORS.green : COLORS.muted,
                          fontWeight: "700",
                        }}
                      >
                        {available ? "In" : "Off"}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}