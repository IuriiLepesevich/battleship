import "./style/style.css";
import Gameboard from "./modules/Gameboard";
import Player from "./modules/Player";
import fillPlayersGameboard from "./modules/DOM";

const playerGameboard = Gameboard();
const computerGameboard = Gameboard();

playerGameboard.fillBoardRandomly([5, 4, 3, 3, 2, 2]);
computerGameboard.fillBoardRandomly([5, 4, 3, 3, 2, 2]);

const player = Player(playerGameboard, computerGameboard);
const computer = Player(computerGameboard, playerGameboard);

fillPlayersGameboard(playerGameboard, computerGameboard, player, computer);

