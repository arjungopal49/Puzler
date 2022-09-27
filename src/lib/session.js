export default {
  getUsername() {
    return localStorage.getItem('wordle.username');
  },

  getUserid() {
    return localStorage.getItem('wordle.userid');
  },

  isLogged() {
    return !!localStorage.getItem('wordle.username');
  },

  login(Player) {
    localStorage.removeItem('wordle.username');
    localStorage.removeItem('wordle.userid');

    localStorage.setItem('wordle.username', Player.data().Name);//JSON.stringify(currentData)
    localStorage.setItem('wordle.userid', Player.id);//JSON.stringify(currentData)

    return true;
  },
  /*
  login(username) {
    localStorage.removeItem('wordle.username');
    localStorage.setItem('wordle.username', username);//JSON.stringify(currentData)
    return true;
  },
*/
  logout() {
    localStorage.removeItem('wordle.username');
    localStorage.removeItem('wordle.userid');
    return true;
  }
}
