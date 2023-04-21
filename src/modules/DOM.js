let isPlayerMove = true;

function updateHTMLBoard(gameboard, HTMLBoard) {
  gameboard.getGameboardArray().forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell.isSunk?.())
        HTMLBoard.querySelector(
          `[data-row="${rowIndex}"][data-column="${cellIndex}"]`
        ).classList.add("dead");
    });
  });
}

function fillGameboard(HTMLboard, enemy, board) {
  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 10; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.column = j;

      cell.addEventListener("dragstart", (event) => {
        event.preventDefault();
      });

      cell.addEventListener("click", () => {
        if (
          cell.classList.contains("hit") ||
          cell.classList.contains("miss") ||
          board.isAllSunk()
        )
          return;
        const isPlayer = HTMLboard.id === "player";
        if (isPlayer === isPlayerMove) return;
        const isMiss = enemy.makeMove([cell.dataset.row, cell.dataset.column]);
        if (isMiss) cell.classList.add("miss");
        else cell.classList.add("hit");
        updateHTMLBoard(board, HTMLboard);
        isPlayerMove = !isPlayerMove;
      });
      row.appendChild(cell);
    }
    HTMLboard.appendChild(row);
  }
}

function populateBoardWithShips(board, HTMLBoard) {
  const gameboardArray = board.getGameboardArray();

  gameboardArray.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const HTMLCell = HTMLBoard.querySelector(
        `[data-row="${rowIndex}"][data-column="${cellIndex}"]`
      );

      if (cell !== 0) HTMLCell.classList.add("ship");
    });
  });
}

export default function fillPlayersGameboard(
  playerGameboard,
  enemyGameboard,
  player,
  enemy
) {
  const playerBoard = document.querySelector(".board#player");
  const enemyBoard = document.querySelector(".board#enemy");

  fillGameboard(playerBoard, enemy, playerGameboard);
  fillGameboard(enemyBoard, player, enemyGameboard);

  populateBoardWithShips(playerGameboard, playerBoard);
  populateBoardWithShips(enemyGameboard, enemyBoard);
}
