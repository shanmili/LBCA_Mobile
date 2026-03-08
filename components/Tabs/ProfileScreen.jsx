import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useProfile } from "../../constants/ProfileContext";
import { useTheme } from "../../constants/useTheme";

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  icon,
  colors,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: colors.muted,
          textTransform: "uppercase",
          letterSpacing: 0.8,
          marginBottom: 8,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.card,
          borderRadius: 14,
          borderWidth: 1.5,
          borderColor: focused ? colors.accent : colors.border,
          paddingHorizontal: 14,
          paddingVertical: 12,
        }}
      >
        <Ionicons
          name={icon}
          size={16}
          color={focused ? colors.accent : colors.muted}
          style={{ marginRight: 10 }}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          keyboardType={keyboardType || "default"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            color: colors.text,
            fontSize: 14,
            fontWeight: "500",
          }}
        />
      </View>
    </View>
  );
}

export function ProfileTab({ onBack }) {
  const { colors } = useTheme();
  const { profile, updateProfile } = useProfile();

  // Local draft state — only committed on Save
  const [draft, setDraft] = useState({ ...profile });
  const [saving, setSaving] = useState(false);

  const set = (key) => (val) => setDraft((d) => ({ ...d, [key]: val }));

  const pickPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "Please allow access to your photo library.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]?.uri) {
      setDraft((d) => ({ ...d, photo: result.assets[0].uri }));
    }
  };

  const handleSave = () => {
    if (!draft.firstName.trim() || !draft.lastName.trim()) {
      Alert.alert("Required", "First and last name cannot be empty.");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      updateProfile(draft);
      setSaving(false);
      Alert.alert("Saved!", "Your profile has been updated.");
    }, 600);
  };

  const initials =
    `${draft.firstName?.[0] ?? ""}${draft.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 28,
            }}
          >
            <TouchableOpacity
              onPress={onBack}
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 14,
              }}
            >
              <Ionicons name="arrow-back" size={18} color={colors.text} />
            </TouchableOpacity>
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: "800", color: colors.text }}
              >
                Edit Profile
              </Text>
              <Text style={{ fontSize: 12, color: colors.muted, marginTop: 2 }}>
                Update your personal information
              </Text>
            </View>
          </View>

          {/* Avatar Section */}
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: `${colors.accent}22`,
                  borderWidth: 3,
                  borderColor: colors.accent,
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {draft.photo ? (
                  <Image
                    source={{ uri: draft.photo }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 32,
                      fontWeight: "800",
                      color: colors.accent,
                    }}
                  >
                    {initials}
                  </Text>
                )}
              </View>

              {/* Camera button */}
              <TouchableOpacity
                onPress={pickPhoto}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: colors.accent,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: colors.bg,
                }}
              >
                <Ionicons name="camera" size={15} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={pickPhoto} style={{ marginTop: 12 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: colors.accent,
                }}
              >
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: colors.text,
                marginBottom: 16,
              }}
            >
              Personal Information
            </Text>

            <Field
              label="First Name"
              value={draft.firstName}
              onChangeText={set("firstName")}
              placeholder="Enter first name"
              icon="person-outline"
              colors={colors}
            />
            <Field
              label="Last Name"
              value={draft.lastName}
              onChangeText={set("lastName")}
              placeholder="Enter last name"
              icon="person-outline"
              colors={colors}
            />
            <Field
              label="Phone Number"
              value={draft.phone}
              onChangeText={set("phone")}
              placeholder="+63 9XX XXX XXXX"
              keyboardType="phone-pad"
              icon="call-outline"
              colors={colors}
            />
            <Field
              label="Email Address"
              value={draft.email}
              onChangeText={set("email")}
              placeholder="you@example.com"
              keyboardType="email-address"
              icon="mail-outline"
              colors={colors}
            />
          </View>

          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 20,
              padding: 20,
              borderWidth: 1,
              borderColor: colors.border,
              marginBottom: 28,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: colors.text,
                marginBottom: 16,
              }}
            >
              Additional Details
            </Text>

            <Field
              label="Home Address"
              value={draft.address}
              onChangeText={set("address")}
              placeholder="House / Street / Barangay"
              icon="location-outline"
              colors={colors}
            />
            <Field
              label="Guardian Name"
              value={draft.guardianName}
              onChangeText={set("guardianName")}
              placeholder="Enter guardian name"
              icon="people-outline"
              colors={colors}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={saving}
            style={{
              backgroundColor: colors.accent,
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 8,
              opacity: saving ? 0.7 : 1,
              marginBottom: 8,
            }}
          >
            <Ionicons name="checkmark-circle" size={18} color="#0F172A" />
            <Text style={{ fontSize: 15, fontWeight: "800", color: "#0F172A" }}>
              {saving ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>

          {/* Info note */}
          <Text
            style={{
              fontSize: 11,
              color: colors.muted,
              textAlign: "center",
              marginTop: 8,
              marginBottom: 20,
            }}
          >
            Changes are saved locally on this device.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
