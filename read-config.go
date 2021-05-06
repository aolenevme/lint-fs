package main

import (
	"fmt"
	"io/ioutil"

	"gopkg.in/yaml.v2"
)

type Config struct {
	Ignore []string `yaml:"ignore"`
	Rules  []string `yaml:"rules"`
}

func readConfig() (config Config, err error) {
	configFile, err := ioutil.ReadFile("./lint-fs.yaml")
	if err != nil {
		return Config{}, fmt.Errorf("failed to read lint-fs.yaml config file: %w", err)
	}

	err = yaml.Unmarshal(configFile, &config)
	if err != nil {
		return Config{}, fmt.Errorf("failed to unmarshal lint-fs.yaml config file: %w", err)
	}

	return config, nil
}
