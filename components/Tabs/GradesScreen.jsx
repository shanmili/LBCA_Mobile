import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../constants/useTheme";
import { getGradeColor, gradesData, subjectColors, paceScoresData } from "../../constants/GradesData";
import { pill, pillText, styles as globalStyles } from "../../constants/styles";
import { PACEModal } from "./PACEModal";

export function GradesScreen() {
  const { colors } = useTheme();
  const [selectedQuarter, setSelectedQuarter] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  const quarters = [
    { id: 1, label: "Q1", name: "1st Quarter", locked: false },
    { id: 2, label: "Q2", name: "2nd Quarter", locked: false },
    { id: 3, label: "Q3", name: "3rd Quarter", locked: false },
    { id: 4, label: "Q4", name: "4th Quarter", locked: true },
  ];

  const getQuarterGrade = (subject) => {
    switch(selectedQuarter) {
      case 1: return subject.q1;
      case 2: return subject.q2;
      case 3: return subject.q3;
      case 4: return subject.q4;
      default: return subject.q3;
    }
  };

  const calculateTotalAverage = () => {
    const grades = gradesData.map(s => getQuarterGrade(s));
    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    return (sum / grades.length).toFixed(1);
  };

  const getGradeRemarks = (grade) => {
    if (grade >= 90) return "Outstanding";
    if (grade >= 85) return "Excellent";
    if (grade >= 80) return "Very Good";
    if (grade >= 75) return "Good";
    return "Needs Improvement";
  };

  const handleSubjectPress = (subject) => {
    if (!quarters[selectedQuarter - 1].locked) {
      setSelectedSubject(subject);
      setModalVisible(true);
    }
  };

  const subjectIcons = [
    "calculator",
    "flask",
    "book",
    "globe",
    "flag",
    "musical-notes",
    "heart",
  ];

  return (
    <>
      <ScrollView 
        style={{ flex: 1, backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
      >
        <View style={globalStyles.pagePad}>
          {/* Header */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[globalStyles.h1, { color: colors.text }]}>Grades</Text>
            <Text style={[globalStyles.p, { color: colors.muted }]}>School Year 2025–2026</Text>
          </View>

          {/* Quarter Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            {quarters.map((q) => (
              <TouchableOpacity
                key={q.label}
                onPress={() => !q.locked && setSelectedQuarter(q.id)}
                style={[
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                    borderRadius: 100,
                    backgroundColor: selectedQuarter === q.id 
                      ? colors.accent 
                      : colors.card,
                    borderWidth: 1,
                    borderColor: selectedQuarter === q.id 
                      ? colors.accent 
                      : colors.border,
                    marginRight: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  },
                  q.locked && { opacity: 0.7 }
                ]}
              >
                <Text
                  style={{
                    color: selectedQuarter === q.id 
                      ? colors.card 
                      : colors.muted,
                    fontSize: 13,
                    fontWeight: "700",
                  }}
                >
                  {q.label}
                </Text>
                {q.locked && (
                  <Ionicons name="lock-closed" size={11} color={colors.muted} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Total Average Card */}
          <View
            style={[
              globalStyles.card,
              {
                marginBottom: 20,
                backgroundColor: colors.accent,
                borderColor: colors.accent,
              },
            ]}
          >
            <View style={{ 
              flexDirection: "row", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: 8 
            }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: "600", 
                color: colors.card, 
                opacity: 0.8 
              }}>
                Total Average
              </Text>
              <View style={[pill(colors.text), { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                <Text style={[pillText(colors.text), { color: colors.card }]}>
                  {quarters.find(q => q.id === selectedQuarter)?.name}
                </Text>
              </View>
            </View>
            
            <View style={{ 
              flexDirection: "row", 
              alignItems: "baseline", 
              justifyContent: "space-between" 
            }}>
              <Text style={{ 
                fontSize: 48, 
                fontWeight: "800", 
                color: colors.card 
              }}>
                {calculateTotalAverage()}
              </Text>
              <Text style={{ 
                fontSize: 13, 
                fontWeight: "600", 
                color: colors.card 
              }}>
                {gradesData.length} Subjects
              </Text>
            </View>
          </View>

          {/* Subject List */}
          <View style={{ marginBottom: 10 }}>
            <Text style={[globalStyles.h2, { color: colors.text, marginBottom: 16 }]}>
              Subject Grades
            </Text>
            
            {gradesData.map((s, idx) => {
              const grade = getQuarterGrade(s);
              const color = subjectColors[s.subject] || colors.accent;
              const remarks = getGradeRemarks(grade);
              const isLocked = quarters[selectedQuarter - 1].locked;
              
              return (
                <TouchableOpacity
                  key={s.subject}
                  onPress={() => handleSubjectPress(s.subject)}
                  disabled={isLocked}
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
                      isLocked && { opacity: 0.7 }
                    ]}
                  >
                    {/* Subject Icon */}
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

                    {/* Subject Info */}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{ 
                          fontSize: 14, 
                          fontWeight: "700", 
                          color: colors.text 
                        }}
                      >
                        {s.subject}
                      </Text>
                      <Text style={{ 
                        fontSize: 12, 
                        color: colors.muted, 
                        marginTop: 2 
                      }}>
                        {s.teacher}
                      </Text>
                    </View>

                    {/* Grade and Remarks */}
                    <View style={{ alignItems: "flex-end" }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <Text
                          style={{
                            fontSize: 22,
                            fontWeight: "800",
                            color: getGradeColor(grade),
                            marginBottom: 4,
                          }}
                        >
                          {grade}
                        </Text>
                        <Ionicons 
                          name="chevron-forward" 
                          size={18} 
                          color={colors.muted} 
                          style={{ opacity: isLocked ? 0.3 : 0.8 }}
                        />
                      </View>
                      <View style={pill(getGradeColor(grade))}>
                        <Text style={pillText(getGradeColor(grade))}>
                          {remarks}
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

      {/* PACE Modal */}
      <PACEModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedSubject(null);
        }}
        subject={selectedSubject}
        quarter={selectedQuarter}
        paceData={selectedSubject ? paceScoresData[selectedSubject] : null}
        averageGrade={selectedSubject ? getQuarterGrade(
          gradesData.find(s => s.subject === selectedSubject)
        ) : 0}
      />
    </>
  );
}