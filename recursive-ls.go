package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"regexp"
)

func pathMatchRegExp(rules []string, path string) bool {
	for _, rule := range rules {
		re := regexp.MustCompile(rule)

		if re.Match([]byte(path)) {
			return true
		}
	}

	return false
}

func printPathResult(finalPath string, isMatched bool) {
	emoji := "\u2705"

	if !isMatched {
		emoji = "\u274C"
	}

	//nolint
	fmt.Printf("%s %s\n", finalPath, emoji)
}

func recursiveLs(computedPath string, config Config) {
	files, err := ioutil.ReadDir(computedPath)
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		if file.IsDir() {
			currentDirPath := computedPath + file.Name() + "/"
			recursiveLs(currentDirPath, config)
		} else {
			finalPath := computedPath + file.Name()

			isMatched := pathMatchRegExp(config.Rules, finalPath)

			printPathResult(finalPath, isMatched)
		}
	}
}
