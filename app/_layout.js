import { Stack } from "expo-router";
import AppProvider from "../src/providers/apollo";

const RootLayout = () => {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
};

export default RootLayout;
