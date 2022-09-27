import React, {useCallback, useEffect, useRef, useState} from "react";
import { StatusBar } from 'expo-status-bar';
import {Alert, StyleSheet, Text, TouchableOpacity, View, Button, Dimensions} from 'react-native';
import { wordleColors, worldeCLEAR, wordleENTER} from "../Wordle Assets/src/constants";
import { nerdleColors, nerdleCLEAR, nerdleENTER} from "../Nerdle Assets/src/nerdleConstants";
import { boxColors, boxCLEAR, boxENTER} from "../Box Assets/components/boxConstants.js";
import { useCollectionData } from 'react-firebase-hooks/firestore';



import NerdleKeyboard from "../Nerdle Assets/src/components/Keyboard";
import WordleKeyboard from "../Wordle Assets/src/components/Keyboard";
import BoxKeyboard from "../Box Assets/components/Keyboard";

import {query, limit, collection, getDocs, updateDoc, doc, orderBy, startAfter, getDoc} from "firebase/firestore/lite";
import db from './../lib/db'
import session from "../lib/session";
import Profiles from './../lib/profiles';
import './../lib/style.css';
import styles from './../lib/styles';
import nerdleStyles from './../lib/nerdleStyles';


import AddFriend from "./component/addfriend";


const getFakeFirestoreData = async (startAfterElement = null) => {
  const colPlayers = collection(db, 'Players');

  let q = query(colPlayers, orderBy("Rating", "desc"));


  let result = [];
  try {
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      result.push(doc.data());
      console.log(doc.data()); //use this data in profiles.js
    });
  } catch (e) {
    console.error('MY CUSTOM EXCEPTION HAPPENED');
    console.error(e);
  }

  return result;
};

const getFakeFirestoreData_SB = async (playerId) => {
  console.log("----------getFakeFirestoreData_SB #1 -----------------")

  const docRef = doc(db, 'Players', playerId);
  const docSnap = await getDoc(docRef);
  console.log('I AM HERE [ docRef ]', docRef);
  console.log('I AM HERE [ docSnap.data() ]', docSnap.data());

  // Get the number_of_friends
  // Store the FB "Friends" Document Field in a local Friends_List array
  // Number_of_Friends = Get the size of Friends_List
  // For i= 1 to  number_of_friends
  // Create query q where Document.Name = Friends_List[Name]
  // Run Query and get a doc
  // Push doc in the the Result

  console.log('Friends---[ docSnap.data() ]', docSnap.data().Friends);
  var friendNames = docSnap.data().Friends
  // console.log(names[0])

  const colPlayers = collection(db, 'Players');
  //@todo: collect all Name and add to query using IN
  let q = query(colPlayers, orderBy("Rating", "desc"));

  console.log("------------------------------------------")

  let result = [];
  try {
    //it is not optimized - looping through entire collection
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log('Baba Chu', doc.data().Name);
      if (friendNames.includes(doc.data().Name)) {
        result.push(doc.data());
        console.log(doc.data()); //use this data in profiles.js
      }
    });
  } catch (e) {
    console.error('MY CUSTOM EXCEPTION HAPPENED');
    console.error(e);
  }
  console.log('results -', result)
  return result;
};

const NUMBER_OF_TRIES = 6;


const copyArray = (arr) => {
  return [... arr.map((rows) => [...rows])];
};

