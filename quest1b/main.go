package main

import (
	"fmt"
)

//Write a program that prints the Latin alphabet in lowercase in reverse order (from 'z' to 'a') on a single line.

// A line is a sequence of characters preceding the end of line character ('\n').

// Please note that casting is not allowed for this exercise!

func main() {

	// so for us to solve this will use the like the same aproch for te first one

	for i := 25; i >= 0; i-- {
		if i%2 == 0 {
			fmt.Printf(" %c ", 'a'+i)
		} else {
			fmt.Printf(" %c ", 'a'+i)
		}
	}

	fmt.Println()
}
