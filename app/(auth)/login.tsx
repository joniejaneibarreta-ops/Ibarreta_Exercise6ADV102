import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
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
};

export default function Login() {
  const { control, handleSubmit } = useForm<FormData>();
  const { login, registered } = useAuth();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    if (!registered) {
      alert("Please register first!");
      return;
    }
    login(data.email);
    router.replace("/home");
  };

  return (
    <LinearGradient colors={["#FFD6E8", "#E5D9FF"]} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>NovelNest</Text>
        <Text style={styles.subtitle}>Welcome back, bookworm!</Text>
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
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="••••••••"
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
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/register")}
          style={styles.registerLink}
        >
          <Text style={styles.footerText}>
            Don't have an account yet?{" "}
            <Text style={styles.registerText}>Register here.</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#3A3A3A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 28,
    borderRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
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
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  button: {
    backgroundColor: "#3A3A3A",
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
    shadowColor: "#3A3A3A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
  registerLink: {
    marginTop: 25,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  registerText: {
    color: "#3A3A3A",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
