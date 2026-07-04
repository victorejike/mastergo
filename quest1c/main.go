package main

import (
	"fmt"
)

/* Instructions
Write a program that prints the decimal digits in ascending order (from 0 to 9) on a single line.

A line is a sequence of characters preceding the end of line character ('\n').

Usage
$ go run .
0123456789
$ */

func main() {

	// what i will do is i will set i from 0 to count all the way to 9  if the condition is meet
	// this the model way of using range to range through it
	for i := range 10 {
		fmt.Printf(" %d ", i)
	}
	fmt.Println()
}
