// User defined class node
class Node {
	// constructor
	constructor(element)
	{
		this.element = element;
		this.next = null
	}
}

// linkedlist class
class LinkedList {
	constructor()
	{
		this.head = null;
		this.size = 0;
	}

  // adds an element in order (used for int in this project)
  // Cannot accept two of the same element
  add(element) {
  	// creates a new node
  	var node = new Node(element);

  	// if list is Empty add the element and make it head
  	if (this.head == null)
  		this.head = node;
  	else {
  		var current = this.head;
      if (current.element > element) {
        node.next = current;
        this.head = node;
        this.size++;
        return;
      }
  		// iterate to the correct position
  		while (current.next && current.next.element < element) {
  			current = current.next;
  		}

  		//set next. next = null if at end
      node.next = current.next
      // add node
      current.next = node;
  	}
  	this.size++;
  }

  find(element) {
    var current = this.head;
    while (current != null && current.element <= element) {
      if (current.element == element) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
  // removes a given element from the list
  remove(element) {
    var current = this.head;
    var prev = null;

    // iterate over the list
    while (current != null && current.element <= element) {
      // comparing element with current.element
      if (current.element == element) {
        if (prev == null) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        return true;
      }
      prev = current;
      current = current.next;
    }
    return false;
    }

    get_first() {
      if(this.head == null) {
        return;
      }
      return this.head.element;
    }
    //return size
    get_size() {
      return this.size;
  }
	// removeElement(element)

	// Helper Methods
	// isEmpty
	// size_Of_List
	// PrintList
}
