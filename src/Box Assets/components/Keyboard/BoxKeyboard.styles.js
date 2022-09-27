import { StyleSheet, Dimensions } from "react-native";
import { keys, boxColors } from "../boxConstants";

const screenWidth = Dimensions.get("window").width;
export const keyWidth = (screenWidth - 1100)*.7 / keys[0].length;
const keyHeight = keyWidth ;

export default StyleSheet.create({
  keyboard: {
    alignSelf: "stretch",
    marginTop: "auto",
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  key: {
    width: keyWidth - 4,
    height: keyHeight - 4,
    margin: 2,
    borderRadius: 5,
    backgroundColor: boxColors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    color: boxColors.lightgrey,
    fontWeight: "bold",
  },
});
