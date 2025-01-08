import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Icon } from "react-native-paper";
import type { DieValue } from "@/app/game";
import { DiceContext } from "@/app/game";
import { Updater, useImmer } from "use-immer";

interface CellScore {
  val?: number;
  final: boolean;
}
interface ScoreKeepersT {
  upper: {
    aces: CellScore;
    twos: CellScore;
    threes: CellScore;
    fours: CellScore;
    fives: CellScore;
    sixes: CellScore;
    prelim_total: CellScore;
    bonus: CellScore;
    total: CellScore;
  };
  lower: {
    trips: CellScore;
    quads: CellScore;
    full_house: CellScore;
    sm_straight: CellScore;
    lg_straight: CellScore;
    yotz: CellScore;
    chance: CellScore;
    lower_total: CellScore;
    upper_total: CellScore;
    grand_total: CellScore;
  };
}
const initScoreKeepers = (): ScoreKeepersT => ({
  upper: {
    aces: { val: undefined, final: false },
    twos: { val: undefined, final: false },
    threes: { val: undefined, final: false },
    fours: { val: undefined, final: false },
    fives: { val: undefined, final: false },
    sixes: { val: undefined, final: false },
    prelim_total: { val: undefined, final: false },
    bonus: { val: undefined, final: false },
    total: { val: undefined, final: false },
  },
  lower: {
    trips: { val: undefined, final: false },
    quads: { val: undefined, final: false },
    full_house: { val: undefined, final: false },
    sm_straight: { val: undefined, final: false },
    lg_straight: { val: undefined, final: false },
    yotz: { val: undefined, final: false },
    chance: { val: undefined, final: false },
    lower_total: { val: undefined, final: false },
    upper_total: { val: undefined, final: false },
    grand_total: { val: undefined, final: false },
  },
});

function isKey<T extends object>(obj: T, key: PropertyKey): key is keyof T {
  return key in obj;
}

// TODO: put guards in place so scoreKeepers only get updated once, from null
const scoreCalculators = {
  upper: {
    /* these are based on the current roll */
    aces: (vals: DieValue[]) => vals.filter((v) => v === 1).length * 1,
    twos: (vals: DieValue[]) => vals.filter((v) => v === 2).length * 2,
    threes: (vals: DieValue[]) => vals.filter((v) => v === 3).length * 3,
    fours: (vals: DieValue[]) => vals.filter((v) => v === 4).length * 4,
    fives: (vals: DieValue[]) => vals.filter((v) => v === 5).length * 5,
    sixes: (vals: DieValue[]) => vals.filter((v) => v === 6).length * 6,
    /* 
    These should only be based on the completed rolls. They should happen AFTER
    All of the ones above. I can't guarantee the order that keys are access though,
    so this should probably be a map
    */
    prelim_total: () => 0,
    // [
    //   scoreKeepers.upper.aces,
    //   scoreKeepers.upper.twos,
    //   scoreKeepers.upper.threes,
    //   scoreKeepers.upper.fours,
    //   scoreKeepers.upper.fives,
    //   scoreKeepers.upper.sixes,
    // ]
    //   .filter((v) => v !== null)
    //   .reduce((prev, curr) => prev + (curr.val ?? 0), 0),
    bonus: () => 0,
    total: () => 0,
  },
  lower: {
    trips: null,
    quads: null,
    full_house: null,
    sm_straight: null,
    lg_straight: null,
    yotz: null,
    chance: null,
    lower_total: null,
    upper_total: null,
    grand_total: null,
  },
};

function clearAllTempScores() {}

function setAllTempScores(
  diceValues: DieValue[],
  scoreKeepers: ScoreKeepersT,
  updateScoreKeepers: Updater<ScoreKeepersT>
) {
  for (const k in scoreKeepers.upper) {
    // Have you verify that the key indexes an object before accessing
    if (!isKey(scoreKeepers.upper, k)) continue;

    // if final, skip
    if (scoreKeepers.upper[k].final) continue;

    // set temp value
    // first, you need to verify that the key also indexes the helper
    if (isKey(scoreCalculators.upper, k)) {
      updateScoreKeepers((draft) => {
        draft.upper[k].val = scoreCalculators.upper[k](diceValues);
      });
    }
  }
  console.log({ scoreKeepersUpper: scoreKeepers.upper });
}

