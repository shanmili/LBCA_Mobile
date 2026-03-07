import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "../../../constants/useTheme";
import useEarlyWarningState from "../../../constants/useEarlyWarningState";
import RiskSummary from "./RiskSummary";
import WarningFilter from "./WarningFilter";
import WarningTable from "./WarningTable";
import StudentTable from "../students/StudentTable";

const EarlyWarningPage = ({ onNavigate, teacher = null }) => {
  const { colors } = useTheme();
  const { filters, updateFilter, filteredStudents, allStudents, riskCounts } =
    useEarlyWarningState(teacher);
  const [selectedRisk, setSelectedRisk] = useState(null);

  const handleRiskPress = (riskLevel) => {
    setSelectedRisk(riskLevel);
  };

  const riskStudents = selectedRisk
    ? allStudents.filter((s) => s.riskLevel === selectedRisk)
    : [];

  if (selectedRisk) {
    return (
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <StudentTable
            students={riskStudents}
            onNavigate={onNavigate}
            onBack={() => setSelectedRisk(null)}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ padding: 16 }}>
        {/* Header */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: "800", color: colors.text }}>
            Early Warning Alerts
          </Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginTop: 4 }}>
            Monitor and manage at-risk students based on PACE progress
          </Text>
        </View>

        {/* Filter */}
        <WarningFilter filters={filters} onFilterChange={updateFilter} />

        {/* Risk Summary Cards */}
        <RiskSummary counts={riskCounts} onRiskPress={handleRiskPress} />

        {/* At-Risk Students Table */}
        <WarningTable students={filteredStudents} onNavigate={onNavigate} />

        {/* Footer */}
        <View style={{ paddingVertical: 16, alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: colors.muted }}>
            Showing {filteredStudents.length} of {allStudents.length} students
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default EarlyWarningPage;
