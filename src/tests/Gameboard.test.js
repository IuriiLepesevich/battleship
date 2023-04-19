import Gameboard from "../modules/Gameboard";
import Ship from "../modules/Ship";

it("Gameboard() creates object", () => {
  const gameboard = Gameboard();
  expect(
    typeof gameboard === "object" &&
      !Array.isArray(gameboard) &&
      gameboard !== null
  ).toBeTruthy();
});

it("Gameboard() has an array of a board (10x10)", () => {
  const gameboard = Gameboard();
  const gameboardArray = gameboard.getGameboardArray();
  const isValidArray =
    gameboardArray.every((row) => row.length === 10) &&
    gameboardArray.length === 10;
  expect(isValidArray).toBeTruthy();
});

it("receiveAttack() return coordinates if shot was missed", () => {
  const gameboard = Gameboard();
  const ship = Ship(3);
  gameboard.placeShip([0, 0], 1, ship);
  expect(gameboard.receiveAttack([5, 5])).toStrictEqual([5, 5]);
});

it("receiveAttack() return false if shot was in the target", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([0, 0], 1, 3);
  expect(gameboard.receiveAttack([0, 0])).toBeFalsy();
});

it("receiveAttack() increases number of hits if shot was in the target", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([0, 0], 1, 3);
  const ship = gameboard.getGameboardArray()[0][0];
  gameboard.receiveAttack([2, 0]);
  expect(ship.getHits()).toBe(1);
});

it("getMissedAttacks() returns an array of missed attacks", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([0, 0], 1, 3);
  gameboard.receiveAttack([6, 2]);
  gameboard.receiveAttack([5, 1]);
  gameboard.receiveAttack([2, 0]);
  expect(gameboard.getMissedAttack()).toStrictEqual([
    [6, 2],
    [5, 1],
  ]);
});

it("isAllSunk() returns false if any of the ships are not sunk", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([0, 0], 2, 3);
  gameboard.placeShip([5, 3], 1, 1);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);
  expect(gameboard.isAllSunk()).toBeFalsy();
});

it("isAllSunk() returns true if all of the ships are sunk", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([0, 0], 2, 3);
  gameboard.placeShip([5, 3], 1, 1);
  gameboard.receiveAttack([0, 0]);
  gameboard.receiveAttack([0, 1]);
  gameboard.receiveAttack([0, 2]);
  gameboard.receiveAttack([5, 3]);
  expect(gameboard.isAllSunk()).toBeTruthy();
});
