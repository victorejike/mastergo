package main

import (
	"fmt"
)

func PointerOne(n *int) {
	*n = 50	

}

func main() {
	x := 50
	PointerOne(&x)
	fmt.Println(x)

}
