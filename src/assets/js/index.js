import Board from '../../component/Board.js';
import '../css/index.css';

(() => {
  Board.load();
})();

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