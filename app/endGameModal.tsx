import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Link } from "expo-router";

export default function EndGameModal() {
  return (
    <View style={styles.container}>
      <Link style={styles.button} dismissTo href="/">
        <Button mode="contained">Are you sure?</Button>
      </Link>
      <Link style={styles.button} dismissTo href="game">
        <Button mode="outlined">Continue playing</Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: 12,
  },
});
