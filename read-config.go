package main

import (
	"fmt"
	"io/ioutil"
	"log"

	"gopkg.in/yaml.v2"
)

type Config struct {
	Ignore []string `yaml:"ignore"`
	Rules  []string `yaml:"rules"`
}

func readConfig() {
	configFile, err := ioutil.ReadFile("./lint-fs.yaml")
	if err != nil {
		log.Fatal(err)
	}

	var config Config

	err = yaml.Unmarshal(configFile, &config)
	if err != nil {
		log.Fatalf("error: %v", err)
	}
	//nolint
	fmt.Printf("%+v\n\n", config)
}
