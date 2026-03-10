import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedLayout() {
  const { user, needsSetup } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (needsSetup) {
    return <Redirect href="/setup" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
