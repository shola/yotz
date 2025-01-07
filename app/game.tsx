import { Text, StyleSheet, View } from "react-native";
import GameCard from "@/components/gameCard";

export default function Game() {
  return <GameCard />;
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
