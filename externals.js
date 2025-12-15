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
    return leftChildIndex < this.length;
  }

  _hasRightChild(parentIndex) {
    const rightChildIndex = parentIndex * 2 + 2;
    return rightChildIndex < this.length;
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
    if (parentIndex < 0 || parentIndex >= this.length) {
      return false;
    }

    if (childIndex < 0 || childIndex >= this.length) {
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
        rightChildIndex,
      );

      if (this._shouldSwap(parentIndex, childIndex)) {
        this._swap(parentIndex, childIndex);
      }

      parentIndex = childIndex;
      leftChildIndex = parentIndex * 2 + 1;
      rightChildIndex = parentIndex * 2 + 2;
    }
  }

  findAll(func) {
    const result = [];
    for (const node of this._nodes) {
      if (func(node)) result.push(node);
    }
    if (func(this._leaf)) result.push(this._leaf);
    return result;
  }

  push(value) {
    this._nodes.push(value);
    this._heapifyUp(this.length - 1);
    if (this._leaf === null || this._compare(value, this._leaf) > 0) {
      this._leaf = value;
    }
    return this;
  }

  pop() {
    const root = this.top();
    this._nodes[0] = this._nodes[this.length - 1];
    this._nodes.pop();
    this._heapifyDown(0);

    if (root === this._leaf) {
      this._leaf = null;
    }

    return root;
  }

  heapify() {
    // fix node positions
    for (let i = Math.floor(this.length / 2) - 1; i >= 0; i--) {
      this._heapifyDown(i);
    }

    // fix leaf value
    for (let i = Math.floor(this.length / 2); i < this.length; i++) {
      const value = this._nodes[i];
      if (this._leaf === null || this._compare(value, this._leaf) > 0) {
        this._leaf = value;
      }
    }
  }

  top() {
    if (this.isEmpty()) throw new Error("Heap is empty");
    return this._nodes[0];
  }

  leaf() {
    return this._leaf;
  }

  get length() {
    return this._nodes.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  clear() {
    this._nodes = [];
    this._leaf = null;
  }
}

export class Queue {
  constructor() {
    this.in = [];
    this.out = [];
  }

  push(value) {
    this.in.push(value);
  }

  pop() {
    if (this.out.length === 0)
      while (this.in.length > 0) this.out.push(this.in.pop());
    return this.out.pop();
  }

  get length() {
    return this.in.length + this.out.length;
  }
}

export class LinkedListNode {
  constructor(value) {
    this.before = undefined;
    this.after = undefined;
    this.value = value;
  }

  static root(value) {
    const node = new this(value);
    node.before = node;
    node.after = node;
    return node;
  }

  ahead(amount) {
    let n = this;
    for (let i = 0; i < amount; i++) n = n.after;
    return n;
  }

  behind(amount) {
    let n = this;
    for (let i = 0; i < amount; i++) n = n.before;
    return n;
  }

  add(node) {
    node.before = this;
    node.after = this.after;
    this.after.before = node;
    this.after = node;
    return node;
  }

  remove() {
    this.before.after = this.after;
    this.after.before = this.before;
    // This is not strictly necessary but it is good to be safe
    this.before = undefined;
    this.after = undefined;
    return this;
  }
}

