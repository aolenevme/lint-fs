package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"regexp"
)

func lintFs(c *Config) {
	//nolint
	fmt.Print("\n====================\n  Filesystem lint  \n====================\n\n")

	isFsCorrect := true
	recursiveLintFs("./", c, &isFsCorrect)

	if !isFsCorrect {
		log.Fatal("\n\nFilesystem structure is not correct!\n\n")
	}
}

func recursiveLintFs(prevPath string, c *Config, isFsCorrect *bool) {
	files, err := ioutil.ReadDir(prevPath)
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		curFilePath := prevPath + file.Name()
		curDirPath := curFilePath + "/"

		isCurFileIgnored := isMatched(c.Ignores, curFilePath)
		isCurDirIgnored := isMatched(c.Ignores, curDirPath)

		if file.IsDir() && !isCurDirIgnored {
			recursiveLintFs(curDirPath, c, isFsCorrect)
		} else if !isCurFileIgnored {
			isCurFileMatched := isMatched(c.Rules, curFilePath)

			*isFsCorrect = *isFsCorrect && isCurFileMatched

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
