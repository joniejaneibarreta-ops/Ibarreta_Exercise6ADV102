import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function Home() {
  const { user, logout } = useAuth();
  const { themeColors, themeName, changeTheme } = useTheme();
  const router = useRouter();

  if (!user) return <Redirect href="/login" />;

  const books = [
    { title: "The Whispering Library", genre: "Mystery" },
    { title: "Moonlight Chronicles", genre: "Fantasy" },
    { title: "The Lost Kingdom", genre: "Adventure" },
    { title: "The Silent Spellbook", genre: "Fantasy" },
  ];

  const getThemeIcon = () => {
    let iconName: React.ComponentProps<typeof Ionicons>["name"];

    switch (themeName) {
      case "midnightLibrary":
        iconName = "sunny";
        break;
      case "sunsetRead":
        iconName = "leaf";
        break;
      default:
        iconName = "moon";
    }
    return iconName;
  };

  return (
    <LinearGradient colors={themeColors} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.appBrand}>NovelNest</Text>

        <View style={styles.header}>
          <View style={styles.userInfo}>
            {user.profileImage && (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.avatar}
              />
            )}
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.title}>{user.nickname} 📚</Text>
            </View>
          </View>

          <TouchableOpacity onPress={changeTheme} style={styles.iconButton}>
            <Ionicons name={getThemeIcon()} size={24} color="#3A3A3A" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionSubtitle}>Featured Stories</Text>

        <View style={styles.bookGrid}>
          {books.map((book, index) => (
            <View key={index} style={styles.bookCard}>
              <View style={styles.bookCoverPlaceholder}>
                <Text style={styles.bookEmoji}>
                  {index % 2 === 0 ? "📖" : "✨"}
                </Text>
              </View>
              <Text style={styles.bookTitle} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={styles.bookGenre}>{book.genre}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            logout();
            router.replace("/login");
          }}
        >
          <Text style={styles.secondaryButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  appBrand: {
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: "rgba(58, 58, 58, 0.4)",
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#3A3A3A",
  },
  iconButton: {
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 12,
    borderRadius: 15,
  },
  sectionSubtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3A3A3A",
    marginBottom: 20,
  },
  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  bookCard: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: (width - 64) / 2,
    padding: 15,
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  bookCoverPlaceholder: {
    height: 120,
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  bookEmoji: {
    fontSize: 40,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3A3A3A",
    marginBottom: 4,
  },
  bookGenre: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
  },
  secondaryButton: {
    marginTop: 20,
    padding: 15,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FF6B6B",
    fontWeight: "600",
    fontSize: 16,
  },
});
