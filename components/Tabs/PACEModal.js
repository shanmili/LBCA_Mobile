
import { Ionicons } from "@expo/vector-icons";
import { Modal, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useTheme } from "../../constants/useTheme";
import { pill, pillText } from "../../constants/styles";

export function PACEModal({ visible, onClose, subject, quarter, paceData, averageGrade }) {
  const { colors, isDarkMode } = useTheme();

  if (!subject || !paceData) return null;

  const quarterKey = `q${quarter}`;
  const paceScores = paceData[quarterKey] || [];
  const totalPaces = paceData.totalPaces || paceScores.length;
  
  const average = (paceScores.reduce((a, b) => a + b, 0) / paceScores.length).toFixed(1);

  const getScoreColor = (score) => {
    if (score >= 90) return colors.green;
    if (score >= 80) return colors.accent;
    if (score >= 75) return colors.amber;
    return colors.red;
  };

  const quarterNames = ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* BG-Overlay sa main GradesScreen*/}
      <View style={{ 
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
        {/* Container sa Modal*/}
        <View style={{
          width: '100%',
          maxWidth: 400,
          maxHeight: '80%',
          backgroundColor: isDarkMode ? colors.bgDark : colors.bg,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: colors.border,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
          overflow: 'hidden',
        }}>
          
          {/* Header */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            backgroundColor: colors.card,
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '800', 
                color: colors.text,
                marginBottom: 4,
              }}>
                {subject}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <View style={[pill(colors.accent), { backgroundColor: `${colors.accent}20` }]}>
                  <Text style={[pillText(colors.accent), { color: colors.accent }]}>
                    {quarterNames[quarter - 1]}
                  </Text>
                </View>
                <Text style={{ color: colors.muted, fontSize: 13 }}>
                  {totalPaces} PACE Scores
                </Text>
              </View>
            </View>
            
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: colors.cardLight,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderColor: colors.border,
                marginLeft: 10,
              }}
            >
              <Ionicons name="close" size={20} color={colors.muted} />
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 20 }}
          >
            {/* Summary Cards */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
              marginBottom: 20,
              backgroundColor: colors.card,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
              <View>
                <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 2 }}>Final Grade</Text>
                <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800' }}>{averageGrade}</Text>
              </View>
              
              <View style={{ width: 1, backgroundColor: colors.border }} />
              
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 2 }}>PACE Avg</Text>
                <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800' }}>{average}</Text>
              </View>
              
              <View style={{ width: 1, backgroundColor: colors.border }} />
              
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ color: colors.muted, fontSize: 12, marginBottom: 2 }}>Total</Text>
                <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800' }}>{totalPaces}</Text>
              </View>
            </View>

            {/* PACE Scores Container */}
            <View style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: 'hidden',
            }}>
              {/* Column Headers */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: colors.cardLight,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
              }}>
                <Text style={{ color: colors.muted, fontSize: 12, fontWeight: '600', width: 60 }}>
                  PACE
                </Text>
                <Text style={{ color: colors.muted, fontSize: 12, fontWeight: '600', width: 45, textAlign: 'center' }}>
                  Score
                </Text>
                <Text style={{ color: colors.muted, fontSize: 12, fontWeight: '600', width: 60, textAlign: 'right' }}>
                  Status
                </Text>
              </View>

              {/* PACE Items */}
              {paceScores.map((score, index) => {
                const scoreColor = getScoreColor(score);
                const status = score >= 75 ? 'Passed' : 'Failed';
                
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      borderBottomWidth: index < paceScores.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border,
                      backgroundColor: colors.card,
                    }}
                  >
                    {/* PACE Number */}
                    <Text style={{ 
                      color: colors.text, 
                      fontSize: 14, 
                      fontWeight: '500',
                      width: 60 
                    }}>
                      P{index + 1}
                    </Text>

                    {/* Score */}
                    <Text style={{ 
                      fontSize: 18, 
                      fontWeight: '700', 
                      color: scoreColor,
                      width: 45,
                      textAlign: 'center',
                    }}>
                      {score}
                    </Text>

                    {/* Status Badge */}
                    <View style={[pill(scoreColor), { 
                      backgroundColor: `${scoreColor}20`,
                      width: 60,
                      alignItems: 'center',
                      paddingVertical: 4,
                    }]}>
                      <Text style={[pillText(scoreColor), { color: scoreColor, fontSize: 11 }]}>
                        {status}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}