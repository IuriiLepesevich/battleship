import Gameboard from "./modules/Gameboard";

const gameboard = Gameboard();

gameboard.placeShip([0, 0], 2, 3);
gameboard.placeShip([5, 3], 1, 1);

gameboard.receiveAttack([0, 0]);
gameboard.receiveAttack([0, 1]);
gameboard.receiveAttack([0, 2]);
gameboard.receiveAttack([5, 3]);

gameboard.printArray();

console.log(gameboard.isAllSunk());
