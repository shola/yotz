import React, { useContext, useEffect } from "react";
import { useImmer } from "use-immer";
import { View, Text } from "react-native";
import { Icon } from "react-native-paper";
import { DiceContext } from "@/components/dice/diceContext";
import {
  initScoreKeepers,
  setIndependentTempScores,
  setAggregateTempScores,
} from "@/components/gameCardState/scores";
import { LowerSectionRow } from "@/components/gameCard/lowerSectionRow";
import { UpperSectionRow } from "@/components/gameCard/upperSectionRow";
import { BonusCheckMarks } from "@/components/gameCard/bonusCheckMarks";
import { RowWithCenterArrowIcon } from "@/components/gameCard/rowWithCenterArrowIcon";
import styles from "@/components/gameCard/gameCardStyles";

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
                    styles,
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
