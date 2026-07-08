package main

import (
	"fmt"
)

func Isnegative(nd int) {
	if nd < 0 {
		fmt.Print('F')
	} else {
		fmt.Print('T')
	}
}

func main() {
	Isnegative(1)
	fmt.Println()

}
