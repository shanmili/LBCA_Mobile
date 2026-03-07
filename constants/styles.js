import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const pill = (color) => ({ flexDirection: "row", alignItems: "center", backgroundColor: `${color}22`, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 10, alignSelf: 'flex-start' });
export const pillText = (color) => ({ color: color, fontSize: 11, fontWeight: "700" });
export const avatar = (color = COLORS.accent, size = 40) => ({ width: size, height: size, borderRadius: size / 2, backgroundColor: `${color}22`, borderWidth: 2, borderColor: `${color}44`, alignItems: "center", justifyContent: "center" });
export const avatarText = (color) => ({ color: color, fontSize: 14, fontWeight: "800" });

// Static styles (fallback, uses dark theme colors)
export const styles = StyleSheet.create({
  pagePad: { padding: 20 },
  card: { backgroundColor: COLORS.card, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  h1: { fontSize: 22, fontWeight: "800", color: COLORS.text, marginBottom: 4 },
  h2: { fontSize: 16, fontWeight: "700", color: COLORS.text, marginBottom: 4 },
  p: { color: COLORS.muted, fontSize: 13 },
  badge: { position: "absolute", top: -4, right: -4, backgroundColor: COLORS.red, borderRadius: 10, width: 20, height: 20, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: COLORS.bg },
});

// Theme-aware styles — call with colors from useTheme()
export const getStyles = (colors) => StyleSheet.create({
  pagePad: { padding: 20 },
  card: { backgroundColor: colors.card, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: colors.border },
  h1: { fontSize: 22, fontWeight: "800", color: colors.text, marginBottom: 4 },
  h2: { fontSize: 16, fontWeight: "700", color: colors.text, marginBottom: 4 },
  p: { color: colors.muted, fontSize: 13 },
  badge: { position: "absolute", top: -4, right: -4, backgroundColor: colors.red, borderRadius: 10, width: 20, height: 20, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: colors.bg },
});
