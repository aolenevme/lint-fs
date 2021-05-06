package main

import (
	"fmt"
	"log"
)

func main() {
	config, err := readConfig()
	if err != nil {
		log.Fatal(err)
	}

	//nolint
	fmt.Printf("%+v %s", config, err)

	ls("./")
}
