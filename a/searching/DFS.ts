type Node<T> = {
  value: T;
  left: Node<T> | null;
  right: Node<T> | null;
};

function traverseTree(
  currentNode: Node<number> | null,
  needle: number,
): boolean {
  if (!currentNode) {
    return false;
  }
  if (currentNode.value === needle) {
    return true;
  }

  return (
    traverseTree(currentNode.left, needle) ||
    traverseTree(currentNode.right, needle)
  );
}

export default function DFS(head: Node<number>, needle: number): boolean {
  return traverseTree(head, needle);
}
