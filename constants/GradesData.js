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

export const getGradeColor = (grade) => {
  if (grade >= 90) return COLORS.green;
  if (grade >= 85) return COLORS.blue;
  if (grade >= 80) return COLORS.orange;
  return COLORS.red;
};

// PACE scores for each subject per quarter
export const paceScoresData = {
  Mathematics: {
    q1: [88, 85, 92, 87, 90, 86], // Individual PACE scores
    q2: [89, 88, 91, 85, 90, 91],
    q3: [92, 94, 90, 93, 91, 92],
    q4: [91, 93, 90, 92, 89, 91],
    totalPaces: 6,
  },
  Science: {
    q1: [85, 87, 84, 86, 88, 85],
    q2: [86, 88, 85, 87, 86, 84],
    q3: [87, 89, 86, 88, 87, 85],
    q4: [90, 92, 89, 91, 90, 88],
    totalPaces: 6,
  },
  English: {
    q1: [84, 86, 83, 85, 84, 82],
    q2: [84, 85, 84, 83, 86, 82],
    q3: [85, 87, 84, 86, 85, 83],
    q4: [88, 90, 87, 89, 88, 86],
    totalPaces: 6,
  },
  Filipino: {
    q1: [86, 88, 85, 87, 86, 84],
    q2: [87, 89, 86, 88, 87, 85],
    q3: [88, 90, 87, 89, 88, 86],
    q4: [90, 92, 89, 91, 90, 88],
    totalPaces: 6,
  },
  "Social Studies": {
    q1: [87, 89, 86, 88, 87, 85],
    q2: [88, 90, 87, 89, 88, 86],
    q3: [90, 92, 89, 91, 90, 88],
    q4: [92, 94, 91, 93, 92, 90],
    totalPaces: 6,
  },
  MAPEH: {
    q1: [83, 85, 82, 84, 83, 81],
    q2: [85, 87, 84, 86, 85, 83],
    q3: [86, 88, 85, 87, 86, 84],
    q4: [89, 91, 88, 90, 89, 87],
    totalPaces: 6,
  },
  "Values Education": {
    q1: [89, 91, 88, 90, 89, 87],
    q2: [91, 93, 90, 92, 91, 89],
    q3: [91, 93, 90, 92, 91, 89],
    q4: [89, 91, 88, 90, 89, 87],
    totalPaces: 6,
  },
};

export const gradesData = [
  {
    subject: "Mathematics",
    teacher: "Ms. Reyes",
    q1: 88,
    q2: 89,
    q3: 92,
    q4: 91,
  },
  {
    subject: "Science",
    teacher: "Mr. Santos",
    q1: 85,
    q2: 86,
    q3: 87,
    q4: 90,
  },
  {
    subject: "English",
    teacher: "Mrs. Cruz",
    q1: 84,
    q2: 84,
    q3: 85,
    q4: 88,
  },
  {
    subject: "Filipino",
    teacher: "Bb. Mendoza",
    q1: 86,
    q2: 87,
    q3: 88,
    q4: 90,
  },
  {
    subject: "Social Studies",
    teacher: "Dr. Garcia",
    q1: 87,
    q2: 88,
    q3: 90,
    q4: 92,
  },
  {
    subject: "MAPEH",
    teacher: "Coach Lopez",
    q1: 83,
    q2: 85,
    q3: 86,
    q4: 89,
  },
  {
    subject: "Values Education",
    teacher: "Ms. Rivera",
    q1: 89,
    q2: 91,
    q3: 91,
    q4: 89,
  },
];