package main

import(
	"fmt"
)

//Here is a possible program to test your function :

// package main

// import "piscine"

// func main() {
// 	piscine.PrintComb()
// }
// This is the incomplete output :

// $ go run . | cat -e
// 012, 013, 014, 015, 016, 017, 018, 019, 023, ..., 689, 789$
// $
// 000 or 999 are not valid combinations because the digits are not different.

// 987 should not be shown because the first digit is not less than the second.

func PrintComb(){
	
	for i := 0; i <= 9-2; i++{
		for j := i+1; j <= 9-1; j++{
			for k := j + 1;  k <= 9; k++{
				fmt.Printf(" %d%d%d, ", i,j,k)
			}
		}
	}
	fmt.Println()

}

 func main(){
	PrintComb()
 }