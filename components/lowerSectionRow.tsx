import type { GameCardStyles } from "@/components/gameCardStyles";
import React from "react";
import type { ReactNode } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-paper";
import type { DiceContextType } from "@/components/diceContext";
import { Updater, useImmer } from "use-immer";
import { isKey } from "@/components/scores";
import type { ScoreKeepers } from "@/components/scores";

interface LowerSectionRow {
  styles: GameCardStyles;
  firstCol: ReactNode;
  secondColLabel: string;
  score: ScoreKeepers["lower"];
  scoreKey: keyof ScoreKeepers["lower"];
  updateScoreKeepers: Updater<ScoreKeepers>;
  shuffleDiceValues: DiceContextType["shuffleDiceValues"];
}
export function LowerSectionRow({
  styles,
  firstCol,
  secondColLabel,
  score,
  scoreKey,
  updateScoreKeepers,
  shuffleDiceValues,
}: LowerSectionRow) {
  return (
    <View style={styles.row}>
      {firstCol}
      <View style={styles.col2StyleNormal}>
        <Text style={styles.col2TextStyleXs}>{secondColLabel}</Text>
      </View>
      <View style={styles.col3StyleNormal}>
        <Text
          style={{
            color: score[scoreKey].final ? "black" : "red",
          }}
          onPress={() => {
            (() =>
              updateScoreKeepers((draft) => {
                draft.lower[scoreKey].final = true;
              }))();
            shuffleDiceValues();
          }}
        >
          {score[scoreKey].val}
        </Text>
      </View>
    </View>
  );
}
