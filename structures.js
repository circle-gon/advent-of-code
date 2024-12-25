// Taken from https://github.com/datastructures-js/heap with some modifications
export class Heap {
  constructor(compare) {
    if (typeof compare !== "function") {
      throw new Error("Heap constructor expects a compare function");
    }
    this._compare = compare;
    this._nodes = [];
    this._leaf = null;
  }

  _hasLeftChild(parentIndex) {
    const leftChildIndex = parentIndex * 2 + 1;
    return leftChildIndex < this.size();
  }

  _hasRightChild(parentIndex) {
    const rightChildIndex = parentIndex * 2 + 2;
    return rightChildIndex < this.size();
  }

  _compareAt(i, j) {
    return this._compare(this._nodes[i], this._nodes[j]);
  }

  _swap(i, j) {
    const temp = this._nodes[i];
    this._nodes[i] = this._nodes[j];
    this._nodes[j] = temp;
  }

  _shouldSwap(parentIndex, childIndex) {
    if (parentIndex < 0 || parentIndex >= this.size()) {
      return false;
    }

    if (childIndex < 0 || childIndex >= this.size()) {
      return false;
    }

    return this._compareAt(parentIndex, childIndex) > 0;
  }

  _compareChildrenOf(parentIndex) {
    if (!this._hasLeftChild(parentIndex) && !this._hasRightChild(parentIndex)) {
      return -1;
    }

    const leftChildIndex = parentIndex * 2 + 1;
    const rightChildIndex = parentIndex * 2 + 2;

    if (!this._hasLeftChild(parentIndex)) {
      return rightChildIndex;
    }

    if (!this._hasRightChild(parentIndex)) {
      return leftChildIndex;
    }

    const compare = this._compareAt(leftChildIndex, rightChildIndex);
    return compare > 0 ? rightChildIndex : leftChildIndex;
  }

  _compareChildrenBefore(index, leftChildIndex, rightChildIndex) {
    const compare = this._compareAt(rightChildIndex, leftChildIndex);

    if (compare <= 0 && rightChildIndex < index) {
      return rightChildIndex;
    }

    return leftChildIndex;
  }

  _heapifyUp(startIndex) {
    let childIndex = startIndex;
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while (this._shouldSwap(parentIndex, childIndex)) {
      this._swap(parentIndex, childIndex);
      childIndex = parentIndex;
      parentIndex = Math.floor((childIndex - 1) / 2);
    }
  }

  _heapifyDown(startIndex) {
    let parentIndex = startIndex;
    let childIndex = this._compareChildrenOf(parentIndex);

    while (this._shouldSwap(parentIndex, childIndex)) {
      this._swap(parentIndex, childIndex);
      parentIndex = childIndex;
      childIndex = this._compareChildrenOf(parentIndex);
    }
  }

  _heapifyDownUntil(index) {
    let parentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;
    let childIndex;

    while (leftChildIndex < index) {
      childIndex = this._compareChildrenBefore(
        index,
        leftChildIndex,
        rightChildIndex
      );

      if (this._shouldSwap(parentIndex, childIndex)) {
        this._swap(parentIndex, childIndex);
      }

      parentIndex = childIndex;
      leftChildIndex = parentIndex * 2 + 1;
      rightChildIndex = parentIndex * 2 + 2;
    }
  }

  push(value) {
    this._nodes.push(value);
    this._heapifyUp(this.size() - 1);
    if (this._leaf === null || this._compare(value, this._leaf) > 0) {
      this._leaf = value;
    }
    return this;
  }

  pop() {
    const root = this.top();
    this._nodes[0] = this._nodes[this.size() - 1];
    this._nodes.pop();
    this._heapifyDown(0);

    if (root === this._leaf) {
      this._leaf = null;
    }

    return root;
  }

  top() {
    if (this.isEmpty()) throw new Error("Heap is empty");
    return this._nodes[0];
  }

  leaf() {
    return this._leaf;
  }

  size() {
    return this._nodes.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this._nodes = [];
    this._leaf = null;
  }
}

// Taken from https://github.com/MikBin/fastqueuejs with some modifications
export class Queue {
  constructor(sizeLimit = 1024) {
    this._limit = ~~sizeLimit;
    this._queue = [];
    this._first = 0;
  }

  push(value) {
    this._queue.push(value);
    return this;
  }

  pop() {
    if (this.isEmpty()) throw new Error("Queue is empty");
    let out = this._queue[this._first];
    this._first++;
    if (this._first === this._limit) {
      this.removeDequeued();
    }
    return out;
  }

  removeDequeued() {
    let l = this._queue.length,
      i = this._first,
      queue = this._queue;
    while (i > 0) {
      l--;
      i--;
      queue[i] = queue[l];
    }

    queue.length = queue.length - this._first;
    this._first = 0;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek(n = 1) {
    if (n === 1) {
      return this._queue[this._first];
    } else {
      let max = this._first + n;
      if (max >= this._queue.length) {
        throw new Error("Not enough items to peek");
      }

      return this._queue.slice(this._first, this._first + n);
    }
  }

  last(n = 1) {
    if (n === 1) {
      return this._queue[this._queue.length - 1];
    } else {
      if (n < this.size()) {
        return this._queue.slice(this._queue.length - n).reverse();
      }
      throw new Error("Not enough items to peek last");
    }
  }

  size() {
    return this._queue.length - this._first;
  }
}
