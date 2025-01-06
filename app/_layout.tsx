import { Text } from "react-native";
import { Stack, router } from "expo-router";
import { PaperProvider } from "react-native-paper";
import EndGameButton from "@/components/endGameButton";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Welcome to yot-z!" }} />
        <Stack.Screen
          name="game"
          options={{
            title: "Yot-z started",
            headerBackVisible: false,
            headerRight: () => (
              <EndGameButton
                openEndGameModal={() => {
                  router.push("/endGameModal");
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="endGameModal"
          options={{
            title: "End current game?",
            presentation: "modal",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
