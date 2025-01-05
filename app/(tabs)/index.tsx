import { StyleSheet, View } from "react-native";
import { DataTable, Icon } from "react-native-paper";

export default function CurrentGameScreen() {
  return (
    <View style={styles.container}>
      <DataTable style={styles.table}>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>ACES</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>TRIPS</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>TWOS</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>QUADS</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>THREES</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>FULL</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>FOURS</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>SMALL</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>FIVES</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>LARGE</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>SIXES</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>YOT-Z</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>BONUS</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>CHANCE</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row style={styles.row}>
          <DataTable.Cell style={styles.cell}>Subtotal</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
          <DataTable.Cell style={styles.cell}>TOTAL</DataTable.Cell>
          <DataTable.Cell style={styles.cell} numeric>
            {" "}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <View style={styles.dice}>
      <Icon
        source="dice-1"
        size={40}
        />
        <Icon
        source="dice-2"
        size={40}
        />
        <Icon
        source="dice-3"
        size={40}
        />
        <Icon
        source="dice-4"
        size={40}
        />
        <Icon
        source="dice-5"
        size={40}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
  },
  table: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 20,
    borderWidth: 1,
  },
  cell: {

  },
  dice: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
