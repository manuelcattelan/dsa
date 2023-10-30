type GraphEdge = {
  to: number;
  weight: number;
};

function traverseGraph(
  graph: GraphEdge[][],
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

  for (let i = 0; i < graph[current].length; ++i) {
    const edge = graph[current][i];
    if (traverseGraph(graph, edge.to, needle, seen, path)) {
      return true;
    }
  }

  path.pop();
  return false;
}

export default function DFSAdjacencyListGraph(
  graph: GraphEdge[][],
  source: number,
  needle: number,
): number[] {
  const path: number[] = [];
  const seen: boolean[] = new Array(graph.length).fill(false);

  traverseGraph(graph, source, needle, seen, path);

  return path;
}