// From https://github.com/emn178/js-md5
export const md5 = (function () {
  "use strict";

  var ERROR = "input is invalid type";
  var HEX_CHARS = "0123456789abcdef".split("");
  var EXTRA = [128, 32768, 8388608, -2147483648];

  var buffer = new ArrayBuffer(68);
  var buffer8 = new Uint8Array(buffer);
  var blocks = new Uint32Array(buffer);

  function Md5() {
    blocks[0] =
      blocks[16] =
      blocks[1] =
      blocks[2] =
      blocks[3] =
      blocks[4] =
      blocks[5] =
      blocks[6] =
      blocks[7] =
      blocks[8] =
      blocks[9] =
      blocks[10] =
      blocks[11] =
      blocks[12] =
      blocks[13] =
      blocks[14] =
      blocks[15] =
        0;
    this.blocks = blocks;
    this.buffer8 = buffer8;
    this.h0 =
      this.h1 =
      this.h2 =
      this.h3 =
      this.start =
      this.bytes =
      this.hBytes =
        0;
    this.finalized = this.hashed = false;
    this.first = true;
  }

  Md5.prototype.update = function (message) {
    if (this.finalized) {
      return;
    }

    var notString,
      type = typeof message;
    if (type !== "string") {
      if (type === "object") {
        if (message === null) {
          throw ERROR;
        } else if (message.constructor === ArrayBuffer) {
          message = new Uint8Array(message);
        } else if (!Array.isArray(message)) {
          if (!ArrayBuffer.isView(message)) {
            throw ERROR;
          }
        }
      } else {
        throw ERROR;
      }
      notString = true;
    }
    var code,
      index = 0,
      i,
      length = message.length,
      blocks = this.blocks;
    var buffer8 = this.buffer8;

    while (index < length) {
      if (this.hashed) {
        this.hashed = false;
        blocks[0] = blocks[16];
        blocks[16] =
          blocks[1] =
          blocks[2] =
          blocks[3] =
          blocks[4] =
          blocks[5] =
          blocks[6] =
          blocks[7] =
          blocks[8] =
          blocks[9] =
          blocks[10] =
          blocks[11] =
          blocks[12] =
          blocks[13] =
          blocks[14] =
          blocks[15] =
            0;
      }

      if (notString) {
        for (i = this.start; index < length && i < 64; ++index) {
          buffer8[i++] = message[index];
        }
      } else {
        for (i = this.start; index < length && i < 64; ++index) {
          code = message.charCodeAt(index);
          if (code < 0x80) {
            buffer8[i++] = code;
          } else if (code < 0x800) {
            buffer8[i++] = 0xc0 | (code >> 6);
            buffer8[i++] = 0x80 | (code & 0x3f);
          } else if (code < 0xd800 || code >= 0xe000) {
            buffer8[i++] = 0xe0 | (code >> 12);
            buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
            buffer8[i++] = 0x80 | (code & 0x3f);
          } else {
            code =
              0x10000 +
              (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
            buffer8[i++] = 0xf0 | (code >> 18);
            buffer8[i++] = 0x80 | ((code >> 12) & 0x3f);
            buffer8[i++] = 0x80 | ((code >> 6) & 0x3f);
            buffer8[i++] = 0x80 | (code & 0x3f);
          }
        }
      }
      this.lastByteIndex = i;
      this.bytes += i - this.start;
      if (i >= 64) {
        this.start = i - 64;
        this.hash();
        this.hashed = true;
      } else {
        this.start = i;
      }
    }
    if (this.bytes > 4294967295) {
      this.hBytes += (this.bytes / 4294967296) << 0;
      this.bytes = this.bytes % 4294967296;
    }
    return this;
  };

  Md5.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    var blocks = this.blocks,
      i = this.lastByteIndex;
    blocks[i >> 2] |= EXTRA[i & 3];
    if (i >= 56) {
      if (!this.hashed) {
        this.hash();
      }
      blocks[0] = blocks[16];
      blocks[16] =
        blocks[1] =
        blocks[2] =
        blocks[3] =
        blocks[4] =
        blocks[5] =
        blocks[6] =
        blocks[7] =
        blocks[8] =
        blocks[9] =
        blocks[10] =
        blocks[11] =
        blocks[12] =
        blocks[13] =
        blocks[14] =
        blocks[15] =
          0;
    }
    blocks[14] = this.bytes << 3;
    blocks[15] = (this.hBytes << 3) | (this.bytes >>> 29);
    this.hash();
  };

  Md5.prototype.hash = function () {
    var a,
      b,
      c,
      d,
      bc,
      da,
      blocks = this.blocks;

    if (this.first) {
      a = blocks[0] - 680876937;
      a = (((a << 7) | (a >>> 25)) - 271733879) << 0;
      d = (-1732584194 ^ (a & 2004318071)) + blocks[1] - 117830708;
      d = (((d << 12) | (d >>> 20)) + a) << 0;
      c = (-271733879 ^ (d & (a ^ -271733879))) + blocks[2] - 1126478375;
      c = (((c << 17) | (c >>> 15)) + d) << 0;
      b = (a ^ (c & (d ^ a))) + blocks[3] - 1316259209;
      b = (((b << 22) | (b >>> 10)) + c) << 0;
    } else {
      a = this.h0;
      b = this.h1;
      c = this.h2;
      d = this.h3;
      a += (d ^ (b & (c ^ d))) + blocks[0] - 680876936;
      a = (((a << 7) | (a >>> 25)) + b) << 0;
      d += (c ^ (a & (b ^ c))) + blocks[1] - 389564586;
      d = (((d << 12) | (d >>> 20)) + a) << 0;
      c += (b ^ (d & (a ^ b))) + blocks[2] + 606105819;
      c = (((c << 17) | (c >>> 15)) + d) << 0;
      b += (a ^ (c & (d ^ a))) + blocks[3] - 1044525330;
      b = (((b << 22) | (b >>> 10)) + c) << 0;
    }

    a += (d ^ (b & (c ^ d))) + blocks[4] - 176418897;
    a = (((a << 7) | (a >>> 25)) + b) << 0;
    d += (c ^ (a & (b ^ c))) + blocks[5] + 1200080426;
    d = (((d << 12) | (d >>> 20)) + a) << 0;
    c += (b ^ (d & (a ^ b))) + blocks[6] - 1473231341;
    c = (((c << 17) | (c >>> 15)) + d) << 0;
    b += (a ^ (c & (d ^ a))) + blocks[7] - 45705983;
    b = (((b << 22) | (b >>> 10)) + c) << 0;
    a += (d ^ (b & (c ^ d))) + blocks[8] + 1770035416;
    a = (((a << 7) | (a >>> 25)) + b) << 0;
    d += (c ^ (a & (b ^ c))) + blocks[9] - 1958414417;
    d = (((d << 12) | (d >>> 20)) + a) << 0;
    c += (b ^ (d & (a ^ b))) + blocks[10] - 42063;
    c = (((c << 17) | (c >>> 15)) + d) << 0;
    b += (a ^ (c & (d ^ a))) + blocks[11] - 1990404162;
    b = (((b << 22) | (b >>> 10)) + c) << 0;
    a += (d ^ (b & (c ^ d))) + blocks[12] + 1804603682;
    a = (((a << 7) | (a >>> 25)) + b) << 0;
    d += (c ^ (a & (b ^ c))) + blocks[13] - 40341101;
    d = (((d << 12) | (d >>> 20)) + a) << 0;
    c += (b ^ (d & (a ^ b))) + blocks[14] - 1502002290;
    c = (((c << 17) | (c >>> 15)) + d) << 0;
    b += (a ^ (c & (d ^ a))) + blocks[15] + 1236535329;
    b = (((b << 22) | (b >>> 10)) + c) << 0;
    a += (c ^ (d & (b ^ c))) + blocks[1] - 165796510;
    a = (((a << 5) | (a >>> 27)) + b) << 0;
    d += (b ^ (c & (a ^ b))) + blocks[6] - 1069501632;
    d = (((d << 9) | (d >>> 23)) + a) << 0;
    c += (a ^ (b & (d ^ a))) + blocks[11] + 643717713;
    c = (((c << 14) | (c >>> 18)) + d) << 0;
    b += (d ^ (a & (c ^ d))) + blocks[0] - 373897302;
    b = (((b << 20) | (b >>> 12)) + c) << 0;
    a += (c ^ (d & (b ^ c))) + blocks[5] - 701558691;
    a = (((a << 5) | (a >>> 27)) + b) << 0;
    d += (b ^ (c & (a ^ b))) + blocks[10] + 38016083;
    d = (((d << 9) | (d >>> 23)) + a) << 0;
    c += (a ^ (b & (d ^ a))) + blocks[15] - 660478335;
    c = (((c << 14) | (c >>> 18)) + d) << 0;
    b += (d ^ (a & (c ^ d))) + blocks[4] - 405537848;
    b = (((b << 20) | (b >>> 12)) + c) << 0;
    a += (c ^ (d & (b ^ c))) + blocks[9] + 568446438;
    a = (((a << 5) | (a >>> 27)) + b) << 0;
    d += (b ^ (c & (a ^ b))) + blocks[14] - 1019803690;
    d = (((d << 9) | (d >>> 23)) + a) << 0;
    c += (a ^ (b & (d ^ a))) + blocks[3] - 187363961;
    c = (((c << 14) | (c >>> 18)) + d) << 0;
    b += (d ^ (a & (c ^ d))) + blocks[8] + 1163531501;
    b = (((b << 20) | (b >>> 12)) + c) << 0;
    a += (c ^ (d & (b ^ c))) + blocks[13] - 1444681467;
    a = (((a << 5) | (a >>> 27)) + b) << 0;
    d += (b ^ (c & (a ^ b))) + blocks[2] - 51403784;
    d = (((d << 9) | (d >>> 23)) + a) << 0;
    c += (a ^ (b & (d ^ a))) + blocks[7] + 1735328473;
    c = (((c << 14) | (c >>> 18)) + d) << 0;
    b += (d ^ (a & (c ^ d))) + blocks[12] - 1926607734;
    b = (((b << 20) | (b >>> 12)) + c) << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[5] - 378558;
    a = (((a << 4) | (a >>> 28)) + b) << 0;
    d += (bc ^ a) + blocks[8] - 2022574463;
    d = (((d << 11) | (d >>> 21)) + a) << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[11] + 1839030562;
    c = (((c << 16) | (c >>> 16)) + d) << 0;
    b += (da ^ c) + blocks[14] - 35309556;
    b = (((b << 23) | (b >>> 9)) + c) << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[1] - 1530992060;
    a = (((a << 4) | (a >>> 28)) + b) << 0;
    d += (bc ^ a) + blocks[4] + 1272893353;
    d = (((d << 11) | (d >>> 21)) + a) << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[7] - 155497632;
    c = (((c << 16) | (c >>> 16)) + d) << 0;
    b += (da ^ c) + blocks[10] - 1094730640;
    b = (((b << 23) | (b >>> 9)) + c) << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[13] + 681279174;
    a = (((a << 4) | (a >>> 28)) + b) << 0;
    d += (bc ^ a) + blocks[0] - 358537222;
    d = (((d << 11) | (d >>> 21)) + a) << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[3] - 722521979;
    c = (((c << 16) | (c >>> 16)) + d) << 0;
    b += (da ^ c) + blocks[6] + 76029189;
    b = (((b << 23) | (b >>> 9)) + c) << 0;
    bc = b ^ c;
    a += (bc ^ d) + blocks[9] - 640364487;
    a = (((a << 4) | (a >>> 28)) + b) << 0;
    d += (bc ^ a) + blocks[12] - 421815835;
    d = (((d << 11) | (d >>> 21)) + a) << 0;
    da = d ^ a;
    c += (da ^ b) + blocks[15] + 530742520;
    c = (((c << 16) | (c >>> 16)) + d) << 0;
    b += (da ^ c) + blocks[2] - 995338651;
    b = (((b << 23) | (b >>> 9)) + c) << 0;
    a += (c ^ (b | ~d)) + blocks[0] - 198630844;
    a = (((a << 6) | (a >>> 26)) + b) << 0;
    d += (b ^ (a | ~c)) + blocks[7] + 1126891415;
    d = (((d << 10) | (d >>> 22)) + a) << 0;
    c += (a ^ (d | ~b)) + blocks[14] - 1416354905;
    c = (((c << 15) | (c >>> 17)) + d) << 0;
    b += (d ^ (c | ~a)) + blocks[5] - 57434055;
    b = (((b << 21) | (b >>> 11)) + c) << 0;
    a += (c ^ (b | ~d)) + blocks[12] + 1700485571;
    a = (((a << 6) | (a >>> 26)) + b) << 0;
    d += (b ^ (a | ~c)) + blocks[3] - 1894986606;
    d = (((d << 10) | (d >>> 22)) + a) << 0;
    c += (a ^ (d | ~b)) + blocks[10] - 1051523;
    c = (((c << 15) | (c >>> 17)) + d) << 0;
    b += (d ^ (c | ~a)) + blocks[1] - 2054922799;
    b = (((b << 21) | (b >>> 11)) + c) << 0;
    a += (c ^ (b | ~d)) + blocks[8] + 1873313359;
    a = (((a << 6) | (a >>> 26)) + b) << 0;
    d += (b ^ (a | ~c)) + blocks[15] - 30611744;
    d = (((d << 10) | (d >>> 22)) + a) << 0;
    c += (a ^ (d | ~b)) + blocks[6] - 1560198380;
    c = (((c << 15) | (c >>> 17)) + d) << 0;
    b += (d ^ (c | ~a)) + blocks[13] + 1309151649;
    b = (((b << 21) | (b >>> 11)) + c) << 0;
    a += (c ^ (b | ~d)) + blocks[4] - 145523070;
    a = (((a << 6) | (a >>> 26)) + b) << 0;
    d += (b ^ (a | ~c)) + blocks[11] - 1120210379;
    d = (((d << 10) | (d >>> 22)) + a) << 0;
    c += (a ^ (d | ~b)) + blocks[2] + 718787259;
    c = (((c << 15) | (c >>> 17)) + d) << 0;
    b += (d ^ (c | ~a)) + blocks[9] - 343485551;
    b = (((b << 21) | (b >>> 11)) + c) << 0;

    if (this.first) {
      this.h0 = (a + 1732584193) << 0;
      this.h1 = (b - 271733879) << 0;
      this.h2 = (c - 1732584194) << 0;
      this.h3 = (d + 271733878) << 0;
      this.first = false;
    } else {
      this.h0 = (this.h0 + a) << 0;
      this.h1 = (this.h1 + b) << 0;
      this.h2 = (this.h2 + c) << 0;
      this.h3 = (this.h3 + d) << 0;
    }
  };

  Md5.prototype.hex = function () {
    this.finalize();

    var h0 = this.h0,
      h1 = this.h1,
      h2 = this.h2,
      h3 = this.h3;

    return (
      HEX_CHARS[(h0 >> 4) & 0x0f] +
      HEX_CHARS[h0 & 0x0f] +
      HEX_CHARS[(h0 >> 12) & 0x0f] +
      HEX_CHARS[(h0 >> 8) & 0x0f] +
      HEX_CHARS[(h0 >> 20) & 0x0f] +
      HEX_CHARS[(h0 >> 16) & 0x0f] +
      HEX_CHARS[(h0 >> 28) & 0x0f] +
      HEX_CHARS[(h0 >> 24) & 0x0f] +
      HEX_CHARS[(h1 >> 4) & 0x0f] +
      HEX_CHARS[h1 & 0x0f] +
      HEX_CHARS[(h1 >> 12) & 0x0f] +
      HEX_CHARS[(h1 >> 8) & 0x0f] +
      HEX_CHARS[(h1 >> 20) & 0x0f] +
      HEX_CHARS[(h1 >> 16) & 0x0f] +
      HEX_CHARS[(h1 >> 28) & 0x0f] +
      HEX_CHARS[(h1 >> 24) & 0x0f] +
      HEX_CHARS[(h2 >> 4) & 0x0f] +
      HEX_CHARS[h2 & 0x0f] +
      HEX_CHARS[(h2 >> 12) & 0x0f] +
      HEX_CHARS[(h2 >> 8) & 0x0f] +
      HEX_CHARS[(h2 >> 20) & 0x0f] +
      HEX_CHARS[(h2 >> 16) & 0x0f] +
      HEX_CHARS[(h2 >> 28) & 0x0f] +
      HEX_CHARS[(h2 >> 24) & 0x0f] +
      HEX_CHARS[(h3 >> 4) & 0x0f] +
      HEX_CHARS[h3 & 0x0f] +
      HEX_CHARS[(h3 >> 12) & 0x0f] +
      HEX_CHARS[(h3 >> 8) & 0x0f] +
      HEX_CHARS[(h3 >> 20) & 0x0f] +
      HEX_CHARS[(h3 >> 16) & 0x0f] +
      HEX_CHARS[(h3 >> 28) & 0x0f] +
      HEX_CHARS[(h3 >> 24) & 0x0f]
    );
  };

  return function (message) {
    return new Md5().update(message).hex();
  };
})();
