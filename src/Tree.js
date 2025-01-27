import React from "react";
import "./tree.css";
import { TreeViz } from "./tree-visualizer";
import _ from "lodash";

class Tree {
  constructor() {
    this.root = null;
  }

  add(value) {
    if (this.root === null) {
      this.root = new Node(value);
    } else {
      let current = this.root;
      // infinite loop keep running until stopped -> while(true)
      while (true) {
        if (current.value > value) {
          // go left
          if (current.left) {
            current = current.left; // run loop again
          } else {
            current.left = new Node(value);
            break; // stop infinte while loop
          }
        } else {
          // go right
          if (current.right) {
            current = current.right; // run loop again
          } else {
            current.right = new Node(value);
            break; // stop infinte while loop
          }
        }
      }
    }
    return this; // return tree
  }

  toObject() {
    return this.root;
  }
}

// you might consider using a Node class too
class Node {
  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export default function TreeComponent() {
  const nums = _.shuffle(_.range(10));
  const tree = new Tree();
  nums.map((num) => tree.add(num));
  const objs = tree.toObject();
  return <TreeViz root={objs} />;
}
