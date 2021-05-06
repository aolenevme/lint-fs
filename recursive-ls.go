package main

import (
	"fmt"
	"io/ioutil"
	"log"
)

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
			//nolint
			fmt.Println(config)

			finalPath := computedPath + file.Name()
			//nolint
			fmt.Println(finalPath)
		}
	}
}
