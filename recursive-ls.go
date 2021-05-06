package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"regexp"
)

func pathMatchRegExp(config Config, path string) bool {
	ignore := config.Ignore
	rules := config.Rules

	isMatched := false

	for _, rule := range rules {
		re := regexp.MustCompile(rule)

		if re.Match([]byte(path)) {
			isMatched = true

			break
		}
	}

	for _, ignoreRule := range ignore {
		re := regexp.MustCompile(ignoreRule)

		if re.Match([]byte(path)) {
			isMatched = true

			break
		}
	}

	return isMatched
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

			isMatched := pathMatchRegExp(config, finalPath)

			printPathResult(finalPath, isMatched)
		}
	}
}
