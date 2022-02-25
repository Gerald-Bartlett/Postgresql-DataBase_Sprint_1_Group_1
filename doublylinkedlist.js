

var fs = require('fs');
var file =  './tokens.json';

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }

  data = JSON.parse(data);

  console.dir(data);
});


fs.readFile('./tokens.json', 'utf8', (err, data) =>{
    if (err) console.error(err);
   
    const tokensFile = JSON.parse(data);
});




class DoublyLinkedListNode{
    constructor(value, next = null, prev = null){
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
    }
    prependValue(value){
       if(this.head === null){
           const node =  new DoublyLinkedListNode(value);
           this.head = node;
           this.tail = node;
       } else{
           const currentHead = this.head;
           const newHead = new DoublyLinkedListNode(value);
           currentHead.prev = newHead;
           newHead.next = currentHead;
           this.head = newHead;
       }
    }
    appendValue(value){
        if(this.head === null){
            const node = new DoublyLinkedListNode(value);
            this.head = node;
            this.tail = node;
        }else{
          const currentTail = this.tail;
          const newTail = new DoublyLinkedListNode(value)
          currentTail.next = newTail;
          newTail.prev = currentTail;
          this.tail = newTail;
        }
    }

getNthNode(n){
    let node = this.head;
    let c = 0;
    while(c < n && node !== null){
      node = node.next;
      c = c + 1 ; 
    }
    return node;
    }
}


function main(){
    const linkedList = new DoublyLinkedList();
    linkedList.appendValue("Gerald Bartlett, Johnathon Dunne, Billy Larkin ");
    linkedList.appendValue({"user name": "team1"});
    
    let node = linkedList.head;
    while(node !== null){
        console.log(node.value);
        node = node.next;
    }
}

main();
