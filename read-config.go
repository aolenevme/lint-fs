package main

import (
	"fmt"
	"io/ioutil"
	"log"

	"gopkg.in/yaml.v2"
)

type T struct {
	A string
	B struct {
		RenamedC int   `yaml:"c"`
		D        []int `yaml:",flow"`
	}
}

func readConfig() {
	content, err := ioutil.ReadFile("./fs-regex.yaml")
	if err != nil {
		log.Fatal(err)
	}

	var t T

	err = yaml.Unmarshal(content, &t)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
	//nolint
	fmt.Printf("%+v\n\n", t)
}
