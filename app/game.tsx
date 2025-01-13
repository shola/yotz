import { Text, StyleSheet, View } from "react-native";
import { useState, createContext, SetStateAction, Dispatch } from "react";
import GameCard from "@/components/gameCard";
import DiceControl from "@/components/diceControl";
import { DiceContext, shuffleDiceValues } from "@/components/diceContext";
import type { DieValue } from "@/components/diceContext";

export default function Game() {
  const [diceValues, setDiceValues] = useState<DieValue[]>(shuffleDiceValues);

  return (
    <View style={styles.body}>
      <DiceContext.Provider
        value={{
          diceValues,
          setDiceValues,
          shuffleDiceValues: () => setDiceValues(shuffleDiceValues()),
        }}
      >
        <GameCard />
        <DiceControl />
      </DiceContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
  },
});
