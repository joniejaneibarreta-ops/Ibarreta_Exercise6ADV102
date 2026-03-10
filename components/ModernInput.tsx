import { BlurView } from "expo-blur";
import { StyleSheet, TextInput } from "react-native";

export default function ModernInput({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: any) {
  return (
    <BlurView intensity={40} tint="light" style={styles.wrapper}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#888"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 15,
  },
  input: {
    padding: 16,
    fontSize: 16,
  },
});
