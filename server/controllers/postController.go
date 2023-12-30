package controllers

import (
	//"net/http"

	"log"
	"net/http"

	"github.com/TarinPairor/CVWO-assignment-2024/models"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func PostsCreate(c *gin.Context) {

	// Initalize db
	dns := "host=tuffi.db.elephantsql.com user=yaudahpd password=o8BXH9DwavcVLgvGJoKVHi4iMQg4KrUc dbname=yaudahpd port=5432 sslmode=disable TimeZone=Asia/Shanghai"
  	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
		print(db)
	}


	post := models.Post{Title: "Post Controller Title", Body: "Post Controller Body"}

	result := db.Create(&post) // pass pointer of data to Create

	if result.Error != nil {
		c.Status(400)
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
	  "message": post,
	})
	
  }