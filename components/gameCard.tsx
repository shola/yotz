import { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";
import { DataTable, Icon, Divider } from "react-native-paper";

// Pattern borrowed from: https://medium.com/@kalebjdavenport/how-to-create-a-grid-layout-in-react-native-7948f1a6f949
const UnstyledCol = ({ children }: { children: ReactNode }) => (
  <View>{children}</View>
);
const Col = ({ children }: { children: ReactNode }) => (
  <View style={styles.col}>{children}</View>
);
const Row = ({ children }: { children: ReactNode }) => (
  <View style={styles.row}>{children}</View>
);

const TextMd = ({ children }: { children?: ReactNode }) => (
  <Text style={styles["text-md"]}>{children}</Text>
);
const TextSm = ({ children }: { children: ReactNode }) => (
  <Text style={styles["text-sm"]}>{children}</Text>
);
const TextXs = ({ children }: { children: ReactNode }) => (
  <Text style={styles["text-xs"]}>{children}</Text>
);

export default function GameCard() {
  return (
    <View style={styles.card}>
      <View id="upper-section">
        <View id="upper-section-header-row">
          <Row>
            <Col>
              <TextMd>UPPER SECTION</TextMd>
            </Col>
            <Col>
              <TextMd>HOW TO SCORE</TextMd>
            </Col>
            <Col>
              <TextMd>Game #1</TextMd>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-1">
          <Row>
            <Col>
              <TextMd>
                ACES <Icon source="dice-1-outline" size={20} /> = 1
              </TextMd>
            </Col>
            <Col>
              <TextSm>Count and add only Aces</TextSm>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-2">
          <Row>
            <Col>
              <TextMd>
                TWOS <Icon source="dice-2-outline" size={20} /> = 2
              </TextMd>
            </Col>
            <Col>
              <TextSm>Count and add only Twos</TextSm>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-3">
          <Row>
            <Col>
              <TextMd>
                Threes <Icon source="dice-3-outline" size={20} /> = 3
              </TextMd>
            </Col>
            <Col>
              <TextSm>Count and add only Threes</TextSm>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-4">
          <Row>
            <Col>
              <TextMd>
                Fours <Icon source="dice-4-outline" size={20} /> = 4
              </TextMd>
            </Col>
            <Col>
              <TextSm>Count and add only Fours</TextSm>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-5">
          <Row>
            <Col>
              <TextMd>
                Fives <Icon source="dice-5-outline" size={20} /> = 5
              </TextMd>
            </Col>
            <Col>
              <TextSm>Count and add only Fives</TextSm>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-6">
          <Row>
            <Col>
              <TextMd>
                Sixes <Icon source="dice-6-outline" size={20} /> = 6
              </TextMd>
            </Col>
            <Col>
              <TextSm>Count and add only Sixes</TextSm>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-7">
          <Row>
            <Col>
              <TextMd>TOTAL SCORE</TextMd>
            </Col>
            <Col>
              <Icon source="arrow-right" size={20} />
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-8">
          <Row>
            <Col>
              <TextMd>
                Bonus <TextXs>If total score is 63 or over</TextXs>
              </TextMd>
            </Col>
            <Col>
              <TextMd>SCORE 35</TextMd>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="upper-section-row-9">
          <Row>
            <Col>
              <TextMd>
                Total <TextXs>Of Upper Section</TextXs>
              </TextMd>
            </Col>
            <Col>
              <Icon source="arrow-right" size={20} />
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
      </View>
      <View id="lower-section">
        <View id="lower-section-header-row">
          <Row>
            <UnstyledCol>
              <TextMd>LOWER SECTION</TextMd>
            </UnstyledCol>
          </Row>
        </View>
        <View id="lower-section-row-1">
          <Row>
            <Col>
              <TextMd>3 of a kind</TextMd>
            </Col>
            <Col>
              <TextXs>Add Total of All Dice</TextXs>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-2">
          <Row>
            <Col>
              <TextMd>4 of a kind</TextMd>
            </Col>
            <Col>
              <TextXs>Add Total of All Dice</TextXs>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-3">
          <Row>
            <Col>
              <TextMd>Full House</TextMd>
            </Col>
            <Col>
              <TextXs>Score 25</TextXs>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-4">
          <Row>
            <Col>
              <TextMd>
                Sm Straight <TextXs>(Sequence) of 4</TextXs>
              </TextMd>
            </Col>
            <Col>
              <TextXs>Score 30</TextXs>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-5">
          <Row>
            <Col>
              <TextMd>
                Lg Straight <TextXs>(Sequence) of 5</TextXs>
              </TextMd>
            </Col>
            <Col>
              <TextXs>Score 40</TextXs>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-6">
          <Row>
            <Col>
              <TextMd>
                YOT-Z <TextXs>5 of a kind</TextXs>
              </TextMd>
            </Col>
            <Col>
              <TextXs>Score 50</TextXs>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-7">
          <Row>
            <Col>
              <TextMd>Chance</TextMd>
            </Col>
            <Col>
              <TextXs>Score Total Of All 5 Dice</TextXs>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-8">
          <Row>
            <Col>
              <TextMd>YOT-Z BONUS</TextMd>
            </Col>
            <Col>
              <TextXs>TODO</TextXs>
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-9">
          <Row>
            <Col>
              <TextMd>
                TOTAL <TextXs>Of Lower Section</TextXs>
              </TextMd>
            </Col>
            <Col>
              <Icon source="arrow-right" size={20} />
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-10">
          <Row>
            <Col>
              <TextMd>
                TOTAL <TextXs>Of Upper Section</TextXs>
              </TextMd>
            </Col>
            <Col>
              <Icon source="arrow-right" size={20} />
            </Col>
            <Col>
              <TextMd></TextMd>
            </Col>
          </Row>
        </View>
        <View id="lower-section-row-11">
          <Row>
            <Col>
              <TextMd>GRAND TOTAL</TextMd>
            </Col>
            <Col>
              <Icon source="arrow-right" size={20} />
            </Col>
            <Col>
              <TextMd></TextMd>
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
  "text-md": {
    fontSize: 12,
  },
  "text-sm": {
    fontSize: 10,
  },
  "text-xs": {
    fontSize: 8,
  },
});
