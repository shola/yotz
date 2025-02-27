import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Link } from "expo-router";
export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        <Text style={styles.emphasis}>yot-z</Text> is a companion app for the
        classic dice game, Yachtzee®, that will help you keep score.
      </Text>
      <Link href="game" asChild>
        <Button mode="contained">Start new game</Button>
      </Link>
      <Text style={styles.adaNotice}>
        Please note: In order to preserve the layout of the original scorecard,
        the fonts had to be made rather small. Visual assistive technology will
        be further considered in future app versions.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emphasis: {
    fontWeight: "bold",
  },
  message: { padding: 24 },
  adaNotice: { padding: 24, fontSize: 12, fontStyle: "italic" },
});
