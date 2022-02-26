var fs = require("fs");
const sortedSet = require("sorted-set");
var file = "./json/tokens.json";
const SortedSet = require("js-sorted-set");

fs.readFile(file, "utf8", function (err, data) {
  if (err) {
    console.log("Error: " + err);
    return;
  }
  data = JSON.parse(data);
  console.dir(data);
});
fs.readFile("./json/tokens.json", "utf8", (err, data) => {
  if (err) console.error(err);
  const tokensFile = JSON.parse(data);
});
class DoublyLinkedListNode {
  constructor(value, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  prependValue(value) {
    if (this.head === null) {
      const node = new DoublyLinkedListNode(value);
      this.head = node;
      this.tail = node;
    } else {
      const currentHead = this.head;
      const newHead = new DoublyLinkedListNode(value);
      currentHead.prev = newHead;
      newHead.next = currentHead;
      this.head = newHead;
    }
  }
  appendValue(value) {
    if (this.head === null) {
      const node = new DoublyLinkedListNode(value);
      this.head = node;
      this.tail = node;
    } else {
      const currentTail = this.tail;
      const newTail = new DoublyLinkedListNode(value);
      currentTail.next = newTail;
      newTail.prev = currentTail;
      this.tail = newTail;
    }
  }
  getNthNode(n) {
    let node = this.head;
    let c = 0;
    while (c < n && node !== null) {
      node = node.next;
      c = c + 1;
    }
    return node;
  }
  searchForItem(item) {
    var sortedSet = [];
    let current = this.head;
    if (this.head == null) {
      console.log("list is empty");
    }
    while (current != null) {
      if (
        current.value.username.includes(item) ||
        // current.value.phonenumber.includes(item) ||
        current.value.email.includes(item)
      ) {
        sortedSet.push(current.value);
      }
      current = current.next;
    }
    return sortedSet;
  }
}
function main(phoneNum) {
  var linkedList = new DoublyLinkedList();
  fs.readFile("./json/tokens.json", "utf8", (err, data) => {
    if (err) console.error(err);
    const tokensFile = JSON.parse(data);
    tokensFile.forEach((token) => {
      linkedList.appendValue(token);
    });
    let current = linkedList.head;
    console.log(current.value.phone);
    var set = linkedList.searchForItem(phoneNum);
    set.forEach((item) => {
      console.log(item);
    });
  });
}
// function searchForItem(item) {
//   var sortedSet = new SortedSet();
//   let current = linkedList.head;
//   if (linkedList.head == null) {
//     console.log("list is empty");
//   }
//   while (current != null) {
//     if (
//       current.value.username.toLowerCase().includes(item) ||
//       current.value.phonenumber.includes(item) ||
//       current.value.email.toLowerCase().includes(item)
//     ) {
//       sortedSet.add(current.value);
//     }
//     current = current.next;
//   }
//   return sortedSet;
// }

// searchForItem("jdunne");
module.exports = { main };
