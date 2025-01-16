import React from "react";
import type { ReactNode } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-paper";
import type { GameCardStyles } from "@/components/gameCard/gameCardStyles";

interface RowWithCenterArrowIcon {
  firstColumn: ReactNode;
  value: number;
  styles: GameCardStyles;
}

export function RowWithCenterArrowIcon({
  firstColumn,
  value,
  styles,
}: RowWithCenterArrowIcon) {
  return (
    <View style={styles.row}>
      {firstColumn}
      <View style={styles.col2StyleNormal}>
        <View style={styles.arrow}>
          <Icon source="arrow-right-thin" size={30} />
        </View>
      </View>
      <View style={styles.col3StyleNormal}>
        <Text>{value}</Text>
      </View>
    </View>
  );
}
