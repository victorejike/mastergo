package main

import "fmt"

func main() {
	for i := 0; i <= 98; i++ {
		for j := i + 1; j <= 99; j++ {
			fmt.Printf("%d%d ", i, j)

			if !(i == 98 && j == 99) {
				fmt.Print(", ")
			}
		}
	}
	fmt.Println()
}
