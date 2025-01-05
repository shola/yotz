import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function CurrentGameScreen() {
  return (
    <DataTable style={styles.container}>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell style={styles.cell}>ACES</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>
        <DataTable.Cell style={styles.cell}>TRIPS</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>          
      </DataTable.Row>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell style={styles.cell}>TWOS</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>
        <DataTable.Cell style={styles.cell}>QUADS</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>          
      </DataTable.Row>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell style={styles.cell}>THREES</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>
        <DataTable.Cell style={styles.cell}>FULL</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>          
      </DataTable.Row>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell style={styles.cell}>FOURS</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>
        <DataTable.Cell style={styles.cell}>SMALL</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>          
      </DataTable.Row>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell style={styles.cell}>FIVES</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>
        <DataTable.Cell style={styles.cell}>LARGE</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>          
      </DataTable.Row>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell style={styles.cell}>SIXES</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>
        <DataTable.Cell style={styles.cell}>YOT-Z</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>          
      </DataTable.Row>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell style={styles.cell}>BONUS</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>
        <DataTable.Cell style={styles.cell}>CHANCE</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>          
      </DataTable.Row>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell style={styles.cell}>Subtotal</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>
        <DataTable.Cell style={styles.cell}>TOTAL</DataTable.Cell>
        <DataTable.Cell style={styles.cell} numeric>         </DataTable.Cell>          
      </DataTable.Row>
    </DataTable>
  );
}

const styles = StyleSheet.create({
  container: {
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
    padding: 15
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 20,
    borderWidth: 5
  },
  cell: {
    // borderWidth: 1,
    // borderColor: "black",
    // height: "auto"
  }
});
