import { BOARD_SIZE } from './constants'

import Cell from './Cell'

class Grid {
  constructor() {
    this.rows = this._buildRows(BOARD_SIZE);
    this.el = this._buildEl()
  }

  _buildEl() {
    const el = document.createElement('div')
  }

  _buildRows(size) {
    const rows = [];

    for (let i = 0; i < size; i++) {
      const row = [];

      for (let j = 0; j < size; j++) {
        row.push(Cell.random());
      }

      rows.push(row);
    }

    return rows;
  }

  _getCell(pos) {
    return this.rows[pos.row][pos.col];
  }

  _setCell(pos, cell) {
    this.rows[pos.row][pos.col] = cell;
  }

  swapCells(posOne, posTwo) {
    const cellOne = this._getCell(posOne);
    this._setCell(posOne, this._getCell(posTwo));
    this._setCell(posTwo, cellOne);
  }

  getEl() {
    const gridEl = document.createElement('div');
    gridEl.classList.add('grid');

    this.rows.forEach(row => {
      const rowEl = document.createElement('div');
      rowEl.classList.add('row');

      row.forEach(cell => {
        rowEl.appendChild(cell.getEl());
      })

      gridEl.appendChild(rowEl);
    })

    return gridEl;
  }
}

export default Grid;