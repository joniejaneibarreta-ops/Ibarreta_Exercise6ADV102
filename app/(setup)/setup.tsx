import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

type FormData = {
  firstName: string;
  lastName: string;
  nickname: string;
};

export default function Setup() {
  const { control, handleSubmit } = useForm<FormData>();
  const { updateProfile, needsSetup } = useAuth();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  if (!needsSetup) {
    return <Redirect href="/home" />;
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Needed",
        "We need access to your photos to set a profile picture.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = (data: FormData) => {
    updateProfile(data.nickname, image);
    router.replace("/home");
  };

  return (
    <LinearGradient colors={["#D6F0FF", "#E5D9FF"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Almost there!</Text>
          <Text style={styles.subtitle}>Let's personalize your profile.</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.imagePickerContainer}
            onPress={pickImage}
            activeOpacity={0.7}
          >
            <View style={styles.imagePlaceholder}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImage} />
              ) : (
                <View style={styles.addPhotoIcon}>
                  <Text style={styles.imagePlaceholderText}>Add Photo</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#999"
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#999"
                style={styles.input}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="nickname"
            rules={{ required: "Nickname is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Nickname (Display Name)"
                placeholderTextColor="#999"
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
            <Text style={styles.buttonText}>Finish Setup</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: "center", padding: 24 },
  headerContainer: { marginBottom: 30, alignItems: "center" },
  title: { fontSize: 32, fontWeight: "800", color: "#3A3A3A" },
  subtitle: { fontSize: 16, color: "#666", marginTop: 8 },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 24,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  imagePickerContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  imagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  addPhotoIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3A3A3A",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    fontSize: 16,
    color: "#3A3A3A",
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
});
