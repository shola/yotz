import { PropsWithChildren, useContext, useRef, useState } from "react";
import { Icon, Button, Menu } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import type { DiceContextType, DieValue } from "@/app/game";
import { DiceContext } from "@/app/game";

interface DieControlProps {
  dieValue: DieValue;
  diePosition: number;
}
const DieControl = ({ dieValue, diePosition }: DieControlProps) => {
  const possibleDieValues: DieValue[] = [1, 2, 3, 4, 5, 6];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { diceValues, setDiceValues } =
    useContext<DiceContextType>(DiceContext);

  const replaceDieValue = (newDieVal: DieValue) => {
    const newDiceValues = [...diceValues];
    newDiceValues.splice(diePosition, 1, newDieVal);
    setDiceValues(newDiceValues);
  };

  const DieButton = (
    <Button onPress={() => setIsMenuOpen(true)}>
      <Icon source={`dice-${dieValue}`} size={40}></Icon>
    </Button>
  );

  const DieMenuItem = (val: DieValue, menuIdx: Number) => (
    <Menu.Item
      key={`die-menu-item-${menuIdx}`}
      title={<Icon source={`dice-${val}`} size={40}></Icon>}
      onPress={() => {
        replaceDieValue(val);
        setIsMenuOpen(false);
      }}
    />
  );

  return (
    <View>
      <Menu
        visible={isMenuOpen}
        onDismiss={() => setIsMenuOpen(false)}
        anchor={DieButton}
        anchorPosition="bottom"
      >
        {possibleDieValues.map(DieMenuItem)}
      </Menu>
    </View>
  );
};

export default function DiceControl() {
  const { diceValues } = useContext<DiceContextType>(DiceContext);

  return (
    <View style={styles.dice}>
      {diceValues.map((dieValue, idx) => (
        <DieControl
          key={`die-control-${idx}`}
          diePosition={idx}
          dieValue={dieValue}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dice: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
