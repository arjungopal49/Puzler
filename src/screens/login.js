import React, {useEffect, useState} from "react";
import {Button, View, Text} from "react-native";
import styles from './../lib/styles';
import {TextInput} from "react-native-web";
import {collection, doc, getDoc, getDocs, limit, orderBy, query, where} from "firebase/firestore/lite";
import db from "../lib/db";

const EXPECTED_USERNAME = 'zain';

class LoginPage extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      screen: 'login',
      loginError: '',

      loginForm: {
        username: '',
      },
      registerForm: {
        username: '',
      }
    };

    this.onLoggedIn = props.onLoggedIn;

    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onRegisterPressed = this.onRegisterPressed.bind(this);
    this.onLoginPressed = this.onLoginPressed.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.onLoginUserChange = this.onLoginUserChange.bind(this);
  }



 async onLoginSubmit() {
    if (!this.state.loginForm.username) {
      this.setState({loginError: 'Empty username.'});
    } else {
      const colPlayers = collection(db, 'Players');
      console.log(this.state.loginForm.username);
      let q = query(colPlayers, limit(1), where("Name", "==", this.state.loginForm.username));
      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            this.setState({loginError: 'User Not Found'});
            return;
        }

        querySnapshot.forEach((doc) => {
          this.onLoggedIn(doc);
          console.log(doc.data()); //use this data in profiles.js
        });
      } catch (e) {
        console.error('MY CUSTOM EXCEPTION HAPPENED');
        console.error(e);
      }
    }
  }

  onRegisterPressed() {
    this.setState({screen: 'register'});
  }

  onLoginPressed() {
    this.setState({screen: 'login'});
  }

  onRegisterSubmit() {
    alert('onRegisterFormSubmit');
  }

  onLoginUserChange(event) {
    this.setState({
      loginForm: {username: event.target.value}
    });
  }

  render() {
    if (this.state.screen === 'register') {
      return this.renderRegister();
    } else {
      return this.renderLogin();
    }
  }

  renderLogin() {
    return (
      <View style={styles.menuContainer}>
        <div className="board">
          <form onSubmit={this.onLoginSubmit}>

            <h1 className='login'>Login Page</h1>

            <Text style={styles.inputLabel}>Username:</Text>
            <TextInput name="username" required  style={styles.inputText} onChange={this.onLoginUserChange}/>
            {this.state.loginError && <Text style={styles.inlineError}>{this.state.loginError}</Text>}

            <Button onPress={this.onLoginSubmit} title="Login" color="#841584"/>
            <Button onPress={this.onRegisterPressed} title="Register" color="#841584"/>

          </form>
        </div>
      </View>
    );
  }

  renderRegister() {
    return (
      <View style={styles.menuContainer}>
        <div className="board">
          <form onSubmit={this.onRegisterSubmit}>

            <h1 className='register'>Register Page</h1>
            <Button onPress={this.onRegisterSubmit} title="Do Register - FUTURE" color="#841584"/>
            <Button onPress={this.onLoginPressed} title="Back To Login" color="#841584"/>
          </form>
        </div>
      </View>
    );
  }
}

export default LoginPage;