const Home = ({onLoggedOut, currentUsername}) => {

  const [firebaseData, setFirebaseData] = useState([]);
  const [firebaseLoaded, setFirebaseLoaded] = useState(false);
  const [currentScreen, setScreen] = useState("menu");
  const [score, setScore] = useState(50);
  const [hasPlayed, setPlayed] = useState(false);
  // const [game, setGOTD] = useState("Wordle");
  const [game, setGOTD] = useState("Wordle");




  //SS
  const [firebaseData_SB, setFirebaseData_SB] = useState([]);
  const [firebaseLoaded_SB, setFirebaseLoaded_SB] = useState(false);

  const word = "hello";
  const letters = word.split('');

  const equation = "13+24=37";
  const numbers = equation.split('');
  let numCols;

  if (game == "Wordle") {
    numCols = word.length;
  } else {
    numCols = equation.length;
  }
  const [rows, setRows] = useState(new Array(NUMBER_OF_TRIES).fill(new Array(numCols).fill("")));

  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState('playing');

  const [timer, setTimer] = useState(0);
  const [gamedone, setGameDone] = useState(false);

  const onPressSocialboard = () => {
    setScreen("socialboard");
  }

  const nextSec = () => {
    setTimeout(async () => {
      if (timer != 30) {
        setTimer(timer + 1)
        console.log(timer)
        setGameDone(true)
        setScore(boxPoints)
        await addPointsToPlayer(session.getUserid(), score);
        setScreen("result")
        setPlayed(true)
        nextSec()
      } else {
        setGameDone(true)
        setScore(boxPoints)
        await addPointsToPlayer(session.getUserid(), score);
        setScreen("result")
        setPlayed(true)
      }
    }, 20000);
  }

  const onPress = () => {
    console.log(gameOfDay)
    if (gameOfDay[0] == "Wordle") {
      numCols = 5;
      setScreen("game");
    } else if (gameOfDay[0] == "Nerdle") {
      numCols = 8;
      setScreen("game2");
    } else if (gameOfDay[0] == "Simon Says") {
      setScreen("game3");
    } else if (gameOfDay[0] == "Word Box") {
      setScreen("game4");
      nextSec()
    }
  }


  const onReloadPressed_SB = async () => {

    console.log("----------ADD SOCIAL RELOAD PRESSED-----------------")

    // if (!!firebaseData_SB) {
    //   //Start from the last item (excluding it)
    //   const lastItem = firebaseData_SB[firebaseData_SB.length - 1];
    //   setFirebaseData_SB(await getFakeFirestoreData_SB(lastItem))
    // } else {
    //   //Start from the first item
    //   setFirebaseData_SB(await getFakeFirestoreData_SB())
    // }
    setFirebaseData_SB(await getFakeFirestoreData_SB(session.getUserid()))
    setScreen("socialboard")
  };

  const onPress2 = () => {
    setScreen("menu");
  }

  const onPressInstructions = () => {
    setScreen("instructions")
  }

  const onPressFriendChat = async (playerId) => {
    // setScreen("messages")

  }


  const onPresslboard = () => {
    setScreen("lboard");
  }

  const onPressProf = () => {
    setScreen("profile");
  }

  const [getGameBool, setGetGameBool] = useState(false);
  const [gameOfDay, setGameOfDay] = useState([]);

  useEffect(async () => {
    if (curRow > 0 && gameOfDay[0] == "Wordle") {
      await checkGameState();
    }
    if (curRow > 0 && gameOfDay[0] == "Nerdle") {
      await nerdleCheckGameState();
    }

    if (gameOfDay[0] == "Wordle") {
      numCols = 5;
    } else {
      numCols = 8;
    }


    if (!firebaseLoaded) {
      setFirebaseLoaded(true);
      setFirebaseData(await getFakeFirestoreData());
    }

    if (!firebaseLoaded_SB) {
      setFirebaseLoaded_SB(true);
      setFirebaseData_SB(await getFakeFirestoreData_SB(session.getUserid()));
    }

    if (!getGameBool) {
      setGetGameBool(true);
      setGameOfDay(await getFirestoreDataGame(session.getUserid()));
      setGOTD(gameOfDay[0]);
    }
  })

  const getFirestoreDataGame = async (playerId) => {
    console.log("----------getFakeFirestoreData_SB #1 -----------------")

    const docRef = doc(db, 'Game', "GOTD");
    const docSnap = await getDoc(docRef);
    console.log('I AM HERE [ docRef ]', docRef);
    console.log('I AM HERE [ docSnap.data() ]', docSnap.data());

    console.log('Friends---[ docSnap.data() ]', docSnap.data().Friends);
    var friendNames = docSnap.data().gameOfDay
    var arrayer = [friendNames]
    return arrayer
  };

  const nerdleCheckGameState = async () => {
    if (nerdleCheckIfWon()) {
      // setScore(32 + (curRow)*14))
      Alert.alert("GAME OVER", "You win")
      setGameState('won')
      setTimeout(() => {
        clearBoard();
      }, 1000);
      await addPointsToPlayer(session.getUserid(), score);
      setScreen("result")
      setPlayed(true)
    } else if (checkIfLost()) {
      setScore(0)
      Alert.alert("GAME OVER", "You lose")
      setGameState('lost')
      setTimeout(() => {
        clearBoard();
      }, 1000);
      setScreen("result")
      setPlayed(true)
    }
  }

  const nerdleCheckIfWon = () => {
    const row = rows[curRow - 1];
    setScore(30 + ((6-curRow)*14))
    return row.every((number, i) => number === numbers[i])
  }

  const checkGameState = async () => {
    if (checkIfWon()) {
      // setScore(32 + (curRow)*14))
      Alert.alert("GAME OVER", "You win")
      setGameState('won')
      setTimeout(() => {
        clearBoard();
      }, 1000);
      await addPointsToPlayer(session.getUserid(), score);
      setScreen("result")
      setPlayed(true)
    } else if (checkIfLost()) {
      setScore(0)
      Alert.alert("GAME OVER", "You lose")
      setGameState('lost')
      setTimeout(() => {
        clearBoard();
      }, 1000);
      setScreen("result")
      setPlayed(true)
    }
  }

  const clearBoard = () => {
    const updatedRows = copyArray(rows);
    for (var i = 0; i < updatedRows.length; i++) {
      for (var j = 0; j < updatedRows[0].length; j++) {
        updatedRows[i][j] = "";
      }
    }
    setRows(updatedRows);
    setCurRow(0);
    setCurCol(0);
    setGameState('playing')
  }

  const checkIfWon = () => {
    const row = rows[curRow - 1];
    setScore(30 + ((6-curRow)*14))
    return row.every((letter, i) => letter === letters[i])
  }

  const checkIfLost = () => {
    return curRow === rows.length;
  }

  const onKeyPressed = (key) => {
    if (gameState !== "playing") {
      return;
    }

    const updatedRows = copyArray(rows);

    if (key === worldeCLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === wordleENTER) {
      if (curCol === rows[0].length) {

        const guess = rows[curRow].join("");
        console.log(guess);
        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + guess;

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              if (responseJson["title"] === "No Definitions Found") {
                Alert.alert("SORRY", "This word does not exist")
                updatedRows[curRow][curCol - 1] = "";
                setRows(updatedRows);
                setCurCol(curCol - 1);
              } else {
                setCurRow(curRow+1);
                setCurCol(0);
              }
            })
            .catch((error) => {
              console.error(error);
            });

      }
      return;
    }

    if(curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol+1);
    }
  }

  const nerdleOnKeyPressed = (key) => {
    if (gameState !== "playing") {
      return;
    }

    const updatedRows = copyArray(rows);

    if (key === nerdleCLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === nerdleENTER) {
      if (curCol === rows[0].length) {

        let guess = rows[curRow].join("");
        console.log(guess);
        if (guess.includes("=")){
          guess = guess.replace('=','==');
          if (guess.charAt(0) === "0") {
            guess = guess.replace(0, "");
          }
          guess = guess.replace('+0','+');
          guess = guess.replace('-0','-');
          guess = guess.replace('/0','/');
          guess = guess.replace('*0','*');
          guess = guess.replace('=0','=');

          if (eval(guess)){
            console.log(guess);
            setCurRow(curRow+1);
            setCurCol(0);
          } else {
            console.log("NOT TRUE");
            updatedRows[curRow][curCol - 1] = "";
            setRows(updatedRows);
            setCurCol(curCol - 1);
          }

        }


      }
      return;
    }

    if(curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol+1);
    }
  }

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  }

  const getCellBGColor = ( row, col) => {
    const letter = rows[row][col];
    if (row >=  curRow) {
      return wordleColors.black;
    }
    if (letter === letters[col]) {
      return wordleColors.primary;
    }
    if (letters.includes(letter)) {
      return wordleColors.secondary;
    }
    return wordleColors.darkgrey;
  }

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) => row.filter((cell, j) => getCellBGColor(i, j) === color));
  }

  const greenCaps = getAllLettersWithColor(wordleColors.primary)
  const yellowCaps = getAllLettersWithColor(wordleColors.secondary)
  const greyCaps = getAllLettersWithColor(wordleColors.darkgrey)


  const NerdlegetCellBGColor = (row, col) => {
    const letter = rows[row][col];
    let guess = rows[curRow].join("");
    let count = equation.split(letter).length - 1;
    let guessCount = guess.split(letter).length - 1;

    if (row >=  curRow) {
      return nerdleColors.black;
    }
    if (letter === numbers[col]) {
      return nerdleColors.primary;
    }
    if (numbers.includes(letter)) {
      return nerdleColors.secondary;
    }
    return nerdleColors.darkgrey;
  }

  const NerdlegetAllNumbersWithColor = (color) => {
    return rows.flatMap((row, i) => row.filter((cell, j) => NerdlegetCellBGColor(i, j) === color));
  }

  const nerdleTealCaps = NerdlegetAllNumbersWithColor(nerdleColors.primary)
  const nerdlePurpleCaps = NerdlegetAllNumbersWithColor(nerdleColors.secondary)
  const nerdleGreyCaps = NerdlegetAllNumbersWithColor(nerdleColors.darkgrey)



  const [boxPoints, setBoxPoints] = useState(0);
  const [lastRow, setLastRow] = useState(null);
  const [lastCol, setLastCol] = useState(null);
  const [currentGuess, setCurrentGuess] = useState("");

  const [curbox, setCurBox] = useState([]);
  const [allbox, setAllBox] = useState([]);
  const [guessedWord, setGuessedWord] = useState([]);
  // let curbox = [];
  // let allbox = [];
  // let guessedWord = [];
  // const greyCaps = getAllLettersWithColor(wordleColors.darkgrey)




  const onBoxKeyPressed = (key,row,col) => {
    if (gameState !== "playing") {
      return;
    }

    if (key === boxCLEAR) {
      setCurrentGuess("")
      setLastRow(null)
      setLastCol(null)
      setCurBox([])
      setAllBox([])
      return;
    }
    if (key === boxENTER) {
      const guess = currentGuess;
      console.log("guessed words ---",guessedWord);
      guessedWord.push(guess)
      console.log(guess);
      const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + guess;

      fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson["title"] === "No Definitions Found") {
              Alert.alert("SORRY", "This word does not exist")

            } else {
              if(guessedWord.includes(guess)) {
                setBoxPoints(boxPoints + (guess.length*20));
              }
              setCurrentGuess("")
              setLastRow(null)
              setLastCol(null)
              setCurBox([])
              setAllBox([])
            }
          })
          .catch((error) => {
            console.error(error);
          });
      return;
    }
    if(((Math.abs(lastRow-row)<=1)&&(Math.abs(lastCol-col)<=1))||(lastCol === null)){
      setLastRow(row)
      setLastCol(col)
      setCurrentGuess(currentGuess+key)
      setCurBox([[row,col]])
      allbox.push([row,col])
      console.log("curbox ---",curbox);
      console.log("allbox ---",allbox);
    }
  }

  const onReloadPressed = async () => {

    if (!!firebaseData) {
      //Start from the last item (excluding it)
      const lastItem = firebaseData[firebaseData.length - 1];
      setFirebaseData(await getFakeFirestoreData(lastItem))
    } else {
      //Start from the first item
      setFirebaseData(await getFakeFirestoreData())
    }

    setScreen("lboard")
  };

  if(currentScreen === "menu"){
    return (
      <View style={styles.menuContainer}>
        <View style = {{flex: 1, flexDirection: "row", justifyContent: "center"}}>
          <Text style={styles.menuTittleText}>PUZZLER</Text>
          <img style={{height: 80, width: 80, marginTop: 20, marginLeft:20}} src={"https://i.ibb.co/YBmkYLs/puzzler-ss.png"} alt="" />
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={onPress}>
          <Text style={styles.menuButtonText}>PLAY</Text>
        </TouchableOpacity>
        {/*<TouchableOpacity style={styles.menuButton} onPress={onPressPlayerPoints}>*/}
        {/*  <Text style={styles.menuButtonText}>GIVE BONUS POINTS - FUTURE</Text>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity style={styles.menuButton}onPress={onPressSocialboard}>
          <Text style={styles.menuButtonText}>SOCIAL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={onPressInstructions}>
          <Text style={styles.menuButtonText}>How to Play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={onPresslboard}>
          <Text style={styles.menuButtonText}>LEADERBOARD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={onPressProf}>
          <Text style={styles.menuButtonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={onLoggedOut}>
          <Text style={styles.menuButtonText}>LOGOUT ({currentUsername})</Text>
        </TouchableOpacity>
      </View>
    );
  }
  else if(currentScreen === "game"){
    numCols = 5;
    return (
        <View style={styles.container}>
          <StatusBar style="Light" />

          <Text style = {styles.title}>Wordle</Text>

          <View style={styles.map}>

            {rows.map((row, i) => (
                <View  key = {`row-${i}`}  style={styles.row}>
                  {row.map((letter, j) => (
                      <View
                          key = {`cell-${i}-${j}`}
                          style={[styles.cell,
                            {
                              borderColor: isCellActive(i, j) ? wordleColors.lightgrey: wordleColors.darkgrey,
                              backgroundColor: getCellBGColor(i, j)

                            }]
                          }>

                        <Text style = {styles.cellText}>{letter.toUpperCase()}</Text>

                      </View>
                  ))}

                </View>
            ))}

          </View>

          <WordleKeyboard onKeyPressed={onKeyPressed} greenCaps={greenCaps} yellowCaps={yellowCaps} greyCaps={greyCaps}/>
        </View>
    );
  }
  else if (currentScreen === "game2") {
    return (
        <View style={nerdleStyles.container}>
          <StatusBar style="Light" />

          <Text style = {nerdleStyles.title}>Nerdle</Text>

          <View style={nerdleStyles.map}>

            {rows.map((row, i) => (
                <View  key = {`row-${i}`}  style={nerdleStyles.row}>
                  {row.map((number, j) => (
                      <View
                          key = {`cell-${i}-${j}`}
                          style={[nerdleStyles.cell,
                            {
                              borderColor: isCellActive(i, j) ? nerdleColors.lightgrey: nerdleColors.darkgrey,
                              backgroundColor: NerdlegetCellBGColor(i, j)

                            }]
                          }>

                        <Text style = {nerdleStyles.cellText}>{number.toUpperCase()}</Text>

                      </View>
                  ))}

                </View>
            ))}

          </View>

          <NerdleKeyboard onKeyPressed={nerdleOnKeyPressed} greenCaps={nerdleTealCaps} yellowCaps={nerdlePurpleCaps} greyCaps={nerdleGreyCaps}/>
        </View>
    );
  }
  // else if (currentScreen === "game3") {
  //   return (
  //       <View style={simonSaysStyles.container}>
  //         <View style={simonSaysStyles.textBox}>
  //           <Text>Score :{mainSequence.length-1>0?mainSequence.length-1:0}</Text>
  //           <Text>Best score :{simonSaysBestScore}</Text>
  //         </View>
  //         <View>
  //           <View style={simonSaysStyles.gameBox}>
  //             {this._renderTiles(0)}
  //             {this._renderTiles(1)}
  //           </View>
  //           <View style={simonSaysStyles.gameBox}>
  //             {this._renderTiles(2)}
  //             {this._renderTiles(3)}
  //           </View>
  //         </View>
  //         <Button title="PLAY!" onPress={()=>this._resetTheGame()}/>
  //       </View>
  //   );
  // }
  else if(currentScreen === "game4"){
    return (
        <View style={styles.wordBoxContainer}>
          <StatusBar style="Light" />

          <Text style = {styles.title}>Word Box</Text>
          <Text style = {styles.title}>{boxPoints}</Text>
          {/*<Text style = {styles.title}>{timer}</Text>*/}
          <Text style = {styles.title}>{currentGuess}</Text>

          <BoxKeyboard onKeyPressed={onBoxKeyPressed} greenCaps={curbox} yellowCaps={allbox} greyCaps={greyCaps}/>
        </View>
    );
  }
  else if(currentScreen === "result") {
    return (
      <View style={styles.menuContainer}>
        <View>
          <Text style={styles.menuTittleText}>GOOD JOB</Text>
        </View>
        <View>
          <Text style={styles.subscript}>you got a score of score {score}</Text>
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={onPress2}>
          <Text style={styles.menuButtonText}>BACK TO MENU</Text>
        </TouchableOpacity>

      </View>
    );
  }
  else if (currentScreen === "instructions") {
    return (
        <View style={styles.menuContainer}>
          <Text style={styles.instructionsBigText}>Wordle</Text>
          <Text style={styles.instructionsSmallText}>Guess the 5-letter word in six tries.
            Each guess must be a valid five-letter word. Hit the enter button to submit.
            After each guess, the color of the tiles will change to show how close your guess was to the word.
          </Text>
          <Text style={styles.instructionsBigText}>Nerdle</Text>
          <Text style={styles.instructionsSmallText}>Guess the 8-character calculation in 6 tries.
            Each should be a calculation.
            You can use 0 1 2 3 4 5 6 7 8 9 + - * / or =.
            It must contain one “=”.
            It must only have a number to the right of the “=”, not another calculation.
            Standard order of operations applies
          </Text>
          <Text style={styles.instructionsBigText}>Simon Says</Text>
          <Text style={styles.instructionsSmallText}>The screen will show a pattern appear on the squares
            Memorize that sequence and recreate it by tapping on the squares
            Longer patterns will generate as you keep going!
          </Text>
          <Text style={styles.instructionsBigText}>Word Box</Text>
          <Text style={styles.instructionsSmallText}>There will be nine different letters that will appear on
            the screen. In 20 seconds, guess as many combinations of words that you can by using the letters that appear.
            the longer the word, the more points you get!
          </Text>
          <TouchableOpacity style={styles.menuButton} onPress={onPress2}>
            <Text style={styles.menuButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
    )
  }
  else if(currentScreen === "lboard") {
    return (
      <View style={styles.menuContainer}>
        <Text style={styles.menuButtonText}>Leaderboard</Text>
        <div className="board">
          <h1 className='leaderboard'>Leaderboard</h1>

          <Profiles Leaderboard={firebaseData} />

          <TouchableOpacity style={styles.reloadButton} onPress={onReloadPressed}>
            <Text style={styles.menuButtonText}>RELOAD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={onPress2}>
            <Text style={styles.menuButtonText}>Back</Text>
          </TouchableOpacity>
          {/*<AddFriend/>*/}
        </div>
      </View>
    );
  }
  else if(currentScreen === "socialboard") {
    return (
        <View style={styles.menuContainer}>
          <div className="board">
            <h1 className='leaderboard'>Social Leaderboard</h1>

            <TouchableOpacity onPress={onPressFriendChat("x")}>
              <Profiles Leaderboard={firebaseData_SB} />
            </TouchableOpacity>

            <Button
                onPress={onReloadPressed_SB}
                title="RELOAD"
                color="#841584"
            />

            <AddFriend />

          </div>
          <TouchableOpacity style={styles.menuButton} onPress={onPress2}>
            <Text style={styles.menuButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

    );
  }
  else if(currentScreen === "profile") {
    return (
        <View style={styles.menuContainer}>
          <div className="board">
            <h1 style={{color: "white"}} className='leaderboard'>Change Profile Picture</h1>
            <TouchableOpacity onPress={()=>{chadgeProfPic(session.getUserid(),0)}}>
              <div className="item">
              <img style = {{height:50, width: 50}} src={PROF_PIC[0]} alt=""/>
              <Text style={styles.instructionsSmallText}>Cougar</Text>
              </div>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{chadgeProfPic(session.getUserid(),1)}}>
              <div className="item">
              <img style = {{height:50, width: 50}} src={PROF_PIC[1]} alt=""/>
              <Text style={styles.instructionsSmallText}>Lion</Text>
              </div>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{chadgeProfPic(session.getUserid(),2)}}>
              <div className="item">
              <img style = {{height:50, width: 50}} src={PROF_PIC[2]} alt=""/>
              <Text style={styles.instructionsSmallText}>Bear</Text>
              </div>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{chadgeProfPic(session.getUserid(),3)}}>
              <div className="item">
                <img style = {{height:50, width: 50}} src={PROF_PIC[3]} alt=""/>
                <Text style={styles.instructionsSmallText}>Tiger</Text>
              </div>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{chadgeProfPic(session.getUserid(),4)}}>
              <div className="item">
                <img style = {{height:50, width: 50}} src={PROF_PIC[4]} alt=""/>
                <Text style={styles.instructionsSmallText}>Fish</Text>
              </div>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={onPress2}>
              <Text style={styles.menuButtonText}>Back</Text>
            </TouchableOpacity>
            {/*<div className="item">*/}
            {/*  <img src={PROF_PIC[0]} alt="" />*/}

            {/*  <div className="info">*/}
            {/*    <h3 className='name text-dark'>baba</h3>*/}
            {/*    /!*<span className='name text-dark'>{!!value.location ? value.location : 'Unknown location'}</span>*!/*/}
            {/*  </div>*/}
            {/*</div>*/}




          </div>
        </View>
    );
  }

  else {
    return (<div>UNKNOWN SCREEN</div>);
  }


}



const addPointsToPlayer = async (playerId, score) => {
  const docRef = doc(db, 'Players', playerId);
  const docSnap = await getDoc(docRef);

  console.log('[ docRef ]', docRef);
  console.log('[ docSnap.data() ]', docSnap.data());

  const newRating = !!docSnap.data().Rating ? docSnap.data().Rating + score : score;//counter;
  console.log('[ docSnap.data().Rating ]', docSnap.data().Rating);
  console.log('[ newRating ]', newRating);

  await updateDoc(docRef, {Rating: newRating});
};

const chadgeProfPic = async (playerId, score) => {
  const docRef = doc(db, 'Players', playerId);
  const docSnap = await getDoc(docRef);


  await updateDoc(docRef, {Pfp: score});
};

const PROF_PIC = [
  "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2b/2b460fd0071059895f4295043c01c45fc5d40988.jpg",
  "https://cdn-icons-png.flaticon.com/512/2219/2219730.png",
  "https://cdn-icons-png.flaticon.com/512/170/170642.png",
  "https://cdn-icons-png.flaticon.com/512/1810/1810989.png",
  "https://cdn-icons-png.flaticon.com/512/196/196675.png",
  "https://cdn-icons-png.flaticon.com/512/235/235386.png"
];






export default Home;
