function traverseGraph(
  graph: number[][],
  current: number,
  needle: number,
  seen: boolean[],
  path: number[],
): boolean {
  if (seen[current]) {
    return false;
  }
  if (current === needle) {
    path.push(current);
    return true;
  }
  seen[current] = true;
  path.push(current);

  for (let to = 0; to < graph[current].length; ++to) {
    const weight = graph[current][to];
    if (weight !== 0) {
      if (traverseGraph(graph, to, needle, seen, path)) {
        return true;
      }
    }
  }

  path.pop();
  return false;
}

export default function DFSAdjacencyMatrixGraph(
  graph: number[][],
  source: number,
  needle: number,
): number[] {
  const path: number[] = [];
  const seen: boolean[] = new Array(graph.length).fill(false);

  traverseGraph(graph, source, needle, seen, path);

  return path;
}
