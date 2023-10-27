export default function twoCrystalBalls(building: boolean[]): number {
  const jumpAmount = Math.floor(Math.sqrt(building.length));

  let floor = jumpAmount;
  for (; floor < building.length; floor += jumpAmount) {
    if (building[floor]) {
      break;
    }
  }

  floor -= jumpAmount;
  for (; floor < floor + jumpAmount && floor < building.length; ++floor) {
    if (building[floor]) {
      return floor;
    }
  }

  return -1;
}
