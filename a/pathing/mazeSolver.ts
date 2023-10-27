type Point = {
  x: number;
  y: number;
};

const directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

function walkMaze(
  maze: string[],
  wall: string,
  current: Point,
  end: Point,
  path: Point[],
  seen: boolean[][],
): boolean {
  if (current.x < 0 || current.x >= maze[0].length) {
    return false;
  }
  if (current.y < 0 || current.y >= maze.length) {
    return false;
  }
  if (maze[current.y][current.x] === wall) {
    return false;
  }
  if (seen[current.y][current.x]) {
    return false;
  }
  if (current.x === end.x && current.y === end.y) {
    path.push(current);
    return true;
  }

  seen[current.y][current.x] = true;
  path.push(current);

  for (let i = 0; i < directions.length; ++i) {
    const [newX, newY] = directions[i];
    const newPosition: Point = { x: current.x + newX, y: current.y + newY };
    if (walkMaze(maze, wall, newPosition, end, path, seen)) {
      return true;
    }
  }

  path.pop();
  return false;
}

export default function mazeSolver(
  maze: string[],
  wall: string,
  start: Point,
  end: Point,
): Point[] {
  const path: Point[] = [];
  const seen: boolean[][] = [];

  for (let i = 0; i < maze.length; ++i) {
    seen.push(new Array(maze[i].length).fill(false));
  }

  walkMaze(maze, wall, start, end, path, seen);

  return path;
}
