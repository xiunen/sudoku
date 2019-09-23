const chalk = require("chalk");
const { getIntersection, randomSort } = require("../utils");

const getBlock = (row, col, blockWidth = 3) => {
  return (
    Math.floor(row / blockWidth) * blockWidth + Math.floor(col / blockWidth)
  );
};

class Matrix {
  constructor(length = 9, optionValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    this.data = Array.from({ length }).map(() =>
      Array.from({ length }).fill(0)
    );
    this.height = length;
    this.optionValues = optionValues;
    this.initEmptyCells();
  }

  initEmptyCells() {
    this.emptyCells = this.data.reduce((result, row, rowIdx) => {
      row.forEach((col, colIdx) => {
        result.push({
          col: colIdx,
          row: rowIdx,
          block: getBlock(rowIdx, colIdx)
        });
      });
      return result;
    }, []);
  }

  removeEmptyCell(row, col) {
    this.emptyCells = this.emptyCells.filter(
      item => !(item.col === col && item.row === row)
    );
  }

  addEmptyCell(row, col) {
    this.emptyCells.push({ row, col, block: getBlock(row, col) });
  }

  getEmptyCells() {
    return this.emptyCells;
  }

  //行可用值
  getRowAvailableValues(row) {
    const rowValues = this.data[row];
    return this.optionValues.filter(item => !rowValues.includes(item));
  }
  //列可用值
  getColAvailableValues(col) {
    const colValues = Array.from({
      length: this.height
    }).map((item, row) => {
      return this.data[row][col];
    });
    return this.optionValues.filter(item => !colValues.includes(item));
  }

  //小区内可用值
  getBlockAvailableValues(row, col) {
    let block = row;

    if (typeof col !== "undefined") {
      block = getBlock(row, col);
    }

    const blockValues = [];
    this.data.forEach((rowItem, rowIdx) =>
      rowItem.forEach((colItem, colIdx) => {
        const _block = getBlock(rowIdx, colIdx);
        if (_block === block) {
          blockValues.push(this.data[rowIdx][colIdx]);
        }
      })
    );
    return this.optionValues.filter(item => !blockValues.includes(item));
  }

  getCellAvailableValues(row, col) {
    const colValues = this.getColAvailableValues(col);
    const rowValues = this.getRowAvailableValues(row);
    const blockValues = this.getBlockAvailableValues(row, col);

    return getIntersection(rowValues, colValues, blockValues);
  }

  getValue(row, col) {
    return this.data[row][col];
  }

  setValue(row, col, value) {
    this.data[row][col] = value;
    this.removeEmptyCell(row, col);
  }

  resetValue(row, col) {
    this.data[row][col] = 0;
    this.addEmptyCell(row, col);
  }

  print() {
    console.log(
      this.data
        .map(item =>
          item.map(col => (col ? chalk.red(col) : chalk.gray(col))).join(", ")
        )
        .join("\n")
    );
  }
}

module.exports = Matrix;
