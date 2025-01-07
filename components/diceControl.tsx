import { PropsWithChildren } from "react";
import { Icon, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const DieControl = () => {
  return (
    <View>
      <Button>
        <Icon source="dice-1" size={40}></Icon>
      </Button>
    </View>
  );
};

const DiceControl = () => {
  return (
    <View style={styles.dice}>
      <DieControl />
      <DieControl />
      <DieControl />
      <DieControl />
      <DieControl />
    </View>
  );
};

const styles = StyleSheet.create({
  dice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
export default DiceControl;
