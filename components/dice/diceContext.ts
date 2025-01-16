import { createContext, SetStateAction, Dispatch } from "react";

export type DieValue = 1 | 2 | 3 | 4 | 5 | 6;
export const DEFAULT_DICE_VALUES: DieValue[] = [1, 2, 3, 4, 5];

export interface DiceContextType {
  diceValues: DieValue[];
  setDiceValues: Dispatch<SetStateAction<DieValue[]>>;
  shuffleDiceValues: () => void;
}

export const DiceContext = createContext<DiceContextType>({
  diceValues: DEFAULT_DICE_VALUES,
  setDiceValues: () => {},
  shuffleDiceValues: () => {},
});

export function shuffleDiceValues() {
  const dice: DieValue[] = [1, 2, 3, 4, 5, 6];
  const shuffled: DieValue[] = [];
  for (let i = 0; i < 5; i++) {
    const randIdx = Math.floor(Math.random() * 6);
    shuffled.push(dice[randIdx]);
  }
  return shuffled;
}
