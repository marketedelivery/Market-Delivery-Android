package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	//http.HandleFunc("/", initialize)

	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./www"))))

	port := os.Getenv("OPENSHIFT_GO_PORT")
	if port == "" {
		port = "8080"
	}
	ip := os.Getenv("OPENSHIFT_GO_IP")
	if ip == "" {
		ip = "127.0.0.1"
	}

	bind := fmt.Sprintf("%s:%s", ip, port)
	fmt.Printf("listening on %s...", bind)
	err := http.ListenAndServe(bind, nil)
	if err != nil {
		panic(err)
	}
}

func initialize(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "Server On")
}
