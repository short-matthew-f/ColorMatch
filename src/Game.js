import Grid from './Grid';
import { once } from './utils';

class Game {
  constructor(gameEl) {
    this.gameEl = gameEl;
    this.initialCell = null;
    this.grid = new Grid();

    this.isAnimating = false;

    this._render();
    this._setListeners();

    this.swapAfterTransitionend = this.swapAfterTransitionend.bind(this)
  }

  swapAfterTransitionend(initialPos, targetPos, evt) {
    console.log("TRANSITIONENDSWAP TRIGGERING")
    
  }

  _swapEls(cellOne, cellTwo) {
    const cellOneRect = cellOne.getBoundingClientRect();
    const cellTwoRect = cellTwo.getBoundingClientRect();

    cellTwo.style.top = cellOneRect.top - cellTwoRect.top;
    cellTwo.style.left = cellOneRect.left - cellTwoRect.left;
    cellOne.style.top = cellTwoRect.top - cellOneRect.top;
    cellOne.style.left = cellTwoRect.left - cellOneRect.left;
  }

  _swapCells(cellOne, cellTwo) {
    const posOne = this.getPosition(cellOne);
    const posTwo = this.getPosition(cellTwo);

    const cellOneClone = cellOne.cloneNode();
    const cellTwoClone = cellTwo.cloneNode();

    cellOneClone.style.top = 0;
    cellOneClone.style.left = 0;
    cellTwoClone.style.top = 0;
    cellTwoClone.style.left = 0;

    cellOne.addEventListener('transitionend', once(() => {
      this.isAnimating = false;
      cellOne.replaceWith(cellTwoClone);
      cellTwo.replaceWith(cellOneClone);
      this.grid.swapCells(posOne, posTwo);
      // this._render();
    }));
  }

  _setListeners() {
    this.gameEl.addEventListener('mousedown', (evt) => {
      if (this.isAnimating || !evt.target.matches('.cell')) { return; }

      if (this.initialCell && this.initialCell == evt.target) {
        this.initialCell.classList.remove('selected');
        this.initialCell = null;
        return;
      }

      if (this.initialCell) {
        const initialCell = this.initialCell;
        const targetCell = evt.target;

        this.isAnimating = true;
        
        this.initialCell.classList.remove('selected');
        this.initialCell = null;

        this._swapEls(initialCell, targetCell);
        this._swapCells(initialCell, targetCell);
      } else {
        this.initialCell = evt.target;
        this.initialCell.classList.add('selected')
      }
    })
  }

  getPosition(cell) {
    if (!cell.matches('.cell')) { return; }

    const col = [...cell.parentNode.children].indexOf(cell);
    const row = [...this.gridEl.children].indexOf(cell.parentNode);

    return { row, col };
  }

  _render() {
    while (this.gameEl.firstChild) {
      this.gameEl.firstChild.remove();
    }
    
    this.gridEl = this.grid.getEl();
    this.gameEl.appendChild(this.gridEl);
  }
}

export default Game;