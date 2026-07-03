package main

import (
	"fmt"
)

// this program is to show we can use loop to creat from a to z which is fun
// and by using for loop
func main() {
// this program we can still use it to do small lettters and big latter
	for i := 0; i <= 25; i++ {
		if i&2 == 0 {
			fmt.Printf(" %c ", 'A'+i)
		} else {
			fmt.Printf(" %c ", 'A'+i)
		}
	}
	fmt.Println()
 
}
