package main

import (
	"fmt"
	"io/ioutil"
	"log"
)

func readConfig() {
	content, err := ioutil.ReadFile("./fs-regex.yaml")
	if err != nil {
		log.Fatal(err)
	}

	//nolint
	fmt.Printf("%s", content)
}
