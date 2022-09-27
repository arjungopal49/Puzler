import React from 'react';
import {StyleSheet} from "react-native";
import {nerdleColors} from "../Nerdle Assets/src/nerdleConstants";

const nerdleStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#565e49",
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        color: nerdleColors.lightgrey,
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
        backgroundColor: nerdleColors.darkgrey,
        flex: 1,
        maxWidth: 70,
        aspectRatio: 1,
        margin: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    cellText: {
        color: nerdleColors.lightgrey,
        fontWeight: "bold",
        fontSize: 28,
    },menuContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        backgroundColor: "#111111"

    },
    menuButton: {
        alignItems: "center",
        backgroundColor: "#fa9819",
        padding: 40,
        marginHorizontal: 20,
        height: 20,
        marginTop: 40,

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
        fontSize:20,
        alignItems: 'center',
        justifyContent: 'center',

    }
});

export default nerdleStyles;
