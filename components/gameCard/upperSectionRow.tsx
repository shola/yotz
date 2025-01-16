import type { GameCardStyles } from "@/components/gameCard/gameCardStyles";
import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-paper";
import type { DiceContextType } from "@/components/dice/diceContext";
import { Updater, useImmer } from "use-immer";
import { isKey } from "@/components/gameCardState/scores";
import type { ScoreKeepers } from "@/components/gameCardState/scores";

interface UpperSectionRow {
  styles: GameCardStyles;
  label: string;
  num: number;
  scoreKeepers: ScoreKeepers;
  updateScoreKeepers: Updater<ScoreKeepers>;
  shuffleDiceValues: DiceContextType["shuffleDiceValues"];
}

export function UpperSectionRow({
  styles,
  label,
  num,
  scoreKeepers,
  updateScoreKeepers,
  shuffleDiceValues,
}: UpperSectionRow) {
  const key = label.toLowerCase();
  if (!isKey(scoreKeepers.upper, key)) {
    return <Text>Key mismatch: {key}</Text>;
  }

  return (
    <View id={`upper-section-row-${num}`}>
      <View style={styles.row}>
        <View style={styles.col1StyleNormal}>
          <Text style={styles["text-sm"]}>{label}</Text>
          <View style={styles.diceIconGroup}>
            <Icon source={`dice-${num}-outline`} size={30} />
            <Text style={key === "aces" && { marginLeft: 2 }}>= {num}</Text>
          </View>
        </View>
        <View style={styles.col2StyleNormal}>
          <Text style={styles.col2TextStyleSm}>Count and add only {label}</Text>
        </View>
        <View style={styles.col3StyleNormal}>
          <Text
            style={{
              color: scoreKeepers.upper[key].final ? "black" : "red",
            }}
            onPress={() => {
              (() =>
                updateScoreKeepers((draft) => {
                  draft.upper[key].final = true;
                }))();
              shuffleDiceValues();
            }}
          >
            {scoreKeepers.upper[key].val}
          </Text>
        </View>
      </View>
    </View>
  );
}
