type GraphEdge = {
  to: number;
  weight: number;
};

function hasUnvisited(seen: boolean[], dists: number[]): boolean {
  return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
  let lowestChild = -1;
  let currentLowestDistance = Infinity;

  for (let i = 0; i < seen.length; ++i) {
    if (seen[i]) {
      continue;
    }
    if (currentLowestDistance > dists[i]) {
      currentLowestDistance = dists[i];
      lowestChild = i;
    }
  }

  return lowestChild;
}

export default function dijkstraShortestPath(
  graph: GraphEdge[][],
  source: number,
  needle: number,
): number[] {
  const prev: number[] = new Array(graph.length).fill(-1);
  const seen: boolean[] = new Array(graph.length).fill(false);
  const dists: number[] = new Array(graph.length).fill(Infinity);

  dists[source] = 0;

  while (hasUnvisited(seen, dists)) {
    const lowestUnvisited = getLowestUnvisited(seen, dists);
    seen[lowestUnvisited] = true;

    for (let i = 0; i < graph[lowestUnvisited].length; ++i) {
      const edge = graph[lowestUnvisited][i];
      if (seen[edge.to]) {
        continue;
      }

      const currentDistance = dists[lowestUnvisited] + edge.weight;
      if (dists[edge.to] > currentDistance) {
        dists[edge.to] = currentDistance;
        prev[edge.to] = lowestUnvisited;
      }
    }
  }

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
