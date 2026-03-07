import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { messages } from "../../constants/data";
import { avatar, avatarText, styles } from "../../constants/styles";

export function MessagesTab() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      from: "teacher",
      text: "Maria has been performing well. Keep it up!",
      time: "Yesterday",
    },
    {
      from: "me",
      text: "Thank you, Mr. Reyes! We'll keep working hard.",
      time: "Yesterday",
    },
  ]);

  if (selectedChat) {
    const chat = messages.find((m) => m.id === selectedChat);
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => setSelectedChat(null)}
            style={{
              backgroundColor: COLORS.card,
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: 12,
              paddingVertical: 8,
              paddingHorizontal: 14,
              marginRight: 12,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={14}
              color={COLORS.text}
              style={{ marginRight: 4 }}
            />
            <Text
              style={{ color: COLORS.text, fontSize: 13, fontWeight: "700" }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <View style={[avatar(COLORS.accent, 36), { marginRight: 12 }]}>
            <Text style={avatarText(COLORS.accent)}>{chat.avatar}</Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 14, fontWeight: "700", color: COLORS.text }}
            >
              {chat.sender}
            </Text>
            <Text style={{ fontSize: 12, color: COLORS.muted }}>
              {chat.subject}
            </Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
          {chatMessages.map((m, i) => (
            <View
              key={i}
              style={{
                flexDirection: "row",
                justifyContent: m.from === "me" ? "flex-end" : "flex-start",
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  maxWidth: "80%",
                  backgroundColor:
                    m.from === "me" ? COLORS.accent : COLORS.card,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 18,
                  borderBottomRightRadius: m.from === "me" ? 4 : 18,
                  borderBottomLeftRadius: m.from !== "me" ? 4 : 18,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: m.from === "me" ? "#0F172A" : COLORS.text,
                    fontWeight: m.from === "me" ? "700" : "400",
                  }}
                >
                  {m.text}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color:
                      m.from === "me" ? "rgba(15,23,42,0.6)" : COLORS.muted,
                    marginTop: 4,
                    textAlign: "right",
                  }}
                >
                  {m.time}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View
          style={{
            padding: 16,
            flexDirection: "row",
            borderTopWidth: 1,
            borderColor: COLORS.border,
            alignItems: "center",
          }}
        >
          <TextInput
            value={chatInput}
            onChangeText={setChatInput}
            placeholderTextColor={COLORS.muted}
            placeholder="Type a message..."
            style={{
              flex: 1,
              backgroundColor: COLORS.card,
              borderWidth: 1,
              borderColor: COLORS.border,
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 16,
              color: COLORS.text,
              fontSize: 13,
              marginRight: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              if (chatInput.trim()) {
                setChatMessages([
                  ...chatMessages,
                  { from: "me", text: chatInput, time: "Now" },
                ]);
                setChatInput("");
              }
            }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: COLORS.accent,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="send" size={18} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.pagePad}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.h1}>Messages</Text>
        <Text style={styles.p}>Teacher–Parent Communication</Text>
      </View>
      {messages.map((m) => (
        <TouchableOpacity
          key={m.id}
          onPress={() => setSelectedChat(m.id)}
          style={[
            styles.card,
            { marginBottom: 10, flexDirection: "row", alignItems: "center" },
          ]}
        >
          <View style={{ position: "relative", marginRight: 14 }}>
            <View style={avatar(COLORS.accent, 44)}>
              <Text style={avatarText(COLORS.accent)}>{m.avatar}</Text>
            </View>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "700", color: COLORS.text }}
              >
                {m.sender}
              </Text>
              <Text style={{ fontSize: 11, color: COLORS.muted }}>
                {m.time}
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: COLORS.muted }}>
              {m.lastMsg}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
