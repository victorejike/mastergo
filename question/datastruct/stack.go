package main

import (
	"fmt"
)

func main() {
	stack := []int{}

	stack = append(stack, 10)
	stack = append(stack, 20)
	stack = append(stack, 30)
	stack = append(stack, 40)

	fmt.Println(stack)

	top := stack[len(stack)-1]
	fmt.Println("Top of stack ", top)

	stack = stack[:len(stack)-1]
	top = stack[len(stack)-1]

	fmt.Println("Top of the stack", top)
	fmt.Println("adding to the stack", stack)
}
