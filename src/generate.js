const Matrix = require("./models/matrix");
const { randomSort, getRandomValue } = require("./utils/index");

const tryCell = matrix => {
  const cells = matrix.getEmptyCells();
  if (!cells.length) return true;
  const availableValues = {};
  cells.forEach(({ row, col }) => {
    availableValues[`${row}-${col}`] = matrix.getCellAvailableValues(row, col);
  });
  cells.sort(
    (l, r) =>
      availableValues[`${l.row}-${l.col}`].length -
      availableValues[`${r.row}-${r.col}`].length
  );
  const cell = cells[0];
  const key = `${cell.row}-${cell.col}`;
  if (!(availableValues[key] && availableValues[key].length)) return false;
  const values = availableValues[key];
  const result = values.every(value => {
    matrix.setValue(cell.row, cell.col, value);
    if (tryCell(matrix)) return false;
    return true;
  });
  if (result) {
    matrix.resetValue(cell.row, cell.col);
  }
  return !result;
};

const generate = () => {
  const matrixWidth = 9;
  const optionValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const matrix = new Matrix(matrixWidth, optionValues);
  //左上角9格，中间9格，右下角9格
  [0, 4, 8].forEach(initialBlock => {
    const emptyCells = matrix
      .getEmptyCells()
      .filter(item => item.block === initialBlock);
    const values = randomSort([...optionValues]);
    emptyCells.forEach(({ row, col }, idx) => {
      matrix.setValue(row, col, values[idx]);
    });
  });

  //回溯尝试
  tryCell(matrix);

  console.log("-------- result --------");
  matrix.print();
};

module.exports = generate;
