import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  COLORS,
  paceScoresData,
  quartersData,
  subjectColors,
  teacherBySubject,
} from "../../constants/GradesData";
import { styles as globalStyles, pill, pillText } from "../../constants/styles";
import { useTheme } from "../../constants/useTheme";
import { PACEModal } from "./PACEModal";

export function GradesScreen() {
  const { colors } = useTheme();
  const [selectedQuarter, setSelectedQuarter] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjectIcons = [
    "calculator",
    "flask",
    "book",
    "globe",
    "flag",
    "musical-notes",
    "heart",
  ];

  const getQuarterKey = (quarterId) => `q${quarterId}`;

  const getSelectedQuarterInfo = () => {
    return quartersData.find((q) => q.id === selectedQuarter);
  };

  const isQuarterLocked = () => {
    return getSelectedQuarterInfo()?.locked ?? true;
  };

  const getQuarterScores = (subjectName, quarterId) => {
    const quarterKey = getQuarterKey(quarterId);
    return paceScoresData[subjectName]?.[quarterKey] || [];
  };

  const getTotalPaces = (subjectName, quarterId) => {
    return getQuarterScores(subjectName, quarterId).length;
  };

  const getTotalScore = (subjectName, quarterId) => {
    return getQuarterScores(subjectName, quarterId).reduce(
      (sum, score) => sum + score,
      0
    );
  };

  const getQuarterGrade = (subjectName, quarterId) => {
    const totalScore = getTotalScore(subjectName, quarterId);
    const totalPaces = getTotalPaces(subjectName, quarterId);

    if (totalPaces === 0) return 0;
    return Number((totalScore / totalPaces).toFixed(2));
  };

  const getGradeColor = (grade) => {
    if (grade >= 90) return COLORS.green;
    if (grade >= 85) return COLORS.blue;
    if (grade >= 80) return COLORS.orange;
    return COLORS.red;
  };

  const getGradeRemarks = (grade) => {
    if (grade >= 90) return "Outstanding";
    if (grade >= 85) return "Excellent";
    if (grade >= 80) return "Very Good";
    if (grade >= 75) return "Good";
    return "Needs Improvement";
  };

  const gradesData = useMemo(() => {
    return Object.keys(paceScoresData).map((subject) => ({
      subject,
      teacher: teacherBySubject[subject] || "Unknown Teacher",
      grade: getQuarterGrade(subject, selectedQuarter),
      totalPaces: getTotalPaces(subject, selectedQuarter),
      totalScore: getTotalScore(subject, selectedQuarter),
    }));
  }, [selectedQuarter]);

  const calculateTotalAverage = () => {
    if (isQuarterLocked()) return null;

    const grades = gradesData.map((item) => item.grade);
    if (grades.length === 0) return 0;

    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    return sum / grades.length;
  };

  const totalAverage = calculateTotalAverage();

  const totalAverageCardColor =
    totalAverage !== null && totalAverage < 75
      ? COLORS.red
      : colors.accent;

  const handleSubjectPress = (subject) => {
    if (isQuarterLocked()) return;

    setSelectedSubject(subject);
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.pagePad}>
          <View style={{ marginBottom: 20 }}>
            <Text style={[globalStyles.h1, { color: colors.text }]}>
              Grades
            </Text>
            <Text style={[globalStyles.p, { color: colors.muted }]}>
              School Year 2025–2026
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            {quartersData.map((q) => (
              <TouchableOpacity
                key={q.label}
                onPress={() => setSelectedQuarter(q.id)}
                style={[
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                    borderRadius: 100,
                    backgroundColor:
                      selectedQuarter === q.id ? colors.accent : colors.card,
                    borderWidth: 1,
                    borderColor:
                      selectedQuarter === q.id ? colors.accent : colors.border,
                    marginRight: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  },
                  q.locked && { opacity: 0.7 },
                ]}
              >
                <Text
                  style={{
                    color:
                      selectedQuarter === q.id ? colors.card : colors.muted,
                    fontSize: 13,
                    fontWeight: "700",
                  }}
                >
                  {q.label}
                </Text>

                {q.locked && (
                  <Ionicons
                    name="lock-closed"
                    size={11}
                    color={colors.muted}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View
            style={[
              globalStyles.card,
              {
                marginBottom: 20,
                backgroundColor: totalAverageCardColor,
                borderColor: totalAverageCardColor,
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: colors.card,
                  opacity: 0.8,
                }}
              >
                Total Average
              </Text>

              <View
                style={[
                  pill(colors.text),
                  { backgroundColor: "rgba(255,255,255,0.2)" },
                ]}
              >
                <Text style={[pillText(colors.text), { color: colors.card }]}>
                  {getSelectedQuarterInfo()?.name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 48,
                  fontWeight: "800",
                  color: colors.card,
                }}
              >
                {totalAverage === null ? "--" : totalAverage.toFixed(1)}
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: colors.card,
                }}
              >
                {gradesData.length} Subjects
              </Text>
            </View>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={[
                globalStyles.h2,
                { color: colors.text, marginBottom: 16 },
              ]}
            >
              Subject Grades
            </Text>

            {gradesData.map((s, idx) => {
              const locked = isQuarterLocked();
              const color = subjectColors[s.subject] || colors.accent;

              const displayGrade = locked ? "--" : s.grade;
              const displayRemarks = locked
                ? "Locked"
                : getGradeRemarks(s.grade);

              const badgeColor = locked ? colors.muted : getGradeColor(s.grade);
              const gradeTextColor = locked
                ? colors.muted
                : getGradeColor(s.grade);

              return (
                <TouchableOpacity
                  key={s.subject}
                  onPress={() => handleSubjectPress(s.subject)}
                  disabled={locked}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      globalStyles.card,
                      {
                        marginBottom: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                      },
                      locked && { opacity: 0.7 },
                    ]}
                  >
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        backgroundColor: `${color}22`,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 14,
                      }}
                    >
                      <Ionicons
                        name={subjectIcons[idx % subjectIcons.length]}
                        size={20}
                        color={color}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "700",
                          color: colors.text,
                        }}
                      >
                        {s.subject}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: colors.muted,
                          marginTop: 2,
                        }}
                      >
                        {s.teacher}
                      </Text>
                    </View>

                    <View style={{ alignItems: "flex-end" }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 22,
                            fontWeight: "800",
                            color: gradeTextColor,
                            marginBottom: 4,
                          }}
                        >
                          {displayGrade}
                        </Text>

                        <Ionicons
                          name={locked ? "lock-closed" : "chevron-forward"}
                          size={18}
                          color={colors.muted}
                          style={{ opacity: locked ? 0.5 : 0.8 }}
                        />
                      </View>

                      <View style={pill(badgeColor)}>
                        <Text style={pillText(badgeColor)}>
                          {displayRemarks}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <PACEModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedSubject(null);
        }}
        subject={selectedSubject}
        quarter={selectedQuarter}
        paceData={selectedSubject ? paceScoresData[selectedSubject] : null}
        averageGrade={
          selectedSubject ? getQuarterGrade(selectedSubject, selectedQuarter) : 0
        }
      />
    </>
  );
}