package main

import (
	//"fmt"

	"github.com/TarinPairor/CVWO-assignment-2024/controllers"
	initializers "github.com/TarinPairor/CVWO-assignment-2024/initializers"
	"github.com/TarinPairor/CVWO-assignment-2024/middleware"
	"github.com/gin-contrib/cors"
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

	// Use cors middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}  // Add your frontend URL here
	r.Use(cors.New(config))

	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Next()
	})

	//SimpleUsers
	r.POST("/simplesignup", controllers.SimpleSignup)
	r.POST("/simplelogin", controllers.SimpleLogin)
	r.GET("/simplevalidate", controllers.SimpleValidate)

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


  