import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { control, handleSubmit, watch } = useForm<FormData>();
  const { register } = useAuth();
  const router = useRouter();

  const password = watch("password");

  const onSubmit = (data: FormData) => {
    register(data.email);
    router.push("/setup");
  };

  return (
    <LinearGradient colors={["#FFD6E8", "#E5D9FF"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Join NovelNest</Text>
          <Text style={styles.subtitle}>Start your reading journey today.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email Address</Text>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="your@email.com"
                placeholderTextColor="#999"
                style={styles.input}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
              />
            )}
          />

          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password required", minLength: 6 }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Minimum 6 characters"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Text style={styles.label}>Confirm Password</Text>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Repeat password"
                placeholderTextColor="#999"
                secureTextEntry
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/login")}
            style={styles.loginLink}
          >
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={styles.linkText}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 24 },
  headerContainer: { marginBottom: 30, alignItems: "center" },
  title: { fontSize: 32, fontWeight: "800", color: "#3A3A3A" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 8 },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 24,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3A3A3A",
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  loginLink: { marginTop: 20, alignItems: "center" },
  footerText: { fontSize: 14, color: "#666" },
  linkText: {
    color: "#3A3A3A",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
