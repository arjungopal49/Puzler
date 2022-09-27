import { View, Text, Pressable } from "react-native";
import React from "react";
import { keys, boxENTER, boxCLEAR, boxColors } from "../boxConstants";
import styles, { keyWidth } from "./BoxKeyboard.styles";

const BoxKeyboard = ({
  onKeyPressed = () => {},
  greenCaps = [],
  yellowCaps = [],
  greyCaps = [],
}) => {
  const isLongButton = (key) => {
    return key === boxENTER || key === boxCLEAR;
  };

  const getKeyBGColor = (row,col) => {
    if (greenCaps.includes([row,col])) {
      return boxColors.primary;
    }
    if (yellowCaps.includes([row,col])) {
      return boxColors.secondary;
    }
    if (greyCaps.includes([row,col])) {
      return boxColors.darkgrey;
    }
    return boxColors.grey;
  };

  return (
    <View style={styles.keyboard}>
      {keys.map((keyRow, i) => (
        <View style={styles.row} key={`row-${i}`}>
          {keyRow.map((key,j) => (
            <Pressable
              onPress={() => onKeyPressed(key,i,j)}
              key={key}
              style={[
                styles.key,
                isLongButton(key) ? { width: keyWidth * 1.4 } : {},
                { backgroundColor: getKeyBGColor(i,j) },
              ]}
            >
              <Text style={styles.keyText}>{key.toUpperCase()}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default BoxKeyboard;
