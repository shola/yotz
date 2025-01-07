import { Text, StyleSheet, View } from "react-native";
import GameCard from "@/components/gameCard";
import DiceControl from "@/components/diceControl";

export default function Game() {
  return (
    <View style={styles.body}>
      <GameCard />
      <DiceControl />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
  },
});
