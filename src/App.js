import React from "react";
import session from "./lib/session";

import LoginScreen from "./screens/login";
import HomeScreen from "./screens/home";

const App = () => {
  //session.getUsername() - set default value to state from localStorage (in
  // case of page refresh)
  const [currentUsername, setCurrentUsername] = React.useState(session.getUsername());

  const onLoggedIn = (Player) => {
    session.login(Player);
    setCurrentUsername(Player.data().Name);//force page re-draw
  };

  const onLoggedOut = () => {
    session.logout();
    setCurrentUsername('');//force page re-draw
  };

  if (session.isLogged()) {
    return (<HomeScreen onLoggedOut={onLoggedOut} currentUsername={session.getUsername()}/>);
  } else {
    return (<LoginScreen onLoggedIn={onLoggedIn}/>);
  }
}

export default App;
