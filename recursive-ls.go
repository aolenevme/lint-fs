package main

import (
	"fmt"
	"io/ioutil"
	"log"
)

func ls(computedPath string) {
	files, err := ioutil.ReadDir(computedPath)
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		if file.IsDir() {
			currentDirPath := computedPath + file.Name() + "/"
			ls(currentDirPath)
		} else {
			finalPath := computedPath + file.Name()
			//nolint
			fmt.Println(finalPath)
		}
	}
}
