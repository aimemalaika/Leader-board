import Board from '../../component/Board.js';
import '../css/index.css';
import logo from '../images/logo.png';

(() => {
  const image = new Image();
  image.src = logo;
  document.querySelector('.logo').prepend(image);
  Board.load();
})();

document.querySelector('#score').addEventListener('keypress', (evt) => {
  const theEvent = evt || window.event;
  let key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  const regex = /[0-9]|\./;
  if (!regex.test(key)) {
    theEvent.preventDefault();
  }
});

document.querySelector('#submit-data').addEventListener('submit', (e) => {
  e.preventDefault();
  const score = new Board(document.querySelector('#fullname').value, document.querySelector('#score').value);
  Board.add(score);
  document.querySelector('#fullname').value = '';
  document.querySelector('#score').value = '';
});

document.querySelector('.refresh').addEventListener('click', () => {
  Board.load();
});

document.querySelector('.open-modal').addEventListener('click', () => {
  document.querySelector('.score-form').style.display = 'block';
});

document.querySelector('.close-modal').addEventListener('click', () => {
  document.querySelector('.score-form').style.display = 'none';
});