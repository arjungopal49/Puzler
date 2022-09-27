import React, {useEffect, useState} from "react";
import {Button, View, Text} from "react-native";
import styles from './../../lib/styles';
import {TextInput} from "react-native-web";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where
} from "firebase/firestore/lite";
import db from "../../lib/db";
import session from "../../lib/session";

class AddFriend extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      form: {
        username: '',
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

 async findPlayerDocByUsername(username) {
   const colPlayers = collection(db, 'Players');
   let q = query(colPlayers, limit(1), where("Name", "==", username));

   const querySnapshot = await getDocs(q);
   if (querySnapshot.empty) {
     throw new Error('Friend Not Found by username');
   }

   return querySnapshot.docs[0];
 }

  async findPlayerDocById(id) {
    const docRef = doc(db, 'Players', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Player Not Found by id');
    }
    return docSnap;
  }

  async addFriendDocument(parentDoc, childDoc) {
    if (parentDoc.id === childDoc.id) {
      throw new Error('Sorry, can\'t add yourself to the friends list!!!');
    }

    const Name = childDoc.data().Name;
    let Friends = parentDoc.data().Friends;
    Friends = !!Friends ? Friends : [];

    if (Friends.indexOf(Name) !== -1) {
      throw new Error('Sorry, can\'t add already added friend!!!');
    }

    const delIndex = Friends.indexOf(Name);
    Friends.slice(delIndex, 1);

    Friends.push(Name);

    const docRef = doc(db, 'Players', parentDoc.id);

    await updateDoc(docRef, {Friends: Friends});
  }

  async delFriendDocument(parentDoc, childDoc) {
    if (parentDoc.id === childDoc.id) {
      throw new Error('Sorry, can\'t add yourself to the friends list!!!');
    }

    const Name = childDoc.data().Name;
    let Friends = parentDoc.data().Friends;
    Friends = !!Friends ? Friends : [];

    //take care about it
    if (Friends.indexOf(Name) === -1) {
      throw new Error('Sorry, can\'t add remove unexisting friend!!!');
    }

    Friends = Friends.filter(name => name !== Name);

    const docRef = doc(db, 'Players', parentDoc.id);

    await updateDoc(docRef, {Friends: Friends});
  }

 async onSubmit() {
    if (!this.state.form.username) {
      this.setState({error: 'Empty username.'});
      return ;
    }

    try {
      const friendDoc = await this.findPlayerDocByUsername(this.state.form.username);
      const currentPlayerDoc = await this.findPlayerDocById(session.getUserid());

      await this.addFriendDocument(currentPlayerDoc, friendDoc);
      this.setState({error: null, message: 'The user has been added to Friends list'});
    } catch (e) {
      this.setState({error: e.message, message: null});
    }
  }

  onUsernameChange(event) {
    this.setState({
      form: {username: event.target.value}
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>

        <Text style={styles.inputLabel}>Add Friend Username:</Text>
        <TextInput name="username" required  style={styles.inputText} onChange={this.onUsernameChange}/>
        {this.state.error && <Text style={styles.inlineError}>{this.state.error}</Text>}
        {this.state.message && <Text style={styles.inlineMessage}>{this.state.message}</Text>}

        <Button onPress={this.onSubmit} title="Add Friend" color="#841584"/>
      </form>
    )
  }
}

export default AddFriend;
