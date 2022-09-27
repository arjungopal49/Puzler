import React from 'react'
import './../lib/style.css';

const DUMMY_IMG = 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2b/2b460fd0071059895f4295043c01c45fc5d40988.jpg';

const PROF_PIC = [
    "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2b/2b460fd0071059895f4295043c01c45fc5d40988.jpg",
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

const textStyle = {
    color: 'blue',
    fontSize: 30
};

const nameStyle = {
    color: 'white',
    fontSize: 30
}

const divStyle = {
    borderWidth: 10,
    flex: 1,
    flexDirection: "row",
    borderColor: 'white',
    alignItems: 'center'
}

const imgStyle = {
    height: 80,
    width: 80
}


function Item(data){
    return (

        <>
            {
                data.map((value, index) => (
                    <div className="flex" key={index}>
                        <div className="item">
                            <img style = {imgStyle} src={PROF_PIC[value.Pfp]} alt="" />

                            <div className="info">
                                <h3 className='name text-dark'>{value.Name}</h3>
                                {/*<span className='name text-dark'>{!!value.location ? value.location : 'Unknown location'}</span>*/}
                            </div>
                        </div>
                        <div className="item">
                            <span className='name text-dark'>{value.Rating}</span>
                        </div>
                    </div>
                    )
                )
            }
        </>


    )
}
