package main

func main() {
	c := new(Config)
	c.Init()

	lintFs("./", c)
}
