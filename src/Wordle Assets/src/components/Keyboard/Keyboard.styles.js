import { StyleSheet, Dimensions } from "react-native";
import { keys, wordleColors } from "../../constants";

const screenWidth = Dimensions.get("window").width;
export const keyWidth = (screenWidth - 10)*.5 / keys[0].length;
const keyHeight = keyWidth * .9;

export default StyleSheet.create({
  keyboard: {
    alignSelf: "stretch",
    marginTop: 380,
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
    backgroundColor: wordleColors.grey,
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    color: wordleColors.lightgrey,
    fontWeight: "bold",
  },
});
