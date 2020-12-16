class AStarMinHeap {
  constructor(...values) {
    this.heap = [];
    for (let value of values) {
      this.push(value);
    }
  }

  length() {
    return this.heap.length;
  }

  // push a node into the min heap
  push(node) {
    if (typeof node.fScore != "number") throw "node.fScore should be a number";
    if (node.coords == undefined) throw "node.coords should be defined";

    this.heap.push(node);
    let index = this.heap.length - 1;
    let parentIndex = ((index - 1) / 2) >> 0;

    // while the parent node has a bigger fScore, swap it with the child node
    while (
      this.heap[parentIndex].fScore > this.heap[index].fScore &&
      index != 0
    ) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = ((parentIndex - 1) / 2) >> 0;
    }
  }

  // pop the root node, which is the node with the smallest fScore
  popMin() {
    if (this.heap.length == 1) return this.heap.pop();

    const element = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.upHeap(0);
    return element;
  }

  // includes checks if the coords is already in the min heap
  includes(coords) {
    for (let i in this.heap) {
      const [x, y] = this.heap[i].coords;
      if (x == coords[0] && y == coords[1]) return true;
    }
  }

  // private function, makes sure the min heap is valid after popMin
  upHeap(index) {
    const child1 = this.heap[index * 2 + 1];
    const child2 = this.heap[index * 2 + 2];

    if (child1 == undefined && child2 == undefined) return;

    let smallestChildIndex = index * 2;
    if (!child1) smallestChildIndex += 2;
    else if (!child2) smallestChildIndex += 1;
    else smallestChildIndex += child1.fScore < child2.fScore ? 1 : 2;

    if (this.heap[index].fScore > this.heap[smallestChildIndex].fScore) {
      this.swap(index, smallestChildIndex);
      this.upHeap(smallestChildIndex);
    }
  }

  // private function, swap two nodes in the min heap
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }
}

export default AStarMinHeap;
// module.exports = AStarMinHeap;
