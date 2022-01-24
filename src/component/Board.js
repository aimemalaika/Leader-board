class Board {
  constructor(user, score) {
    this.user = user;
    this.score = score;
  }

  static list = document.querySelector('.scores-list');

  static db = (scoreObj) => {
    if (scoreObj) {
      window.localStorage.setItem('scores', JSON.stringify(scoreObj));
      return true;
    }
    const datas = ((window.localStorage.getItem('scores') !== null) ? JSON.parse(window.localStorage.getItem('scores')) : []);
    return datas.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
  }

  static add = (scoreData) => {
    if (scoreData.user !== '') {
      if (this.db().length === 0) {
        document.querySelector('.no-data-found').remove();
      }
      const store = Board.db();
      store.push(scoreData);
      this.db(store);
      this.load();
    }
  }

  static load = () => {
    this.list.innerHTML = '';
    if (this.db().length) {
      this.db().forEach((result) => {
        this.append(result);
      });
    } else {
      this.list.innerHTML += `
        <li class="no-data-found">No Result found</li>
      `;
    }
  }

  static append = (result) => {
    this.list.innerHTML += `
      <li><span>${result.user}</span> <span>${result.score}</span></li>
    `;
  }
}
export default Board;