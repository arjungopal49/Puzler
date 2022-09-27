import { View, Text, Pressable } from "react-native";
import React from "react";
import { keys, nerdleENTER, nerdleCLEAR, nerdleColors } from "../../nerdleConstants";
import styles, { keyWidth } from "./NerdleKeyboard.styles";

const NerdleKeyboard = ({
  onKeyPressed = () => {},
  greenCaps = [],
  yellowCaps = [],
  greyCaps = [],
}) => {
  const isLongButton = (key) => {
    return key === nerdleENTER || key === nerdleCLEAR;
  };

  const getKeyBGColor = (key) => {
    if (greenCaps.includes(key)) {
      return nerdleColors.primary;
    }
    if (yellowCaps.includes(key)) {
      return nerdleColors.secondary;
    }
    if (greyCaps.includes(key)) {
      return nerdleColors.darkgrey;
    }
    return nerdleColors.grey;
  };

  return (
    <View style={styles.keyboard}>
      {keys.map((keyRow, i) => (
        <View style={styles.row} key={`row-${i}`}>
          {keyRow.map((key) => (
            <Pressable
              onPress={() => onKeyPressed(key)}
              key={key}
              style={[
                styles.key,
                isLongButton(key) ? { width: keyWidth * 1.4 } : {},
                { backgroundColor: getKeyBGColor(key) },
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

export default NerdleKeyboard;
