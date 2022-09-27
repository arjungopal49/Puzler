import React from 'react'
import {Text, TouchableOpacity} from "react-native";
import styles from "../../lib/styles";

const DUMMY_IMG = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2b/2b460fd0071059895f4295043c01c45fc5d40988.jpg';

const PROF_PIC = [
    "https://cdn-icons-png.flaticon.com/512/2219/2219730.png",
    "https://cdn-icons-png.flaticon.com/512/170/170642.png",
    "https://cdn-icons-png.flaticon.com/512/1810/1810989.png",
    "https://cdn-icons-png.flaticon.com/512/196/196675.png",
    "https://cdn-icons-png.flaticon.com/512/235/235386.png"
];

export default function profiles({ Leaderboard }) {
  return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
  )
}



function Item(data){
    return (

        <>
            {
                data.map((value, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <img src={PROF_PIC[value.Pfp]} alt="" />

                            <div className="info">
                                <h3 className='name text-dark'>{value.Name}</h3>
                                 {/*<span className='name text-dark'>{!!value.location ? value.location : 'Unknown location'}</span>*/}
                            </div>
                        </div>
                        <div className="item">
                            <TouchableOpacity style={styles.menuButton} >
                                <Text style={styles.aceptButton}>✔</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuButton} >
                                <Text style={styles.declineButton}>✖</Text>
                            </TouchableOpacity>
                        </div>

                    </div>
                    )
                )
            }
        </>


    )
}
