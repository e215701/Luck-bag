package main

import (
	"encoding/json"
	"net/http"
	"github.com/rs/cors"
)

type Response struct {
	Message string `json:"message"`
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/hello", func(w http.ResponseWriter, r *http.Request) {
		response := Response{
			Message: "Hello from Golang!",
		}

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, "Failed to encode response", http.StatusInternalServerError)
			return
		}
	})

	handler := cors.Default().Handler(mux)
	http.ListenAndServe(":8080", handler)
}
