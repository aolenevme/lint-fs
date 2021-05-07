package main

import (
	"io/ioutil"
	"log"

	"gopkg.in/yaml.v2"
)

type Config struct {
	Ignores []string `yaml:"ignores"`
	Rules   []string `yaml:"rules"`
}

func (c *Config) Init() {
	configContent, err := ioutil.ReadFile("./lint-fs.yaml")
	if err != nil {
		log.Fatal(err)
	}

	err = yaml.Unmarshal(configContent, &c)
	if err != nil {
		log.Fatal(err)
	}
}
