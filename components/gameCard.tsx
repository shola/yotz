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
interface Scores<T> {
  upper: {
    aces: T;
    twos: T;
    threes: T;
    fours: T;
    fives: T;
    sixes: T;
  };
  upperAggregate: {
    prelim_total: T;
    bonus: T;
    total: T;
  };
  lower: {
    trips: T;
    quads: T;
    full_house: T;
    sm_straight: T;
    lg_straight: T;
    yotz: T;
    chance: T;
    lower_total: T;
    upper_total: T;
    grand_total: T;
  };
}

type ScoreKeepersT = Scores<CellScore>;

const initScoreKeepers = (): ScoreKeepersT => ({
  upper: {
    aces: { val: undefined, final: false },
    twos: { val: undefined, final: false },
    threes: { val: undefined, final: false },
    fours: { val: undefined, final: false },
    fives: { val: undefined, final: false },
    sixes: { val: undefined, final: false },
  },
  upperAggregate: {
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

type ScoreCalculatorsT = Scores<
  | ((vals: DieValue[]) => number)
  | ((upper: ScoreKeepersT["upper"]) => number)
  | ((upperAggregate: ScoreKeepersT["upperAggregate"]) => number)
  | (() => undefined)
>;
// TODO: put guards in place so scoreKeepers only get updated once, from null
// TODO: I may need to separate the cells by those that are independent, and dependent.
// prelim_total being the first dependent cell
const scoreCalculators = {
  upper: {
    /* these are based on the current roll */
    aces: (vals: DieValue[]) => vals.filter((v) => v === 1).length * 1,
    twos: (vals: DieValue[]) => vals.filter((v) => v === 2).length * 2,
    threes: (vals: DieValue[]) => vals.filter((v) => v === 3).length * 3,
    fours: (vals: DieValue[]) => vals.filter((v) => v === 4).length * 4,
    fives: (vals: DieValue[]) => vals.filter((v) => v === 5).length * 5,
    sixes: (vals: DieValue[]) => vals.filter((v) => v === 6).length * 6,
  },
  upperAggregate: {
    prelim_total: (upper: ScoreKeepersT["upper"]) => {
      const filtered = Object.values(upper).filter(
        (score: CellScore) => score.final
      );
      const summed = filtered.reduce((prev, curr) => prev + (curr.val ?? 0), 0);
      console.log({ filtered, summed });
      return summed;
    },
    bonus: (upperAggregate: ScoreKeepersT["upperAggregate"]) => {
      const prelim_total =
        upperAggregate.prelim_total && (upperAggregate.prelim_total.val ?? 0);
      return prelim_total >= 63 ? 35 : 0;
    },
    total: (upperAggregate: ScoreKeepersT["upperAggregate"]) => {
      const prelim_total =
        upperAggregate.prelim_total && (upperAggregate.prelim_total.val ?? 0);
      const bonus = upperAggregate.bonus && (upperAggregate.bonus.val ?? 0);
      return prelim_total + bonus;
    },
  },
  lower: {
    /* 
    check each for trips of each DiceValue. if test passes, sum all diceValues.
    Start with the biggest and work way down to smallest.
    FindBiggestTrips
    */
    trips: (vals: DieValue[]) => {
      const diceCounts = Object.groupBy(vals, (num) => num);

      const hasTrips = Object.values(diceCounts).find(
        (list) => list.length >= 3
      );

      return hasTrips ? vals.reduce((prev, curr) => prev + curr, 0) : 0;
    },
    quads: (vals: DieValue[]) => {
      const diceCounts = Object.groupBy(vals, (num) => num);

      const hasQuads = Object.values(diceCounts).find(
        (list) => list.length >= 4
      );

      return hasQuads ? vals.reduce((prev, curr) => prev + curr, 0) : 0;
    },
    full_house: (vals: DieValue[]) => {
      const diceCounts = Object.groupBy(vals, (num) => num);

      const hasTrips = Object.values(diceCounts).find(
        (list) => list.length === 3
      );
      const hasPair = Object.values(diceCounts).find(
        (list) => list.length === 2
      );

      return hasTrips && hasPair ? 25 : 0;
    },
    sm_straight: (vals: DieValue[]) => {
      const sortedVals = vals.toSorted();
      let consecutiveCount = 1;

      for (let i = 0; i < vals.length - 1; i++) {
        const current = vals[i];
        const next = vals[i + 1];

        if (next === current + 1) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
        }

        if (consecutiveCount === 4) return 30;
      }
      return 0;
    },
    lg_straight: (vals: DieValue[]) => {
      const sortedVals = vals.toSorted();
      let consecutiveCount = 1;

      for (let i = 0; i < vals.length - 1; i++) {
        const current = vals[i];
        const next = vals[i + 1];

        if (next === current + 1) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
        }

        if (consecutiveCount === 5) return 40;
      }
      return 0;
    },
    yotz: (vals: DieValue[]) => {
      const diceCounts = Object.groupBy(vals, (num) => num);

      const hasYotZ = Object.values(diceCounts).find(
        (list) => list.length === 5
      );

      return hasYotZ ? 50 : 0;
    },
    chance: (vals: DieValue[]) => {
      return vals.reduce((prev, curr) => prev + curr, 0);
    },
    lower_total: () => undefined,
    upper_total: () => undefined,
    grand_total: () => undefined,
  },
};

function clearAllTempScores() {}

function setAllTempScores(
  diceValues: DieValue[],
  scoreKeepers: ScoreKeepersT,
  updateScoreKeepers: Updater<ScoreKeepersT>
) {
  for (const k in scoreKeepers.upper) {
    // Must verify that the key indexes an object before accessing
    if (!isKey(scoreKeepers.upper, k)) continue;

    // if finalized, skip
    if (scoreKeepers.upper[k].final) continue;

    // set temp value
    updateScoreKeepers((draft) => {
      draft.upper[k].val = scoreCalculators.upper[k](diceValues);
    });
  }
  for (const k in scoreKeepers.lower) {
    // Must verify that the key indexes an object before accessing
    if (!isKey(scoreKeepers.lower, k)) continue;

    // if finalized, skip
    if (scoreKeepers.lower[k].final) continue;

    // first, you need to verify that the key also indexes the helper
    // set temp value
    updateScoreKeepers((draft) => {
      draft.lower[k].val = scoreCalculators.lower[k](diceValues);
    });
  }

  // Since these values are calculated based off of previous rolls, evaluate
  // them next in line
  for (const k in scoreKeepers.upperAggregate) {
    if (!isKey(scoreKeepers.upperAggregate, k)) continue;

    if (k === "prelim_total") {
      updateScoreKeepers((draft) => {
        draft.upperAggregate[k].val = scoreCalculators.upperAggregate[k](
          scoreKeepers.upper
        );
      });
    }

    if (k === "bonus" || k === "total") {
      updateScoreKeepers((draft) => {
        draft.upperAggregate[k].val = scoreCalculators.upperAggregate[k](
          scoreKeepers.upperAggregate
        );
      });
    }
  }
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
  }, [diceValues, scoreKeepers]);

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
              {/* This score can not be clicked on */}
              <Text style={styles["text-md"]}>TOTAL SCORE</Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={styles.arrow}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text>{scoreKeepers.upperAggregate.prelim_total.val}</Text>
            </View>
          </View>
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
              <Text>{scoreKeepers.upperAggregate.total.val}</Text>
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
              <Button
                textColor={scoreKeepers.lower.trips.final ? "black" : "red"}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.trips.final = true;
                    }))();
                }}
              >
                {scoreKeepers.lower.trips.val}
              </Button>
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
              <Button
                textColor={scoreKeepers.lower.quads.final ? "black" : "red"}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.quads.final = true;
                    }))();
                }}
              >
                {scoreKeepers.lower.quads.val}
              </Button>
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
              <Button
                textColor={
                  scoreKeepers.lower.full_house.final ? "black" : "red"
                }
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.full_house.final = true;
                    }))();
                }}
              >
                {scoreKeepers.lower.full_house.val}
              </Button>
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
              <Button
                textColor={
                  scoreKeepers.lower.sm_straight.final ? "black" : "red"
                }
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.sm_straight.final = true;
                    }))();
                }}
              >
                {scoreKeepers.lower.sm_straight.val}
              </Button>
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
              <Button
                textColor={
                  scoreKeepers.lower.lg_straight.final ? "black" : "red"
                }
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.lg_straight.final = true;
                    }))();
                }}
              >
                {scoreKeepers.lower.lg_straight.val}
              </Button>
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
              <Button
                textColor={scoreKeepers.lower.yotz.final ? "black" : "red"}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.yotz.final = true;
                    }))();
                }}
              >
                {scoreKeepers.lower.yotz.val}
              </Button>
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
              <Button
                textColor={scoreKeepers.lower.chance.final ? "black" : "red"}
                onPress={() => {
                  (() =>
                    updateScoreKeepers((draft) => {
                      draft.lower.chance.final = true;
                    }))();
                }}
              >
                {scoreKeepers.lower.chance.val}
              </Button>
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
