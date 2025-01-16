import React, { ReactNode, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Icon } from "react-native-paper";
import type { DiceContextType } from "@/components/diceContext";
import { DiceContext } from "@/components/diceContext";
import { Updater, useImmer } from "use-immer";
import {
  initScoreKeepers,
  isKey,
  setIndependentTempScores,
  setAggregateTempScores,
} from "@/components/scores";
import type { ScoreKeepers } from "@/components/scores";
import styles from "@/components/gameCardStyles";

interface UpperSectionRow {
  styles: GameCardStyles;
  label: string;
  num: number;
  scoreKeepers: ScoreKeepers;
  updateScoreKeepers: Updater<ScoreKeepers>;
  shuffleDiceValues: DiceContextType["shuffleDiceValues"];
}
function UpperSectionRow({
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

interface LowerSectionRow {
  styles: GameCardStyles;
  firstCol: ReactNode;
  secondColLabel: string;
  score: ScoreKeepers["lower"];
  scoreKey: keyof ScoreKeepers["lower"];
  updateScoreKeepers: Updater<ScoreKeepers>;
  shuffleDiceValues: DiceContextType["shuffleDiceValues"];
}
function LowerSectionRow({
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

type GameCardStyles = typeof styles;
interface RowWithCenterArrowIcon {
  firstColumn: ReactNode;
  value: number;
  styles: GameCardStyles;
}
// QUESTION: should these components take a style object?
// QUESTION: what's the best way to share related styles in React Native?
function RowWithCenterArrowIcon({
  firstColumn,
  value,
  styles,
}: RowWithCenterArrowIcon) {
  return (
    <View style={styles.row}>
      {firstColumn}
      <View style={styles.col2StyleNormal}>
        <View style={styles.arrow}>
          <Icon source="arrow-right-thin" size={30} />
        </View>
      </View>
      <View style={styles.col3StyleNormal}>
        <Text>{value}</Text>
      </View>
    </View>
  );
}

export default function GameCard() {
  const { diceValues, shuffleDiceValues } = useContext(DiceContext);
  const [scoreKeepers, updateScoreKeepers] = useImmer(initScoreKeepers);

  useEffect(() => {
    setIndependentTempScores(diceValues, scoreKeepers, updateScoreKeepers);
  }, [diceValues]);

  useEffect(() => {
    setAggregateTempScores(diceValues, scoreKeepers, updateScoreKeepers);
  }, [scoreKeepers]);

  return (
    <View style={styles.card}>
      <View id="upper-section">
        <View id="upper-section-header-row">
          <View style={styles.row}>
            <View style={styles.col1Header}>
              <Text style={styles.centerAlignText}>UPPER SECTION</Text>
            </View>
            <View style={styles.col2StyleNormal}>
              <Text style={styles.centerAlignText}>HOW TO SCORE</Text>
            </View>
            <View style={styles.col3StyleNormal}>
              <Text style={styles.centerAlignText}>Game #1</Text>
            </View>
          </View>
        </View>
        <UpperSectionRow
          styles={styles}
          label="Aces"
          num={1}
          scoreKeepers={scoreKeepers}
          updateScoreKeepers={updateScoreKeepers}
          shuffleDiceValues={shuffleDiceValues}
        />
        <UpperSectionRow
          styles={styles}
          label="Twos"
          num={2}
          scoreKeepers={scoreKeepers}
          updateScoreKeepers={updateScoreKeepers}
          shuffleDiceValues={shuffleDiceValues}
        />
        <UpperSectionRow
          styles={styles}
          label="Threes"
          num={3}
          scoreKeepers={scoreKeepers}
          updateScoreKeepers={updateScoreKeepers}
          shuffleDiceValues={shuffleDiceValues}
        />
        <UpperSectionRow
          styles={styles}
          label="Fours"
          num={4}
          scoreKeepers={scoreKeepers}
          updateScoreKeepers={updateScoreKeepers}
          shuffleDiceValues={shuffleDiceValues}
        />
        <UpperSectionRow
          styles={styles}
          label="Fives"
          num={5}
          scoreKeepers={scoreKeepers}
          updateScoreKeepers={updateScoreKeepers}
          shuffleDiceValues={shuffleDiceValues}
        />
        <UpperSectionRow
          styles={styles}
          label="Sixes"
          num={6}
          scoreKeepers={scoreKeepers}
          updateScoreKeepers={updateScoreKeepers}
          shuffleDiceValues={shuffleDiceValues}
        />
        <View id="upper-section-row-7">
          <RowWithCenterArrowIcon
            styles={styles}
            firstColumn={
              <View style={styles.col1StyleNormal}>
                <Text style={styles["text-md"]}>TOTAL SCORE</Text>
              </View>
            }
            value={scoreKeepers.upperAggregate.prelim_total.val}
          />
        </View>
        <View id="upper-section-row-8">
          <View style={styles.row}>
            <View style={styles.col1StyleNormal}>
              <Text style={styles["text-md"]}>Bonus{"  "}</Text>
              <Text style={{ ...styles["text-xs"], width: 55 }}>
                If total score is 63 or over
              </Text>
            </View>
            <View style={styles.col2StyleNormal}>
              <Text style={styles.col2TextStyleSm}>SCORE 35</Text>
            </View>
            <View style={styles.col3StyleNormal}>
              <Text>{scoreKeepers.upperAggregate.bonus.val}</Text>
            </View>
          </View>
        </View>
        <View id="upper-section-row-9">
          <RowWithCenterArrowIcon
            styles={styles}
            firstColumn={
              <View style={styles.col1StyleNormal}>
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
          <LowerSectionRow
            styles={styles}
            firstCol={
              <View style={styles.col1StyleNormal}>
                <Text style={{ ...styles["text-sm"], width: 30 }}>
                  3 of a kind
                </Text>
              </View>
            }
            secondColLabel="Add Total of All Dice"
            score={scoreKeepers.lower}
            scoreKey="trips"
            updateScoreKeepers={updateScoreKeepers}
            shuffleDiceValues={shuffleDiceValues}
          />
        </View>
        <View id="lower-section-row-2">
          <LowerSectionRow
            styles={styles}
            firstCol={
              <View style={styles.col1StyleNormal}>
                <Text style={{ ...styles["text-sm"], width: 30 }}>
                  4 of a kind
                </Text>
              </View>
            }
            secondColLabel="Add Total of All Dice"
            score={scoreKeepers.lower}
            scoreKey="quads"
            updateScoreKeepers={updateScoreKeepers}
            shuffleDiceValues={shuffleDiceValues}
          />
        </View>
        <View id="lower-section-row-3">
          <LowerSectionRow
            styles={styles}
            firstCol={
              <View style={styles.col1StyleNormal}>
                <Text style={{ ...styles["text-sm"], width: 40 }}>
                  Full House
                </Text>
              </View>
            }
            secondColLabel="Score 25"
            score={scoreKeepers.lower}
            scoreKey="full_house"
            updateScoreKeepers={updateScoreKeepers}
            shuffleDiceValues={shuffleDiceValues}
          />
        </View>
        <View id="lower-section-row-4">
          <LowerSectionRow
            styles={styles}
            firstCol={
              <View style={styles.col1StyleNormal}>
                <Text style={{ ...styles["text-sm"], width: 40 }}>
                  Sm Straight
                </Text>
                <Text
                  style={{
                    ...styles["text-xs"],
                    width: 50,
                    textAlign: "right",
                  }}
                >
                  (Sequence) of 4
                </Text>
              </View>
            }
            secondColLabel="Score 30"
            score={scoreKeepers.lower}
            scoreKey="sm_straight"
            updateScoreKeepers={updateScoreKeepers}
            shuffleDiceValues={shuffleDiceValues}
          />
        </View>
        <View id="lower-section-row-5">
          <LowerSectionRow
            styles={styles}
            firstCol={
              <View style={styles.col1StyleNormal}>
                <Text style={{ ...styles["text-sm"], width: 40 }}>
                  Lg Straight
                </Text>
                <Text
                  style={{
                    ...styles["text-xs"],
                    width: 50,
                    textAlign: "right",
                  }}
                >
                  (Sequence) of 5
                </Text>
              </View>
            }
            secondColLabel="Score 40"
            score={scoreKeepers.lower}
            scoreKey="lg_straight"
            updateScoreKeepers={updateScoreKeepers}
            shuffleDiceValues={shuffleDiceValues}
          />
        </View>
        <View id="lower-section-row-6">
          <LowerSectionRow
            styles={styles}
            firstCol={
              <View style={styles.col1StyleNormal}>
                <Text style={styles["text-md"]}>YOT-Z{"     "}</Text>
                <Text style={{ ...styles["text-xs"], width: 40 }}>
                  5 of a kind
                </Text>
              </View>
            }
            secondColLabel="Score 50"
            score={scoreKeepers.lower}
            scoreKey="yotz"
            updateScoreKeepers={updateScoreKeepers}
            shuffleDiceValues={shuffleDiceValues}
          />
        </View>
        <View id="lower-section-row-7">
          <LowerSectionRow
            styles={styles}
            firstCol={
              <View style={styles.col1StyleNormal}>
                <Text style={styles["text-md"]}>Chance</Text>
              </View>
            }
            secondColLabel="Score Total Of All 5 Dice"
            score={scoreKeepers.lower}
            scoreKey="chance"
            updateScoreKeepers={updateScoreKeepers}
            shuffleDiceValues={shuffleDiceValues}
          />
        </View>
        <View id="lower-section-row-8">
          <View style={styles.row}>
            <View style={styles.col1StyleNormal}>
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
                <View
                  style={{ ...styles.col2StyleNormal, flexDirection: "row" }}
                >
                  <Icon source="check" size={15} />
                  <Text style={{ ...styles.col2TextStyleXs, width: 50 }}>
                    FOR EACH BONUS
                  </Text>
                </View>
                <View
                  style={{
                    ...styles.col3StyleNormal,
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
                <View
                  style={{ ...styles.col2StyleNormal, flexDirection: "row" }}
                >
                  <Text style={{ ...styles.col2TextStyleXs, width: 50 }}>
                    SCORE 100 PER
                  </Text>
                  <Icon source="check" size={15} />
                </View>
                <View style={styles.col3StyleNormal}>
                  <View>
                    <Text
                      style={{
                        color: scoreKeepers.lower.yotz_bonus.bonusInPlay
                          ? "red"
                          : "black",
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
            styles={styles}
            firstColumn={
              <View style={styles.col1StyleNormal}>
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
            styles={styles}
            firstColumn={
              <View style={styles.col1StyleNormal}>
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
            styles={styles}
            firstColumn={
              <View style={styles.col1StyleNormal}>
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
