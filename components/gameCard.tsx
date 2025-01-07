import { ReactNode, PropsWithChildren } from "react";
import { StyleSheet, View, Text } from "react-native";
import { DataTable, Icon, Divider } from "react-native-paper";

const Row = ({ children }: PropsWithChildren) => (
  <View style={styles.row}>{children}</View>
);

export default function GameCard() {
  const col1HeaderStyle = { ...styles.col1Header, ...styles.centerAlignView };

  const col1StyleNormal = { ...styles.col1, ...styles.centerAlignView };
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
  return (
    <View style={styles.card}>
      <View id="upper-section">
        <View id="upper-section-header-row">
          <Row>
            <View style={col1HeaderStyle}>
              <Text style={styles.centerAlignText}>UPPER SECTION</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={styles.centerAlignText}>HOW TO SCORE</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text style={styles.centerAlignText}>Game #1</Text>
            </View>
          </Row>
        </View>
        <View id="upper-section-row-1">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Aces</Text>
              <Icon source="dice-1-outline" size={30} />
              <Text> = 1</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Aces</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="upper-section-row-2">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Twos</Text>
              <Icon source="dice-2-outline" size={30} />
              <Text> = 2</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Twos</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="upper-section-row-3">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Threes</Text>
              <Icon source="dice-3-outline" size={30} />
              <Text> = 3</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Threes</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="upper-section-row-4">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Fours</Text>
              <Icon source="dice-4-outline" size={30} />
              <Text> = 4</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Fours</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="upper-section-row-5">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Fives</Text>
              <Icon source="dice-5-outline" size={30} />
              <Text> = 5</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Fives</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="upper-section-row-6">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Sixes</Text>
              <Icon source="dice-6-outline" size={30} />
              <Text> = 6</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleSm}>Count and add only Sixes</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="upper-section-row-7">
          <Row>
            <View style={col1StyleNormal}>
              <Text>TOTAL SCORE</Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={{ transform: [{ scaleX: 4 }] }}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="upper-section-row-8">
          <Row>
            <View style={col1StyleNormal}>
              <Text>Bonus{"  "}</Text>
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
          </Row>
        </View>
        <View id="upper-section-row-9">
          <Row>
            <View style={col1StyleNormal}>
              <Text>Total{"    "}</Text>
              <Text style={{ ...styles["text-xs"], width: 55 }}>
                Of Upper Section
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={{ transform: [{ scaleX: 4 }] }}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
      </View>
      <View id="lower-section">
        <View id="lower-section-header-row">
          <Row>
            <View>
              <Text>LOWER SECTION</Text>
            </View>
          </Row>
        </View>
        <View id="lower-section-row-1">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>3 of a kind</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Add Total of All Dice</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="lower-section-row-2">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>4 of a kind</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Add Total of All Dice</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="lower-section-row-3">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Full House</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Score 25</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="lower-section-row-4">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Sm Straight </Text>
              <Text style={{ ...styles["text-xs"], width: 50 }}>
                (Sequence) of 4
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Score 30</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="lower-section-row-5">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={styles["text-sm"]}>Lg Straight{"  "}</Text>
              <Text style={{ ...styles["text-xs"], width: 50 }}>
                (Sequence) of 5
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Score 40</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="lower-section-row-6">
          <Row>
            <View style={col1StyleNormal}>
              <Text>YOT-Z{"     "}</Text>
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
          </Row>
        </View>
        <View id="lower-section-row-7">
          <Row>
            <View style={col1StyleNormal}>
              <Text>Chance</Text>
            </View>
            <View style={col2StyleNormal}>
              <Text style={col2TextStyleXs}>Score Total Of All 5 Dice</Text>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="lower-section-row-8">
          <Row>
            <View style={col1StyleNormal}>
              <Text style={{ width: 50, textAlign: "center" }}>
                YOT-Z BONUS
              </Text>
            </View>
            <View>
              <Row>
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
              </Row>
              <Row>
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
              </Row>
            </View>
          </Row>
        </View>
        <View id="lower-section-row-9">
          <Row>
            <View style={col1StyleNormal}>
              <Text>TOTAL{"    "}</Text>
              <Text style={{ ...styles["text-xs"], width: 40 }}>
                Of Lower Section
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={{ transform: [{ scaleX: 4 }] }}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="lower-section-row-10">
          <Row>
            <View style={col1StyleNormal}>
              <Text>TOTAL{"    "}</Text>
              <Text style={{ ...styles["text-xs"], width: 40 }}>
                Of Upper Section
              </Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={{ transform: [{ scaleX: 4 }] }}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
        </View>
        <View id="lower-section-row-11">
          <Row>
            <View style={col1StyleNormal}>
              <Text>GRAND TOTAL</Text>
            </View>
            <View style={col2StyleNormal}>
              <View style={{ transform: [{ scaleX: 4 }] }}>
                <Icon source="arrow-right-thin" size={30} />
              </View>
            </View>
            <View style={col3StyleNormal}>
              <Text></Text>
            </View>
          </Row>
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
    width: 110,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  col1: {
    width: 110,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
    display: "flex",
    flexDirection: "row",
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
});
