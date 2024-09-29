import Node from './node.mjs';

export default class Tree {

  #root;

  constructor(array) {    
    this.#root = this.#buildTree(array);
  };

  get root() {
    return this.#root;
  };

  set root(node) {
    this.#root = node;
  };

  #buildTree(array) {
    if (!array || array.length < 1) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.#buildTree(array.slice(0, mid));
    root.right = this.#buildTree(array.slice(mid + 1));

    return root;
  };

  #successor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
        curr = curr.left;
    }
    return curr;
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  insert(data) {
    const newNode = new Node(data);

    if (this.#root === null) {
      this.#root = newNode;
      return;
    }

    let parent = null;
    let current = this.#root;

    while (current) {
      parent = current;
      
      if (data > current.data) {
        current = current.right;
      } else if (data < current.data) {
        current = current.left;
      } else {
        return;
      }
    }

    if (data > parent.data) parent.right = newNode;
    else parent.left = newNode;
  }

  delete(root = this.#root, target) {
    if (!root) return root;

    if (root.data > target) {
      root.left = this.delete(root.left, target);
    } else if (root.data < target) {
      root.right = this.delete(root.right, target);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;

      let succ = this.#successor(root);
      root.data = succ.data;
      root.right = this.delete(root.right, succ.data);
    }

    return root;
  }

  find(target) {
    let current = this.#root;

    while (current) {
      if (current.data > target) current = current.left;
      else if (current.data < target) current = current.right;
      else return current;
    }

    return null;
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback is required');
    } 

    const queue = [];
    queue.push(this.#root);

    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  preOrder(callback, root = this.#root) {
    if (typeof callback !== 'function') {
      throw new Error('A callback is required');
    }

    if (!root) return;
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  inOrder(callback, root = this.#root) {
    if (typeof callback !== 'function') {
      throw new Error('A callback is required');
    }

    if (!root) return;
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  postOrder(callback, root = this.#root) {
    if (typeof callback !== 'function') {
      throw new Error('A callback is required');
    }

    if (!root) return;
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(root = this.#root) {
    if (!root) return -1;

    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(node, root = this.#root) {
    if (!root) return -1;
    if (root.data === node) return 0;
    
    let depthLevel = node > root.data ? this.depth(node, root.right) : this.depth(node, root.left);
    if (depthLevel === -1) return -1;

    return 1 + depthLevel;
  }

  isBalanced(root = this.#root) {
    const checkHeight = (node) => {
      if (!node) return 0;  
      
      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);
        
      if (leftHeight === -1 || rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
  
      return Math.max(leftHeight, rightHeight) + 1;
    };
  
    return checkHeight(root) !== -1;
  }

  rebalance() {
    const nodes = [];
    this.inOrder((node) => nodes.push(node.data));
    this.#root = this.#buildTree(nodes);
  }
}