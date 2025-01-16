import { StyleSheet } from "react-native";

const fontSizeXs = 8;
const fontSizeSm = 10;
const fontSizeMd = 12;

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  col1Header: {
    width: 100,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
    display: "flex",
    alignItems: "center",
  },
  col1StyleNormal: {
    width: 100,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  col2StyleNormal: {
    width: 85,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  col2TextStyleXs: {
    textAlign: "center",
    fontSize: fontSizeXs,
  },
  col2TextStyleSm: {
    textAlign: "center",
    fontSize: fontSizeSm,
  },
  col3StyleNormal: {
    width: 50,
    borderWidth: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dice: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  "text-xs": {
    fontSize: fontSizeXs,
  },
  "text-sm": {
    fontSize: fontSizeSm,
  },
  "text-md": {
    fontSize: fontSizeMd,
  },
  leftAlign: {
    textAlign: "left",
  },
  centerAlignText: {
    textAlign: "center",
  },
  centerAlignView: {
    display: "flex",
    alignItems: "center",
  },
  rightAlign: {
    textAlign: "right",
  },
  bonusCell: { flex: 1, borderWidth: 0.5, height: "100%" },
  diceIconGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: { transform: [{ scaleX: 4 }] },
});

export type GameCardStyles = typeof styles;
export default styles;
