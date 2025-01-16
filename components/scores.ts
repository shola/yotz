import type { DieValue } from "@/components/diceContext";
import { Updater } from "use-immer";

export function groupByVal<T extends DieValue>(arr: T[]): { [key in T]: T[] } {
  const res: { [key in T]: T[] } = { [arr[0]]: [] };
  arr.forEach((item) => {
    res[item] = arr.filter((a) => item === a);
  });
  return res;
}

export interface CellScore {
  val: number;
  final: boolean;
  bonusInPlay?: boolean;
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
    yotz_bonus: T;
  };
  lowerAggregate: {
    prelim_total: T;
    upper_total: T;
    grand_total: T;
  };
}

export type ScoreKeepers = Scores<CellScore>;

export const initScoreKeepers = (): ScoreKeepers => ({
  upper: {
    aces: { val: 0, final: false },
    twos: { val: 0, final: false },
    threes: { val: 0, final: false },
    fours: { val: 0, final: false },
    fives: { val: 0, final: false },
    sixes: { val: 0, final: false },
  },
  upperAggregate: {
    prelim_total: { val: 0, final: false },
    bonus: { val: 0, final: false },
    total: { val: 0, final: false },
  },
  lower: {
    trips: { val: 0, final: false },
    quads: { val: 0, final: false },
    full_house: { val: 0, final: false },
    sm_straight: { val: 0, final: false },
    lg_straight: { val: 0, final: false },
    yotz: { val: 0, final: false },
    chance: { val: 0, final: false },
    yotz_bonus: { val: 0, final: false, bonusInPlay: false },
  },
  lowerAggregate: {
    prelim_total: { val: 0, final: false },
    upper_total: { val: 0, final: false },
    grand_total: { val: 0, final: false },
  },
});

export function isKey<T extends object>(
  obj: T,
  key: PropertyKey
): key is keyof T {
  return key in obj;
}

export type ScoreCalculators = Scores<
  (vals: DieValue[], scores: ScoreKeepers) => number
>;
export const scoreCalculators: ScoreCalculators = {
  upper: {
    /* these are based on the current roll */
    aces: (vals: DieValue[], scores: ScoreKeepers) =>
      vals.filter((v) => v === 1).length * 1,
    twos: (vals: DieValue[], scores: ScoreKeepers) =>
      vals.filter((v) => v === 2).length * 2,
    threes: (vals: DieValue[], scores: ScoreKeepers) =>
      vals.filter((v) => v === 3).length * 3,
    fours: (vals: DieValue[], scores: ScoreKeepers) =>
      vals.filter((v) => v === 4).length * 4,
    fives: (vals: DieValue[], scores: ScoreKeepers) =>
      vals.filter((v) => v === 5).length * 5,
    sixes: (vals: DieValue[], scores: ScoreKeepers) =>
      vals.filter((v) => v === 6).length * 6,
  },
  upperAggregate: {
    prelim_total: (vals: DieValue[], scores: ScoreKeepers) => {
      const { upper } = scores;
      const filtered = Object.values(upper).filter(
        (score: CellScore) => score.final
      );
      const summed = filtered.reduce((prev, curr) => prev + curr.val, 0);
      return summed;
    },
    bonus: (vals: DieValue[], scores: ScoreKeepers) => {
      const { upperAggregate } = scores;
      const prelim_total =
        upperAggregate.prelim_total && upperAggregate.prelim_total.val;
      return prelim_total >= 63 ? 35 : 0;
    },
    total: (vals: DieValue[], scores: ScoreKeepers) => {
      const { upperAggregate } = scores;
      const prelim_total =
        upperAggregate.prelim_total && upperAggregate.prelim_total.val;
      const bonus = upperAggregate.bonus && upperAggregate.bonus.val;
      return prelim_total + bonus;
    },
  },
  lower: {
    /* 
    check each for trips of each DiceValue. if test passes, sum all diceValues.
    Start with the biggest and work way down to smallest.
    FindBiggestTrips
    */
    trips: (vals: DieValue[], scores: ScoreKeepers) => {
      const diceCounts = groupByVal(vals);

      const hasTrips = Object.values(diceCounts).find(
        (list) => list.length >= 3
      );

      return hasTrips ? vals.reduce((prev, curr) => prev + curr, 0) : 0;
    },
    quads: (vals: DieValue[], scores: ScoreKeepers) => {
      const diceCounts = groupByVal(vals);

      const hasQuads = Object.values(diceCounts).find(
        (list) => list.length >= 4
      );

      return hasQuads ? vals.reduce((prev, curr) => prev + curr, 0) : 0;
    },
    full_house: (vals: DieValue[], scores: ScoreKeepers) => {
      const diceCounts = groupByVal(vals);

      const hasTrips = Object.values(diceCounts).find(
        (list) => list.length === 3
      );
      const hasPair = Object.values(diceCounts).find(
        (list) => list.length === 2
      );

      return hasTrips && hasPair ? 25 : 0;
    },
    sm_straight: (vals: DieValue[], scores: ScoreKeepers) => {
      const sortedVals = [...vals].sort();
      let consecutiveCount = 1;

      for (let i = 0; i < sortedVals.length - 1; i++) {
        const current = sortedVals[i];
        const next = sortedVals[i + 1];

        if (next === current + 1) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
        }

        if (consecutiveCount === 4) return 30;
      }

      return 0;
    },
    lg_straight: (vals: DieValue[], scores: ScoreKeepers) => {
      const sortedVals = [...vals].sort();
      let consecutiveCount = 1;

      for (let i = 0; i < sortedVals.length - 1; i++) {
        const current = sortedVals[i];
        const next = sortedVals[i + 1];

        if (next === current + 1) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
        }

        if (consecutiveCount === 5) return 40;
      }
      return 0;
    },
    yotz: (vals: DieValue[], scores: ScoreKeepers) => {
      const diceCounts = groupByVal(vals);
      const hasYotZ = Object.values(diceCounts).find(
        (list) => list.length === 5
      );

      return hasYotZ ? 50 : 0;
    },
    chance: (vals: DieValue[], scores: ScoreKeepers) => {
      return vals.reduce((prev, curr) => prev + curr, 0);
    },
    yotz_bonus: (vals: DieValue[], scores: ScoreKeepers) => {
      const { lower } = scores;
      return lower.yotz_bonus.val + 100;
    },
  },
  lowerAggregate: {
    prelim_total: (vals: DieValue[], scores: ScoreKeepers) => {
      // yotz_bonus uses 'final' in a different way, handle it separately
      // TODO: consider making a new optional param for yotz bonus to use, instead of 'final'
      const { lower, lowerAggregate } = scores;
      const yotzBonus = lower.yotz_bonus.val;
      const filtered = Object.values(lower).filter(
        (score: CellScore) => score.final
      );
      const summed = filtered.reduce((prev, curr) => prev + curr.val, 0);
      return summed + yotzBonus;
    },
    upper_total: (vals: DieValue[], scores: ScoreKeepers) =>
      scores.upperAggregate.total.val,
    grand_total: (vals: DieValue[], scores: ScoreKeepers) =>
      scores.lowerAggregate.prelim_total.val +
      scores.lowerAggregate.upper_total.val,
  },
};

