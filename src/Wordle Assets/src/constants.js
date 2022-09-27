export const wordleColors = {
  black: "#121214",
  darkgrey: "#3A3A3D",
  grey: "#818384",
  lightgrey: "#D7DADC",
  primary: "#538D4E",
  secondary: "#B59F3B",
};

export const colorsToEmoji = {
  [wordleColors.darkgrey]: "⬛",
  [wordleColors.primary]: "🟩",
  [wordleColors.secondary]: "🟧",
};

export const wordleENTER = "ENTER";
export const worldeCLEAR = "CLEAR";

export const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  [wordleENTER, "z", "x", "c", "v", "b", "n", "m", worldeCLEAR],
];