type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

export default class LRU<K, V> {
  public length: number;
  private head?: Node<V>;
  private tail?: Node<V>;

  private lookup: Map<K, Node<V>>;
  private reverseLookup: Map<Node<V>, K>;

  constructor(private capacity: number) {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;

    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }

  update(key: K, value: V): void {
    let node = this.lookup.get(key);

    if (!node) {
      node = { value: value } as Node<V>;
      this.length++;
      this.prependNode(node);
      this.trimCache();

      this.lookup.set(key, node);
      this.reverseLookup.set(node, key);
    } else {
      this.detachNode(node);
      this.prependNode(node);
      node.value = value;
    }
  }
  get(key: K): V | undefined {
    const node = this.lookup.get(key);

    if (!node) {
      return undefined;
    }

    this.detachNode(node);
    this.prependNode(node);

    return node.value;
  }

  private detachNode(node: Node<V>): void {
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (node === this.head) {
      this.head = this.head.next;
    }
    if (node === this.tail) {
      this.tail = this.tail.prev;
    }

    node.prev = node.next = undefined;
  }
  private prependNode(node: Node<V>): void {
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }
  private trimCache(): void {
    if (this.length <= this.capacity) {
      return;
    }

    const tail = this.tail as Node<V>;
    this.detachNode(tail);

    const key = this.reverseLookup.get(tail) as K;
    this.reverseLookup.delete(tail);
    this.lookup.delete(key);
    this.length--;
  }
}
