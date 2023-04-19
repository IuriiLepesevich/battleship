export default function Ship(length) {
  const shipLength = length;
  let hitCounter = 0;

  const getLength = () => shipLength;

  const getHits = () => hitCounter;

  const isSunk = () => shipLength <= hitCounter;

  const hits = () => {
    if (isSunk()) return;
    hitCounter += 1;
    return true;
  };

  return {
    getLength,
    getHits,
    hits,
    isSunk,
  };
}
