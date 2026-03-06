import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export const pill = (color: string) => ({ flexDirection: "row" as const, alignItems: "center" as const, backgroundColor: `${color}22`, borderRadius: 100, paddingVertical: 4, paddingHorizontal: 10, alignSelf: 'flex-start' as const });
export const pillText = (color: string) => ({ color: color, fontSize: 11, fontWeight: "700" as const });
export const avatar = (color = COLORS.accent, size = 40) => ({ width: size, height: size, borderRadius: size / 2, backgroundColor: `${color}22`, borderWidth: 2, borderColor: `${color}44`, alignItems: "center" as const, justifyContent: "center" as const });
export const avatarText = (color: string) => ({ color: color, fontSize: 14, fontWeight: "800" as const });

export const styles = StyleSheet.create({
  pagePad: { padding: 20 },
  card: { backgroundColor: COLORS.card, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  h1: { fontSize: 22, fontWeight: "800", color: COLORS.text, marginBottom: 4 },
  h2: { fontSize: 16, fontWeight: "700", color: COLORS.text, marginBottom: 4 },
  p: { color: COLORS.muted, fontSize: 13 },
  badge: { position: "absolute", top: -4, right: -4, backgroundColor: COLORS.red, borderRadius: 10, width: 20, height: 20, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: COLORS.bg },
});
