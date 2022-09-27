import { View, Text, Pressable } from "react-native";
import { keys, wordleENTER, worldeCLEAR, wordleColors } from "../../constants";
import styles, { keyWidth } from "./Keyboard.styles";
import React from "react";


const WordleKeyboard = ({
                          onKeyPressed = () => {},
                          greenCaps = [],
                          yellowCaps = [],
                          greyCaps = [],
                        }) => {
  const isLongButton = (key) => {
    return key === wordleENTER || key === worldeCLEAR;
  };

  const getKeyBGColor = (key) => {
    if (greenCaps.includes(key)) {
      return wordleColors.primary;
    }
    if (yellowCaps.includes(key)) {
      return wordleColors.secondary;
    }
    if (greyCaps.includes(key)) {
      return wordleColors.darkgrey;
    }
    return wordleColors.grey;
  };

  return (
      <View style={styles.keyboard}>
        {keys.map((keyRow, i) => (
            <View style={styles.row} key={`row-${i}`}>
              {keyRow.map((key) => (
                  <Pressable
                      onPress={() => onKeyPressed(key)}
                      // disabled={greyCaps.includes(key)}
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

export default WordleKeyboard;
