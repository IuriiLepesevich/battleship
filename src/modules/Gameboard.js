import Ship from "./Ship";

function generateBoardArray() {
  return Array(10)
    .fill()
    .map(() => Array(10).fill(0));
}

function checkIfCoordinatesOutsideTheArray(newRow, newCol) {
  return newRow >= 0 && newRow <= 9 && newCol >= 0 && newCol <= 9;
}

function checkAreaAroundShip(
  coordinate,
  placementType,
  shipLength,
  boardArray
) {
  const coordRow = coordinate[0];
  const coordCol = coordinate[1];

  if (placementType === 1) {
    for (let i = -1; i < 2; i += 1) {
      if (checkIfCoordinatesOutsideTheArray(coordRow - 1, coordCol + i)) {
        const checkingCellBefore = boardArray[coordRow - 1][coordCol + i];
        if (checkingCellBefore !== 0) return false;
      }

      if (
        checkIfCoordinatesOutsideTheArray(coordRow + shipLength, coordCol + i)
      ) {
        const checkingCellAfter =
          boardArray[coordRow + shipLength][coordCol + i];
        if (checkingCellAfter !== 0) return false;
      }
    }
    for (let i = 0; i < shipLength; i += 1) {
      if (checkIfCoordinatesOutsideTheArray(coordRow + i, coordCol - 1)) {
        if (boardArray[coordRow + i][coordCol - 1] !== 0) return false;
      }
      if (checkIfCoordinatesOutsideTheArray(coordRow + i, coordCol + 1)) {
        if (boardArray[coordRow + i][coordCol + 1] !== 0) return false;
      }
    }
  } else if (placementType === 2) {
    for (let i = -1; i < 2; i += 1) {
      if (checkIfCoordinatesOutsideTheArray(coordRow + i, coordCol - 1)) {
        const checkingCellBefore = boardArray[coordRow + i][coordCol - 1];
        if (checkingCellBefore !== 0) return false;
      }

      if (
        checkIfCoordinatesOutsideTheArray(coordRow + i, coordCol + shipLength)
      ) {
        const checkingCellAfter =
          boardArray[coordRow + i][coordCol + shipLength];
        if (checkingCellAfter !== 0) return false;
      }
    }
    for (let i = 0; i < shipLength; i += 1) {
      if (checkIfCoordinatesOutsideTheArray(coordRow - 1, coordCol + i)) {
        if (boardArray[coordRow - 1][coordCol + i] !== 0) return false;
      }
      if (checkIfCoordinatesOutsideTheArray(coordRow + 1, coordCol + i)) {
        if (boardArray[coordRow + 1][coordCol + i] !== 0) return false;
      }
    }
  }

  return true;
}

function checkShipArea(coordinate, placementType, shipLength, boardArray) {
  const coordRow = coordinate[0];
  const coordCol = coordinate[1];

  for (let i = 0; i < shipLength; i += 1) {
    if (placementType === 1) {
      if (coordRow + shipLength > 10) return false;
      if (boardArray[coordRow + i][coordCol] !== 0) return false;
    } else if (placementType === 2) {
      if (coordCol + shipLength > 10) return false;
      if (boardArray[coordRow][coordCol + i] !== 0) return false;
    }
  }

  return true;
}

function checkIfBoardHasSpaceForTheShip(shipLength, placementType, board) {
  for (let row = 0; row < 10; row += 1) {
    for (let col = 0; col < 10; col += 1) {
      if (
        checkShipArea([row, col], placementType, shipLength, board) &&
        checkAreaAroundShip([row, col], placementType, shipLength, board)
      )
        return true;
    }
  }
  return false;
}

function checkCoordinate(coordinate, placementType, shipLength, boardArray) {
  return (
    checkShipArea(coordinate, placementType, shipLength, boardArray) &&
    checkAreaAroundShip(coordinate, placementType, shipLength, boardArray)
  );
}

export default function Gameboard() {
  const missedAttacks = [];
  const gameboardArray = generateBoardArray();

  const getGameboardArray = () => gameboardArray;

  function placeShip(coordinate, placementType, shipLength) {
    if (!checkCoordinate(coordinate, placementType, shipLength, gameboardArray))
      return false;

    const coordRow = coordinate[0];
    const coordCol = coordinate[1];
    const ship = Ship(shipLength);

    for (let i = 0; i < shipLength; i += 1) {
      if (placementType === 1) {
        gameboardArray[coordRow + i][coordCol] = ship;
      } else if (placementType === 2) {
        gameboardArray[coordRow][coordCol + i] = ship;
      }
    }

    return true;
  }

  function fillBoardRandomly(array) {
    array.forEach((shipLength) => {
      // 1 - vertical; 2 - horizontal
      const placementType = Math.ceil(Math.random() * 2);

      let coordRow = Math.floor(Math.random() * 10);
      let coordCol = Math.floor(Math.random() * 10);

      while (
        !placeShip([coordRow, coordCol], placementType, shipLength) &&
        checkIfBoardHasSpaceForTheShip(
          shipLength,
          placementType,
          gameboardArray
        )
      ) {
        coordRow = Math.floor(Math.random() * 10);
        coordCol = Math.floor(Math.random() * 10);
      }
    });
  }

  function updateGameboardArray() {
    missedAttacks.forEach((missedCoordinate) => {
      gameboardArray[missedCoordinate[0]][missedCoordinate[1]] = -1;
    });
  }

  function receiveAttack(coordinates) {
    if (gameboardArray[coordinates[0]][coordinates[1]].hits?.()) {
      return false;
    }
    if(gameboardArray[coordinates[0]][coordinates[1]] === -1) return true
    missedAttacks.push(coordinates);
    updateGameboardArray();
    return coordinates;
  }

  const getMissedAttack = () => missedAttacks;

  function isAllSunk() {
    return gameboardArray.every((row) =>
      row.every((cell) => {
        if (typeof cell !== "number") {
          return !cell.isSunk() === false;
        }
        return true;
      })
    );
  }

  function printArray() {
    let arrayString = "";
    gameboardArray.forEach((row) => {
      let rowString = "";
      row.forEach((cell) => {
        if (typeof cell === "number") rowString = `${rowString} ${cell}`;
        else rowString = `${rowString} ${cell.getLength()}`;
      });
      arrayString = `${arrayString}${rowString}\n`;
    });
    console.log(arrayString);
  }

  return {
    getGameboardArray,
    fillBoardRandomly,
    placeShip,
    receiveAttack,
    getMissedAttack,
    isAllSunk,
    printArray,
  };
}
