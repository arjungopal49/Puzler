import React from 'react';
import {StyleSheet} from "react-native";
import {wordleColors} from "../Wordle Assets/src/constants";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: wordleColors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordBoxContainer: {
    flex: 1,
    backgroundColor: "#392b3f",
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: wordleColors.lightgrey,
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 7,
    marginTop:50
  },

  map: {
    alignSelf: "stretch",
    marginVertical: 20,
    height: 100
  },
  row:{
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center"
  },
  cell:{
    borderWidth: 3,
    backgroundColor: wordleColors.darkgrey,
    flex: 1,
    maxWidth: 70,
    aspectRatio: 1,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    color: wordleColors.lightgrey,
    fontWeight: "bold",
    fontSize: 28,
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#111111"

  },
  menuButton: {
    alignItems: "center",
    backgroundColor: "#fa9819",
    padding: 40,
    marginHorizontal: 100,
    height: 20,
    marginTop: 40,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 15,

  },
  reloadButton: {
    alignItems: "center",
    backgroundColor: "#b330e8",
    padding: 40,
    marginHorizontal: 100,
    height: 20,
    marginTop: 40,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 15,

  },
  menuTittleText: {
    fontSize:70,
    marginTop:0,
    marginBottom:20,
    alignItems: 'center',
    textAlign:'center',
    color:"#dddddd"
  },
  subscript: {
    fontSize:30,
    marginTop:0,
    marginBottom:20,
    alignItems: 'center',
    textAlign:'center',
    color:"#dddddd"
  },
  menuButtonText: {
    fontFamily: "Courier New",
    position: 'relative',
    height: 20,
    fontSize:30,
    fontWeight: "bold",
    alignItems: 'center',
    justifyContent: 'center',
    color:"#dddddd"

  },
  inputLabel: {
  },
  inputText: {
    backgroundColor: "#fff",
    borderColor: "#0000cc"
  },
  inlineError: {
    color: 'red',
  },
  inlineMessage: {
    color: 'green',
  },
  instructionsBigText: {
    fontSize:40,
    marginTop:0,
    marginBottom:20,
    alignItems: 'center',
    textAlign:'center',
    color:"#dddddd"
  },
  instructionsSmallText: {
    fontSize:20,
    marginTop:0,
    marginBottom:20,
    alignItems: 'center',
    textAlign:'center',
    color:"rgba(221,221,221,0.63)"
  },
  // aceptButton: {
  //   alignItems: "center",
  //   backgroundColor: "#34eb34",
  //   padding: 40,
  //   marginHorizontal: 20,
  //   height: 20,
  //   marginTop: 40,
  // },
  // declineButton: {
  //   alignItems: "center",
  //   backgroundColor: "#eb4034",
  //   padding: 40,
  //   marginHorizontal: 20,
  //   height: 20,
  //   marginTop: 40,
  // }

});



export default styles;
