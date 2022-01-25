import buffering from '../assets/images/loading-buffering.gif';
import trophy from '../assets/images/kingtrophy.png';

class Board {
  constructor(user, score) {
    this.user = user;
    this.score = score;
  }

  static list = document.querySelector('.scores-list');

  static chanpions = document.querySelector('.chanpions');

  static gameId = 'OZYlwJrXWWJsuQlloQ1X';

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
        document.querySelector('.score-form').style.display = 'none';
        document.querySelector('.loader-button').remove();
        this.load();
      }
    }
    return true;
  }

  static load = async () => {
    let scores = '';
    let rank = 1;
    this.list.innerHTML = '';
    this.chanpions.innerHTML = '';
    this.list.append(this.returnCustomLoader('loader'));
    if (navigator.onLine) {
      const request = await fetch(`${this.baseUrl}/${this.gameId}/scores`, { method: 'GET' });
      const { result } = await request.json();
      if (result.length) {
        result.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)).forEach((score) => {
          if (rank > 3) {
            scores += `<li><span class="rank">${rank}</span> <span>${score.user}</span> <span>${score.score}</span></li>`;
          } else {
            const names = score.user.split(' ');
            let initials = '';
            names.forEach((chunk) => {
              initials += `${chunk.split('')[0]}`;
            });
            const reward = new Image();
            reward.classList.add('tiara');
            reward.src = trophy;
            this.chanpions.innerHTML += `
              <div class="element champion-${rank}">
                <div class="rank display-winners-${rank}">${rank}</div>
                <div class="btn initials">${initials.toUpperCase()}</div>
                <div class="scores">${score.score}</div>
                <div class="names">${score.user}</div>
              </div>
            `;
            const champ = document.querySelector('.display-winners-1');
            champ.innerHTML = '';
            champ.append(reward);
          }
          rank += 1;
        });
        this.list.innerHTML = scores;
      } else {
        this.list.innerHTML = `
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