import type { GameCardStyles } from "@/components/gameCard/gameCardStyles";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Icon } from "react-native-paper";
import type { DiceContextType } from "@/components/dice/diceContext";
import { Updater, useImmer } from "use-immer";
import { isKey } from "@/components/gameCardState/scores";
import type { ScoreKeepers } from "@/components/gameCardState/scores";

interface BonusCheckMark {
  styles: GameCardStyles;
  matchingNum: 100 | 200 | 300 | 400;
  yotzBonus: ScoreKeepers["lower"]["yotz_bonus"];
  updateScoreKeepers: Updater<ScoreKeepers>;
}
function BonusCheckMark({
  styles,
  matchingNum,
  yotzBonus,
  updateScoreKeepers,
}: BonusCheckMark) {
  // TODO: consider some messaging directing the player what to do in the event of a rare yotz bonus!
  return (
    <View style={styles.bonusCell}>
      {yotzBonus.val >= matchingNum && (
        <View style={{ transform: [{ scaleX: 0.7 }, { scaleY: 2 }] }}>
          <Pressable
            onPress={() =>
              (() =>
                updateScoreKeepers((draft) => {
                  draft.lower.yotz_bonus.bonusInPlay = false;
                }))()
            }
            disabled={!yotzBonus.bonusInPlay}
          >
            <Icon
              color={
                yotzBonus.val === matchingNum && yotzBonus.bonusInPlay
                  ? "red"
                  : ""
              }
              source="check"
              size={20}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

export function BonusCheckMarks(
  styles: GameCardStyles,
  yotzBonus: ScoreKeepers["lower"]["yotz_bonus"],
  updateScoreKeepers: Updater<ScoreKeepers>
) {
  const matchingNums: BonusCheckMark["matchingNum"][] = [100, 200, 300, 400];
  return matchingNums.map((matchingNum) => (
    <BonusCheckMark
      styles={styles}
      key={`bonus-check-mark-${matchingNum}`}
      matchingNum={matchingNum}
      yotzBonus={yotzBonus}
      updateScoreKeepers={updateScoreKeepers}
    />
  ));
}
