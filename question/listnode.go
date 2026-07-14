package question
package main


import(
	"fmt"
)
 type Node struct{
	Data = int
	next = *Node
 }

func main(){
	n1 := &Node{Data: 20 }
	n2 := &Node{Data: 30}
	n3 := &Node{Data: 40}

    n1.next = n2
	n2.next = n3

	fmt.Println(next)


}