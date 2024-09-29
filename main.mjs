import fixArray from "./sort.mjs";
import Tree from "./tree.mjs";
import getArray from "./random-array.mjs";

const arr = getArray();

const BST = new Tree(arr);
BST.prettyPrint(BST.root);
console.log(BST.isBalanced());