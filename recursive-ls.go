package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"regexp"
)

func pathMatchRegExp(reTemplate string, path string) bool {
	re := regexp.MustCompile(reTemplate)

	return re.Match([]byte(path))
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

			//nolint
			fmt.Println(finalPath, pathMatchRegExp(config.Rules[0], finalPath))
		}
	}
}
