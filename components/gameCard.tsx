import { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";
import { DataTable, Icon, Divider } from "react-native-paper";

// Pattern borrowed from: https://medium.com/@kalebjdavenport/how-to-create-a-grid-layout-in-react-native-7948f1a6f949
const Col = ({
  numCols,
  children,
}: {
  numCols?: number;
  children: ReactNode;
}) => <View style={styles.col}>{children}</View>;

const Row = ({ children }: { children: ReactNode }) => (
  <View style={styles.row}>{children}</View>
);

export default function GameCard() {
  return (
    <View style={styles.card}>
      <View id="upper-section">
        <View id="upper-section-header-row">
          <Row>
            <Col>
              <Text>UPPER SECTION</Text>
            </Col>
            <Col>
              <Text>HOW TO SCORE</Text>
            </Col>
            <Col>
              <Text>Game #1</Text>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-1">
          <Row>
            <Col>
              <Text>
                ACES <Icon source="dice-1-outline" size={20} /> = 1
              </Text>
            </Col>
            <Col>
              <Text style={styles["text-sm"]}>Count and add only Aces</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-2">
          <Row>
            <Col>
              <Text>
                TWOS <Icon source="dice-2-outline" size={20} /> = 2
              </Text>
            </Col>
            <Col>
              <Text style={styles["text-sm"]}>Count and add only Twos</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-3">
          <Row>
            <Col>
              <Text>
                Threes <Icon source="dice-3-outline" size={20} /> = 3
              </Text>
            </Col>
            <Col>
              <Text style={styles["text-sm"]}>Count and add only Threes</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-4">
          <Row>
            <Col>
              <Text>
                Fours <Icon source="dice-4-outline" size={20} /> = 4
              </Text>
            </Col>
            <Col>
              <Text style={styles["text-sm"]}>Count and add only Fours</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-5">
          <Row>
            <Col>
              <Text>
                Fives <Icon source="dice-5-outline" size={20} /> = 5
              </Text>
            </Col>
            <Col>
              <Text style={styles["text-sm"]}>Count and add only Fives</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-6">
          <Row>
            <Col>
              <Text>
                Sixes <Icon source="dice-6-outline" size={20} /> = 6
              </Text>
            </Col>
            <Col>
              <Text style={styles["text-sm"]}>Count and add only Sixes</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-7">
          <Row>
            <Col>
              <Text>TOTAL SCORE</Text>
            </Col>
            <Col>
              <Icon source="arrow-right" size={20} />
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-8">
          <Row>
            <Col>
              <Text>
                Bonus{" "}
                <Text style={styles["text-xs"]}>
                  If total score is 63 or over
                </Text>
              </Text>
            </Col>
            <Col>
              <Text>SCORE 35</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-9">
          <Row>
            <Col>
              <Text>
                Total <Text style={styles["text-xs"]}>Of Upper Section</Text>
              </Text>
            </Col>
            <Col>
              <Icon source="arrow-right" size={20} />
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
      </View>
      <View id="lower-section">
        <View id="lower-section-header-row">
          <Row>
            <Col>
              <Text>LOWER SECTION</Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-1">
          <Row>
            <Col>
              <Text>3 of a kind</Text>
            </Col>
            <Col>
              <Text style={styles["text-xs"]}>Add Total of All Dice</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-2">
          <Row>
            <Col>
              <Text>4 of a kind</Text>
            </Col>
            <Col>
              <Text style={styles["text-xs"]}>Add Total of All Dice</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-3">
          <Row>
            <Col>
              <Text>Full House</Text>
            </Col>
            <Col>
              <Text style={styles["text-xs"]}>Score 25</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-4">
          <Row>
            <Col>
              <Text>
                Sm Straight{" "}
                <Text style={styles["text-xs"]}>(Sequence) of 4</Text>
              </Text>
            </Col>
            <Col>
              <Text style={styles["text-xs"]}>Score 30</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-5">
          <Row>
            <Col>
              <Text>
                Lg Straight{" "}
                <Text style={styles["text-xs"]}>(Sequence) of 5</Text>
              </Text>
            </Col>
            <Col>
              <Text style={styles["text-xs"]}>Score 40</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-6">
          <Row>
            <Col>
              <Text>
                YOT-Z <Text style={styles["text-xs"]}>5 of a kind</Text>
              </Text>
            </Col>
            <Col>
              <Text style={styles["text-xs"]}>Score 50</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-7">
          <Row>
            <Col>
              <Text>Chance</Text>
            </Col>
            <Col>
              <Text style={styles["text-xs"]}>Score Total Of All 5 Dice</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-8">
          <Row>
            <Col>
              <Text>YOT-Z BONUS</Text>
            </Col>
            <Col>
              <Text style={styles["text-xs"]}>TODO</Text>
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-9">
          <Row>
            <Col>
              <Text>
                TOTAL <Text style={styles["text-xs"]}>Of Lower Section</Text>
              </Text>
            </Col>
            <Col>
              <Icon source="arrow-right" size={20} />
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-10">
          <Row>
            <Col>
              <Text>
                TOTAL <Text style={styles["text-xs"]}>Of Upper Section</Text>
              </Text>
            </Col>
            <Col>
              <Icon source="arrow-right" size={20} />
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-11">
          <Row>
            <Col>
              <Text>GRAND TOTAL</Text>
            </Col>
            <Col>
              <Icon source="arrow-right" size={20} />
            </Col>
            <Col>
              <Text></Text>
            </Col>
          </Row>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 3,
    padding: 10,
    // marginHorizontal: "auto",
    // width: 500,
  },
  row: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  "1col": {
    flex: 1,
  },
  "2col": {
    flex: 2,
  },
  "3col": {
    flex: 3,
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
});
