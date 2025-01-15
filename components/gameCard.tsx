import React, { ReactNode, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Button, Icon } from "react-native-paper";
import type { DiceContextType, DieValue } from "@/components/diceContext";
import { DiceContext } from "@/components/diceContext";
import { Updater, useImmer } from "use-immer";
import {
  initScoreKeepers,
  groupByVal,
  setAllTempScores,
  isKey,
  updateYotzBonus,
} from "@/components/scores";
import type { ScoreKeepers } from "@/components/scores";

function createStyles() {
  const col1HeaderStyle = { ...styles.col1Header, ...styles.centerAlignView };

  const col1StyleNormal = {
    ...styles.col1,
    ...styles.centerAlignView,
  };
  const col2StyleNormal = { ...styles.col2, ...styles.centerAlignView };
  const col3StyleNormal = { ...styles.col3, ...styles.centerAlignView };

  const col2TextStyleSm = {
    ...styles["text-sm"],
    ...styles.centerAlignText,
  };
  const col2TextStyleXs = {
    ...styles["text-xs"],
    ...styles.centerAlignText,
  };
  return {
    col1HeaderStyle,
    col1StyleNormal,
    col2StyleNormal,
    col3StyleNormal,
    col2TextStyleSm,
    col2TextStyleXs,
  };
}