export default function GameCard() {
  const { diceValues } = useContext(DiceContext);
  const [scoreKeepers, updateScoreKeepers] = useImmer(initScoreKeepers);

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

  useEffect(() => {
    // Whenever diceValues changes, all temp scores need to be updated
    setAllTempScores(diceValues, scoreKeepers, updateScoreKeepers);
  }, [diceValues]);

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
        <View id="upper-section-row-1">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Aces</Text>
              <View style={styles.diceIconGroup}>
                <Icon source="dice-1-outline" size={30} />
                <Text style={{ marginLeft: 2 }}>= 1</Text>
              </View>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Aces</Text>
            </View>
            <View style={col3StyleNormal}>
              <Button
                textColor={scoreKeepers.upper.aces.final ? "black" : "red"}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.upper.aces.final = true;
                    }))();
                }}
              >
                {scoreKeepers.upper.aces.val}
              </Button>
            </View>
          </View>
        </View>
        <View id="upper-section-row-2">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Twos</Text>
              <View style={styles.diceIconGroup}>
                <Icon source="dice-2-outline" size={30} />
                <Text>= 2</Text>
              </View>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Twos</Text>
            </View>
            <View style={col3StyleNormal}>
              <Button
                textColor={scoreKeepers.upper.twos.final ? "black" : "red"}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.upper.twos.final = true;
                    }))();
                }}
              >
                {scoreKeepers.upper.twos.val}
              </Button>
            </View>
          </View>
        </View>
        <View id="upper-section-row-3">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Threes</Text>
              <View style={styles.diceIconGroup}>
                <Icon source="dice-3-outline" size={30} />
                <Text>= 3</Text>
              </View>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Threes</Text>
            </View>
            <View style={col3StyleNormal}>
              <Button
                textColor={scoreKeepers.upper.threes.final ? "black" : "red"}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.upper.threes.final = true;
                    }))();
                }}
              >
                {scoreKeepers.upper.threes.val}
              </Button>
            </View>
          </View>
        </View>
        <View id="upper-section-row-4">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Fours</Text>
              <View style={styles.diceIconGroup}>
                <Icon source="dice-4-outline" size={30} />
                <Text>= 4</Text>
              </View>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Fours</Text>
            </View>
            <View style={col3StyleNormal}>
              <Button
                textColor={scoreKeepers.upper.fours.final ? "black" : "red"}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.upper.fours.final = true;
                    }))();
                }}
              >
                {scoreKeepers.upper.fours.val}
              </Button>
            </View>
          </View>
        </View>
        <View id="upper-section-row-5">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Fives</Text>
              <View style={styles.diceIconGroup}>
                <Icon source="dice-5-outline" size={30} />
                <Text>= 5</Text>
              </View>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Fives</Text>
            </View>
            <View style={col3StyleNormal}>
              <Button
                textColor={scoreKeepers.upper.fives.final ? "black" : "red"}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.upper.fives.final = true;
                    }))();
                }}
              >
                {scoreKeepers.upper.fives.val}
              </Button>
            </View>
          </View>
        </View>
        <View id="upper-section-row-6">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Sixes</Text>
              <View style={styles.diceIconGroup}>
                <Icon source="dice-6-outline" size={30} />
                <Text>= 6</Text>
              </View>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Sixes</Text>
            </View>
            <View style={col3StyleNormal}>
              <Button
                textColor={scoreKeepers.upper.sixes.final ? "black" : "red"}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.upper.sixes.final = true;
                    }))();
                }}
              >
                {scoreKeepers.upper.sixes.val}
              </Button>
            </View>
          </View>
        </View>
        <View id="upper-section-row-7">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-md"]}>TOTAL SCORE</Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={styles.arrow}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </View>
        </View>
        <View id="upper-section-row-8">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-md"]}>Bonus{"  "}</Text>
              <Text style={{ ...styles["text-xs"], width: 55 }}>
                If total score is 63 or over
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>SCORE 35</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </View>
        </View>
        <View id="upper-section-row-9">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-md"]}>Total{"    "}</Text>
              <Text style={{ ...styles["text-xs"], width: 55 }}>
                Of Upper Section
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={styles.arrow}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </View>
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
            <View style={col3StyleNormal}>
              <Text></Text>
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
            <View style={col3StyleNormal}>
              <Text></Text>
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
            <View style={col3StyleNormal}>
              <Text></Text>
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
            <View style={col3StyleNormal}>
              <Text></Text>
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
            <View style={col3StyleNormal}>
              <Text></Text>
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
            <View style={col3StyleNormal}>
              <Text></Text>
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
            <View style={col3StyleNormal}>
              <Text></Text>
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
                  <View style={styles.bonusCell}>
                    <Text> </Text>
                  </View>
                  <View style={styles.bonusCell}>
                    <Text> </Text>
                  </View>
                  <View style={styles.bonusCell}>
                    <Text> </Text>
                  </View>
                  <View style={styles.bonusCell}>
                    <Text> </Text>
                  </View>
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
                    <Text></Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View id="lower-section-row-9">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-md"]}>TOTAL{"    "}</Text>
              <Text style={{ ...styles["text-xs"], width: 40 }}>
                Of Lower Section
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={styles.arrow}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </View>
        </View>
        <View id="lower-section-row-10">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-md"]}>TOTAL{"    "}</Text>
              <Text style={{ ...styles["text-xs"], width: 40 }}>
                Of Upper Section
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={styles.arrow}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </View>
        </View>
        <View id="lower-section-row-11">
          <View style={styles.row}>
            <View style={col1StyleNormal}>
              <Text style={styles["text-md"]}>GRAND TOTAL</Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={styles.arrow}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </View>
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
