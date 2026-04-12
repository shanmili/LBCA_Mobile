export const COLORS = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  accent: "#FFD700",
  primary: "#3B82F6",
  red: "#EF4444",
  green: "#10B981",
  orange: "#F59E0B",
  purple: "#8B5CF6",
  pink: "#EC4899",
  blue: "#3B82F6",
  yellow: "#FBBF24",
  indigo: "#6366F1",
};

export const subjectColors = {
  Mathematics: COLORS.blue,
  Science: COLORS.green,
  English: COLORS.purple,
  Filipino: COLORS.orange,
  "Social Studies": COLORS.pink,
  MAPEH: COLORS.yellow,
  "Values Education": COLORS.indigo,
};

export const teacherBySubject = {
  Mathematics: "Ms. Reyes",
  Science: "Mr. Santos",
  English: "Mrs. Cruz",
  Filipino: "Bb. Mendoza",
  "Social Studies": "Dr. Garcia",
  MAPEH: "Coach Lopez",
  "Values Education": "Ms. Rivera",
};

export const quartersData = [
  { id: 1, label: "Q1", name: "1st Quarter", locked: false },
  { id: 2, label: "Q2", name: "2nd Quarter", locked: false },
  { id: 3, label: "Q3", name: "3rd Quarter", locked: false },
  { id: 4, label: "Q4", name: "4th Quarter", locked: true },
];

// PACE scores for each subject per quarter
export const paceScoresData = {
  Mathematics: {
    q1: [88, 85, 92, 87, 90, 86],
    q2: [89, 88, 91, 85, 90, 91],
    q3: [74, 74, 74, 74, 74, 74],
    q4: [91, 93, 90, 92, 89, 91],
  },
  Science: {
    q1: [85, 87, 84, 86, 88, 85],
    q2: [86, 88, 85, 87, 86, 84],
    q3: [87, 89, 86, 88, 87, 85],
    q4: [90, 92, 89, 91, 90, 88],
  },
  English: {
    q1: [84, 86, 83, 85, 84, 82],
    q2: [84, 85, 84, 83, 86, 82],
    q3: [85, 87, 84, 86, 85, 83],
    q4: [88, 90, 87, 89, 88, 86],
  },
  Filipino: {
    q1: [86, 88, 85, 87, 86, 84],
    q2: [87, 89, 86, 88, 87, 85],
    q3: [88, 90, 87, 89, 88, 86],
    q4: [90, 92, 89, 91, 90, 88],
  },
  "Social Studies": {
    q1: [87, 89, 86, 88, 87, 85],
    q2: [88, 90, 87, 89, 88, 86],
    q3: [90, 92, 89, 91, 90, 88],
    q4: [92, 94, 91, 93, 92, 90],
  },
  MAPEH: {
    q1: [83, 85, 82, 84, 83, 81],
    q2: [85, 87, 84, 86, 85, 83],
    q3: [86, 88, 85, 87, 86, 84],
    q4: [89, 91, 88, 90, 89, 87],
  },
  "Values Education": {
    q1: [89, 91, 88, 90, 89, 87],
    q2: [91, 93, 90, 92, 91, 89],
    q3: [91, 93, 90, 92, 91, 89],
    q4: [89, 91, 88, 90, 89, 87],
  },
};