export default function Player(board, enemy) {
  const gameboard = board;
  const enemyGameboard = enemy;

  function makeMove(coordinates) {
    return enemyGameboard.receiveAttack(coordinates);
  }

  function makeRandomMove() {
    let coordRow = Math.floor(Math.random() * 10);
    let coordCol = Math.floor(Math.random() * 10);
    while (enemyGameboard.receiveAttack([coordRow, coordCol]) !== true) {
      coordRow = Math.floor(Math.random() * 10);
      coordCol = Math.floor(Math.random() * 10);
    }
  }

  const getEnemyBoard = () => enemyGameboard;

  return { makeMove, getEnemyBoard, makeRandomMove };
}
