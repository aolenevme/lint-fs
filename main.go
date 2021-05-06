package main

import (
	"log"
)

func main() {
	config, err := readConfig()
	if err != nil {
		log.Fatal(err)
	}

	recursiveLs("./", config)
}
