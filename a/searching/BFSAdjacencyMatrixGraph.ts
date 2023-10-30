export default function BFSAdjacencyMatrixGraph(
  graph: number[][],
  source: number,
  needle: number,
): number[] {
  const prev: number[] = new Array(graph.length).fill(-1);
  const seen: boolean[] = new Array(graph.length).fill(false);

  const q: number[] = [source];
  seen[source] = true;

  do {
    const currentVertex = q.shift() as number;
    if (currentVertex === needle) {
      break;
    }

    const adjacentVertexes = graph[currentVertex];
    for (let to = 0; to < adjacentVertexes.length; ++to) {
      const weight = adjacentVertexes[to];
      if (weight === 0) {
        continue;
      }
      if (seen[to]) {
        continue;
      }

      seen[to] = true;
      prev[to] = currentVertex;
      q.push(to);
    }
  } while (q.length);

  const path: number[] = [];
  if (prev[needle] === -1) {
    return path;
  }

  let currentVertex = needle;
  while (prev[currentVertex] !== -1) {
    path.push(currentVertex);
    currentVertex = prev[currentVertex];
  }

  return [source].concat(path.reverse());
}
