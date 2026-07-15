package main

import (
	"fmt"

)
  
type Node struct{
	Data int
	Data2 string
	Next *Node
}

func main(){

	n1 := &Node{Data: 20}
	n2 := &Node{Data: 30}
	n3 := &Node{Data: 50}
	v1 := &Node{Data2: "victor"}

	n1.Next = n2
	n2.Next = n3
	n3.Next = v1
	 
	current := v1 

	for current != nil {
		fmt.Println(current.Data,current.Data2)
		current = current.Next
	}



}