package main

import (
	//"fmt"
	"net/http"

	initializers "github.com/TarinPairor/CVWO-assignment-2024/init"
	"github.com/gin-gonic/gin"
)

func init() {
	/*
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	now in init folder
	*/

	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

// PORT = 3000 declared in .env
func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
	  c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	  })
	})
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
  }


  