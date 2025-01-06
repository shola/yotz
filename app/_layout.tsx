import { Text } from "react-native";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Welcome to yot-z!" }} />
        <Stack.Screen name="game" options={{ title: "Yot-z started" }} />
      </Stack>
    </PaperProvider>
  );
}