// Independent scores are those that can be calculated
// directly from dice values ONLY.
export function setIndependentTempScores(
  diceValues: DieValue[],
  scoreKeepers: ScoreKeepers,
  updateScoreKeepers: Updater<ScoreKeepers>
) {
  for (const k in scoreKeepers.upper) {
    // Must verify that the key indexes an object before accessing
    if (!isKey(scoreKeepers.upper, k)) continue;

    // if finalized, skip
    if (scoreKeepers.upper[k].final) continue;

    // set temp value
    updateScoreKeepers((draft) => {
      draft.upper[k].val = scoreCalculators.upper[k](diceValues, scoreKeepers);
    });
  }
  for (const k in scoreKeepers.lower) {
    // Must verify that the key indexes an object before accessing
    if (!isKey(scoreKeepers.lower, k)) continue;

    // if finalized, skip
    if (scoreKeepers.lower[k].final) continue;

    if (k !== "yotz_bonus") {
      updateScoreKeepers((draft) => {
        draft.lower[k].val = scoreCalculators.lower[k](
          diceValues,
          scoreKeepers
        );
      });
    } else {
      updateYotzBonus(diceValues, scoreKeepers, updateScoreKeepers);
    }
  }
}

export function setAggregateTempScores(
  diceValues: DieValue[],
  scoreKeepers: ScoreKeepers,
  updateScoreKeepers: Updater<ScoreKeepers>
) {
  // Since these values are calculated based off of previous rolls, evaluate
  // them next in line
  for (const k in scoreKeepers.upperAggregate) {
    if (!isKey(scoreKeepers.upperAggregate, k)) continue;

    if (k === "prelim_total") {
      updateScoreKeepers((draft) => {
        draft.upperAggregate[k].val = scoreCalculators.upperAggregate[k](
          diceValues,
          scoreKeepers
        );
      });
    }

    if (k === "bonus" || k === "total") {
      updateScoreKeepers((draft) => {
        draft.upperAggregate[k].val = scoreCalculators.upperAggregate[k](
          diceValues,
          scoreKeepers
        );
      });
    }
  }

  const isCurrentYotz = !!Object.values(groupByVal(diceValues)).find(
    (group) => group.length === 5
  );

  for (const k in scoreKeepers.lowerAggregate) {
    if (!isKey(scoreKeepers.lowerAggregate, k)) continue;

    if (k === "prelim_total") {
      updateScoreKeepers((draft) => {
        draft.lowerAggregate[k].val = scoreCalculators.lowerAggregate[k](
          diceValues,
          scoreKeepers
        );
      });
    }

    if (k === "upper_total") {
      updateScoreKeepers((draft) => {
        draft.lowerAggregate[k].val = scoreCalculators.lowerAggregate[k](
          diceValues,
          scoreKeepers
        );
      });
    }

    if (k === "grand_total") {
      updateScoreKeepers((draft) => {
        draft.lowerAggregate[k].val = scoreCalculators.lowerAggregate[k](
          diceValues,
          scoreKeepers
        );
      });
    }
  }
}

export function updateYotzBonus(
  diceValues: DieValue[],
  scoreKeepers: ScoreKeepers,
  updateScoreKeepers: Updater<ScoreKeepers>
) {
  const previousYotz =
    scoreKeepers.lower.yotz.final && scoreKeepers.lower.yotz.val === 50;

  const isCurrentYotz = !!Object.values(groupByVal(diceValues)).find(
    (group) => group.length === 5
  );

  updateScoreKeepers((draft) => {
    if (previousYotz && isCurrentYotz) {
      const newVal = scoreCalculators.lower.yotz_bonus(
        diceValues,
        scoreKeepers
      );
      draft.lower.yotz_bonus.val = newVal;
      draft.lower.yotz_bonus.bonusInPlay = true;
    } else {
      // This also "clears" the UI if a user selects something else other than the bonus
      draft.lower.yotz_bonus.bonusInPlay = false;
    }
  });
}
