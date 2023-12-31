package main

import (
	//"fmt"

	"github.com/TarinPairor/CVWO-assignment-2024/controllers"
	initializers "github.com/TarinPairor/CVWO-assignment-2024/initializers"
	"github.com/TarinPairor/CVWO-assignment-2024/middleware"
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
	//initializers.ConnectToDB()
}

// PORT = 3000 declared in .env
func main() {
	
	r := gin.Default()

	//Users
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)

	//Posts
	r.POST("/posts", controllers.PostsCreate)
	r.PUT("/posts/:id", controllers.PostsUpdate)
	r.GET("/posts", controllers.PostsIndex)
	r.GET("/posts/:id", controllers.PostsShow)
	r.DELETE("/posts/:id", controllers.PostsDelete)
	
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
  }


  