function upperSectionRowParent() {}
interface UpperSectionRowBase {
  label: string;
  num: number;
  scoreKeepers: ScoreKeepers;
  updateScoreKeepers: Updater<ScoreKeepers>;
  shuffleDiceValues: DiceContextType["shuffleDiceValues"];
}
function UpperSectionRowBase({
  label,
  num,
  scoreKeepers,
  updateScoreKeepers,
  shuffleDiceValues,
}: UpperSectionRowBase) {
  const key = label.toLowerCase();
  if (!isKey(scoreKeepers.upper, key)) {
    return <Text>Key mismatch: {key}</Text>;
  }
  const {
    col1HeaderStyle,
    col1StyleNormal,
    col2StyleNormal,
    col3StyleNormal,
    col2TextStyleSm,
  } = createStyles();

  return (
    <View id={`upper-section-row-${num}`}>
      <View style={styles.row}>
        <View style={col1StyleNormal}>
          <Text style={styles["text-sm"]}>{label}</Text>
          <View style={styles.diceIconGroup}>
            <Icon source={`dice-${num}-outline`} size={30} />
            <Text style={key === "aces" && { marginLeft: 2 }}>= {num}</Text>
          </View>
        </View>
        <View style={col2StyleNormal}>
          <Text style={col2TextStyleSm}>Count and add only {label}</Text>
        </View>
        <View style={{ ...col3StyleNormal, justifyContent: "center" }}>
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

interface BonusCheckMark {
  matchingNum: 100 | 200 | 300 | 400;
  yotzBonus: ScoreKeepers["lower"]["yotz_bonus"];
  updateScoreKeepers: Updater<ScoreKeepers>;
}
function BonusCheckMark({
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
                  draft.lower.yotz_bonus.bonusInPlay = true;
                }))()
            }
            disabled={yotzBonus.bonusInPlay}
          >
            <Icon
              color={
                yotzBonus.val === matchingNum && !yotzBonus.bonusInPlay
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

function BonusCheckMarks(
  yotzBonus: ScoreKeepers["lower"]["yotz_bonus"],
  updateScoreKeepers: Updater<ScoreKeepers>
) {
  const matchingNums: BonusCheckMark["matchingNum"][] = [100, 200, 300, 400];
  return matchingNums.map((matchingNum) => (
    <BonusCheckMark
      key={`bonus-check-mark-${matchingNum}`}
      matchingNum={matchingNum}
      yotzBonus={yotzBonus}
      updateScoreKeepers={updateScoreKeepers}
    />
  ));
}

interface RowWithCenterArrowIcon {
  firstColumn: ReactNode;
  value: number;
}
function RowWithCenterArrowIcon({
  firstColumn,
  value,
}: RowWithCenterArrowIcon) {
  const { col1StyleNormal, col2StyleNormal, col3StyleNormal } = createStyles();
  return (
    <View style={styles.row}>
      {firstColumn}
      <View style={col2StyleNormal}>
        <View style={styles.arrow}>
          <Icon source="arrow-right-thin" size={30} />
        </View>
      </View>
      <View style={{ ...col3StyleNormal, justifyContent: "center" }}>
        <Text>{value}</Text>
      </View>
    </View>
  );
}

export default function GameCard() {
  const { diceValues, shuffleDiceValues } = useContext(DiceContext);
  const [scoreKeepers, updateScoreKeepers] = useImmer(initScoreKeepers);
  const {
    col1HeaderStyle,
    col1StyleNormal,
    col2StyleNormal,
    col3StyleNormal,
    col2TextStyleSm,
    col2TextStyleXs,
  } = createStyles();

  const UpperSectionRow = ({ label, num }: { label: string; num: number }) => (
    <UpperSectionRowBase
      label={label}
      num={num}
      scoreKeepers={scoreKeepers}
      updateScoreKeepers={updateScoreKeepers}
      shuffleDiceValues={shuffleDiceValues}
    />
  );

  // TODO: combine these functions together into one? it seems weird to call the same
  // function from 2 different use effects...
  useEffect(() => {
    setAllTempScores(diceValues, scoreKeepers, updateScoreKeepers);
    updateYotzBonus(diceValues, scoreKeepers, updateScoreKeepers);
  }, [diceValues]);

  useEffect(() => {
    setAllTempScores(diceValues, scoreKeepers, updateScoreKeepers);
  }, [scoreKeepers]);

  return (
    <View style={styles.card}>
      <View id="upper-section">
        <View id="upper-section-header-row">
          <View style={styles.row}>
            <View style={col1HeaderStyle}>
              <Text style={styles.centerAlignText}>UPPER SECTION</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={styles.centerAlignText}>HOW TO SCORE</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text style={styles.centerAlignText}>Game #1</Text>
            </View>
          </View>
        </View>
        <UpperSectionRow label="Aces" num={1} />
        <UpperSectionRow label="Twos" num={2} />
        <UpperSectionRow label="Threes" num={3} />
        <UpperSectionRow label="Fours" num={4} />
        <UpperSectionRow label="Fives" num={5} />
        <UpperSectionRow label="Sixes" num={6} />
        <View id="upper-section-row-7">
          <RowWithCenterArrowIcon
            firstColumn={
              <View style={col1StyleNormal}>
                <Text style={styles["text-md"]}>TOTAL SCORE</Text>
              </View>
            }
            value={scoreKeepers.upperAggregate.prelim_total.val}
          />
        </View>
        <View id="upper-section-row-8">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              {/* This score can not be clicked on */}
              <Text style={styles["text-md"]}>Bonus{"  "}</Text>
              <Text style={{ ...styles["text-xs"], width: 55 }}>
                If total score is 63 or over
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>SCORE 35</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text>{scoreKeepers.upperAggregate.bonus.val}</Text>
            </View>
          </View>
        </View>
        <View id="upper-section-row-9">
          <RowWithCenterArrowIcon
            firstColumn={
              <View style={col1StyleNormal}>
                <Text style={styles["text-md"]}>Total{"    "}</Text>
                <Text style={{ ...styles["text-xs"], width: 55 }}>
                  Of Upper Section
                </Text>
              </View>
            }
            value={scoreKeepers.upperAggregate.total.val}
          />
        </View>
      </View>
      <View id="lower-section">
        <View id="lower-section-header-row">
          <View style={styles.row}>
            <View>
              <Text>LOWER SECTION</Text>
            </View>
          </View>
        </View>
        <View id="lower-section-row-1">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={{ ...styles["text-sm"], width: 30 }}>
                3 of a kind
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Add Total of All Dice</Text>
            </View>
            <View style={{ ...col3StyleNormal, justifyContent: "center" }}>
              <Text
                style={{
                  color: scoreKeepers.lower.trips.final ? "black" : "red",
                }}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.trips.final = true;
                    }))();
                  shuffleDiceValues();
                }}
              >
                {scoreKeepers.lower.trips.val}
              </Text>
            </View>
          </View>
        </View>
        <View id="lower-section-row-2">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={{ ...styles["text-sm"], width: 30 }}>
                4 of a kind
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Add Total of All Dice</Text>
            </View>
            <View style={{ ...col3StyleNormal, justifyContent: "center" }}>
              <Text
                style={{
                  color: scoreKeepers.lower.quads.final ? "black" : "red",
                }}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.quads.final = true;
                    }))();
                  shuffleDiceValues();
                }}
              >
                {scoreKeepers.lower.quads.val}
              </Text>
            </View>
          </View>
        </View>
        <View id="lower-section-row-3">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={{ ...styles["text-sm"], width: 40 }}>
                Full House
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Score 25</Text>
            </View>
            <View style={{ ...col3StyleNormal, justifyContent: "center" }}>
              <Text
                style={{
                  color: scoreKeepers.lower.full_house.final ? "black" : "red",
                }}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.full_house.final = true;
                    }))();
                  shuffleDiceValues();
                }}
              >
                {scoreKeepers.lower.full_house.val}
              </Text>
            </View>
          </View>
        </View>
        <View id="lower-section-row-4">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={{ ...styles["text-sm"], width: 40 }}>
                Sm Straight
              </Text>
              <Text
                style={{ ...styles["text-xs"], width: 50, textAlign: "right" }}
              >
                (Sequence) of 4
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Score 30</Text>
            </View>
            <View style={{ ...col3StyleNormal, justifyContent: "center" }}>
              <Text
                style={{
                  color: scoreKeepers.lower.sm_straight.final ? "black" : "red",
                }}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.sm_straight.final = true;
                    }))();
                  shuffleDiceValues();
                }}
              >
                {scoreKeepers.lower.sm_straight.val}
              </Text>
            </View>
          </View>
        </View>
        <View id="lower-section-row-5">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={{ ...styles["text-sm"], width: 40 }}>
                Lg Straight
              </Text>
              <Text
                style={{ ...styles["text-xs"], width: 50, textAlign: "right" }}
              >
                (Sequence) of 5
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Score 40</Text>
            </View>
            <View style={{ ...col3StyleNormal, justifyContent: "center" }}>
              <Text
                style={{
                  color: scoreKeepers.lower.lg_straight.final ? "black" : "red",
                }}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.lg_straight.final = true;
                    }))();
                  shuffleDiceValues();
                }}
              >
                {scoreKeepers.lower.lg_straight.val}
              </Text>
            </View>
          </View>
        </View>
        <View id="lower-section-row-6">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-md"]}>YOT-Z{"     "}</Text>
              <Text style={{ ...styles["text-xs"], width: 40 }}>
                5 of a kind
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Score 50</Text>
            </View>
            <View style={{ ...col3StyleNormal, justifyContent: "center" }}>
              <Text
                style={{
                  color: scoreKeepers.lower.yotz.final ? "black" : "red",
                }}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.yotz.final = true;
                    }))();
                  shuffleDiceValues();
                }}
              >
                {scoreKeepers.lower.yotz.val}
              </Text>
            </View>
          </View>
        </View>
        <View id="lower-section-row-7">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-md"]}>Chance</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Score Total Of All 5 Dice</Text>
            </View>
            <View style={{ ...col3StyleNormal, justifyContent: "center" }}>
              <Text
                style={{
                  color: scoreKeepers.lower.chance.final ? "black" : "red",
                }}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.chance.final = true;
                    }))();
                  shuffleDiceValues();
                }}
              >
                {scoreKeepers.lower.chance.val}
              </Text>
            </View>
          </View>
        </View>
        <View id="lower-section-row-8">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text
                style={{
                  ...styles["text-md"],
                  width: 50,
                  textAlign: "center",
                  margin: "auto",
                }}
              >
                YOT-Z BONUS
              </Text>
            </View>
            <View>
              <View style={styles.row}>
                <View style={{ ...col2StyleNormal, flexDirection: "row" }}>
                  <Icon source="check" size={15} />
                  <Text style={{ ...col2TextStyleXs, width: 50 }}>
                    FOR EACH BONUS
                  </Text>
                </View>
                <View
                  style={{
                    ...col3StyleNormal,
                    borderWidth: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    flexDirection: "row",
                  }}
                >
                  {BonusCheckMarks(
                    scoreKeepers.lower.yotz_bonus,
                    updateScoreKeepers
                  )}
                </View>
              </View>
              <View style={styles.row}>
                <View style={{ ...col2StyleNormal, flexDirection: "row" }}>
                  <Text style={{ ...col2TextStyleXs, width: 50 }}>
                    SCORE 100 PER
                  </Text>
                  <Icon source="check" size={15} />
                </View>
                <View style={col3StyleNormal}>
                  <View>
                    <Text
                      style={{
                        color: scoreKeepers.lower.yotz_bonus.bonusInPlay
                          ? "black"
                          : "red",
                      }}
                    >
                      {scoreKeepers.lower.yotz_bonus.val}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View id="lower-section-row-9">
          <RowWithCenterArrowIcon
            firstColumn={
              <View style={col1StyleNormal}>
                <Text style={styles["text-md"]}>TOTAL{"    "}</Text>
                <Text style={{ ...styles["text-xs"], width: 40 }}>
                  Of Lower Section
                </Text>
              </View>
            }
            value={scoreKeepers.lowerAggregate.prelim_total.val}
          />
        </View>
        <View id="lower-section-row-10">
          <RowWithCenterArrowIcon
            firstColumn={
              <View style={col1StyleNormal}>
                <Text style={styles["text-md"]}>TOTAL{"    "}</Text>
                <Text style={{ ...styles["text-xs"], width: 40 }}>
                  Of Upper Section
                </Text>
              </View>
            }
            value={scoreKeepers.lowerAggregate.upper_total.val}
          />
        </View>
        <View id="lower-section-row-11">
          <RowWithCenterArrowIcon
            firstColumn={
              <View style={col1StyleNormal}>
                <Text style={styles["text-md"]}>GRAND TOTAL</Text>
              </View>
            }
            value={scoreKeepers.lowerAggregate.grand_total.val}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  col1Header: {
    width: 100,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  col1: {
    width: 100,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col2: {
    width: 85,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  col3: {
    width: 50,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  dice: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  "text-xs": {
    fontSize: 8,
  },
  "text-sm": {
    fontSize: 10,
  },
  "text-md": {
    fontSize: 12,
  },
  leftAlign: {
    textAlign: "left",
  },
  centerAlignText: {
    textAlign: "center",
  },
  centerAlignView: {
    display: "flex",
    alignItems: "center",
  },
  rightAlign: {
    textAlign: "right",
  },
  bonusCell: { flex: 1, borderWidth: 0.5, height: "100%" },
  diceIconGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: { transform: [{ scaleX: 4 }] },
});
