package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"regexp"
)

func lintFs(prevPath string, config *Config) {
	files, err := ioutil.ReadDir(prevPath)
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		curFilePath := prevPath + file.Name()
		curDirPath := curFilePath + "/"

		isCurFileIgnored := isMatched(config.Ignores, curFilePath)
		isCurDirIgnored := isMatched(config.Ignores, curDirPath)

		if file.IsDir() && !isCurDirIgnored {
			lintFs(curDirPath, config)
		} else if !isCurFileIgnored {
			isCurFileMatched := isMatched(config.Rules, curFilePath)

			printMatchResult(curFilePath, isCurFileMatched)
		}
	}
}

func isMatched(res []string, path string) bool {
	for _, re := range res {
		compiledRe := regexp.MustCompile(re)

		if compiledRe.Match([]byte(path)) {
			return true
		}
	}

	return false
}

func printMatchResult(finalPath string, isMatched bool) {
	emoji := "\u2705"

	if !isMatched {
		emoji = "\u274C"
	}

	//nolint
	fmt.Printf("%s %s\n", finalPath, emoji)
}
