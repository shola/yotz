import { Text, StyleSheet, View } from "react-native";
import { useState, createContext, SetStateAction, Dispatch } from "react";
import GameCard from "@/components/gameCard";
import DiceControl from "@/components/diceControl";

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6;
const DEFAULT_DICE_VALUES: DieValue[] = [1, 2, 3, 4, 5];

export interface DiceContextType {
  diceValues: DieValue[];
  setDiceValues: Dispatch<SetStateAction<DieValue[]>>;
}

export const DiceContext = createContext<DiceContextType>({
  diceValues: DEFAULT_DICE_VALUES,
  setDiceValues: () => {},
});

export default function Game() {
  const [diceValues, setDiceValues] = useState<DieValue[]>(DEFAULT_DICE_VALUES);

  return (
    <View style={styles.body}>
      <GameCard />
      <DiceContext.Provider
        value={{
          diceValues,
          setDiceValues,
        }}
      >
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
