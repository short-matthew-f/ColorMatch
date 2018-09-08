import { CELL_TYPES } from './constants'

class Cell {
  constructor(value) {
    this.value = value;
  }

  static random() {
    return new Cell(
      CELL_TYPES[Math.floor(CELL_TYPES.length * Math.random())]
    )
  }

  getEl() { 
    const el = document.createElement('div');
    el.classList.add('cell');
    el.style.backgroundColor = this.value;
    return el;
  }
}

export default Cell;