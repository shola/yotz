import { Text, StyleSheet, View } from "react-native";

export default function Game() {
  return (
    <View style={styles.body}>
      <Text>You started a game!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
