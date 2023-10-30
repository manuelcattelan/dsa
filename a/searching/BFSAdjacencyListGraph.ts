type GraphEdge = {
  to: number;
  weight: number;
};

export default function BFSAdjacencyListGraph(
  graph: GraphEdge[][],
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
    for (let i = 0; i < adjacentVertexes.length; ++i) {
      const edge = adjacentVertexes[i];
      if (seen[edge.to]) {
        continue;
      }

      seen[edge.to] = true;
      prev[edge.to] = currentVertex;
      q.push(edge.to);
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
