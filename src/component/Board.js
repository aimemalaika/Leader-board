import buffering from '../assets/images/loading-buffering.gif';

class Board {
  constructor(user, score) {
    this.user = user;
    this.score = score;
  }

  static list = document.querySelector('.scores-list');

  static gameId = 'SX8xrcRek3NXTGVgvB61';

  static baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';

  static add = async (scoreData) => {
    document.querySelector('.submit-form').prepend(this.returnCustomLoader('loader-button'));
    if (scoreData.user !== '' && scoreData.score !== '') {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(scoreData),
      };
      const request = await fetch(`${this.baseUrl}/${this.gameId}/scores`, requestOptions);
      if (request.status === 201) {
        this.load();
      }
    }
    return document.querySelector('.loader-button').remove();
  }

  static load = async () => {
    let scores = '';
    this.list.innerHTML = '';
    this.list.append(this.returnCustomLoader('loader'));
    if (navigator.onLine) {
      const request = await fetch(`${this.baseUrl}/${this.gameId}/scores`, { method: 'GET' });
      const { result } = await request.json();
      if (result.length) {
        result.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)).forEach((score) => {
          scores += `<li><span>${score.user}</span> <span>${score.score}</span></li>`;
        });
        this.list.innerHTML = scores;
      } else {
        this.list.innerHTML += `
          <li class="no-data-found">No Result found</li>
        `;
      }
    }
  }

  static returnCustomLoader = (className) => {
    const loader = new Image();
    loader.src = buffering;
    loader.classList.add(className);
    return loader;
  };
}
export default Board;