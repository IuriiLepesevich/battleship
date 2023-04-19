import Ship from "../modules/Ship";

it("Ship() creates object", () => {
  const ship = Ship(3);
  expect(
    typeof ship === "object" && !Array.isArray(ship) && ship !== null
  ).toBeTruthy();
});

it("returns ship length", () => {
  const ship = Ship(3);
  expect(ship.getLength()).toBe(3);
});

it("returns number of hits", () => {
  const ship = Ship(3);
  expect(ship.getHits()).toBe(0);
});

it("increases number of hits", () => {
  const ship = Ship(3);
  ship.hits();
  expect(ship.getHits()).toBe(1);
});

it("returns false, if not hit", () => {
  const ship = Ship(3);
  expect(ship.isSunk()).toBeFalsy();
});

it("returns false, if not sunk", () => {
  const ship = Ship(3);
  ship.hits();
  expect(ship.isSunk()).toBeFalsy();
});

it("returns true, if sunk", () => {
  const ship = Ship(3);
  ship.hits();
  ship.hits();
  ship.hits();
  expect(ship.isSunk()).toBeTruthy();
});

it("hits() doesn't increase hit count if ship is sunk", () => {
  const ship = Ship(3);
  ship.hits();
  ship.hits();
  ship.hits();

  const shipCountBefore = ship.getHits();
  ship.hits();
  const shipCountAfter = ship.getHits();

  expect(shipCountBefore).toEqual(shipCountAfter);
});
