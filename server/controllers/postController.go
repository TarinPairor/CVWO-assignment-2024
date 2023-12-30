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

	var body struct {
		Body string
		Title string
	}

	c.Bind(&body)

	// Initalize db
	dns := "host=tuffi.db.elephantsql.com user=yaudahpd password=o8BXH9DwavcVLgvGJoKVHi4iMQg4KrUc dbname=yaudahpd port=5432 sslmode=disable TimeZone=Asia/Shanghai"
  	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	// Can post json files in /post 
	post := models.Post{Title: body.Title, Body: body.Body}

	result := db.Create(&post) // pass pointer of data to Create

	if result.Error != nil {
		c.Status(400)
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
	  "posts": post,
	})
	
  }

  func PostsIndex(c *gin.Context) {

	// Initalize db
	dns := "host=tuffi.db.elephantsql.com user=yaudahpd password=o8BXH9DwavcVLgvGJoKVHi4iMQg4KrUc dbname=yaudahpd port=5432 sslmode=disable TimeZone=Asia/Shanghai"
  	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	var posts []models.Post
	result := db.Find(&posts)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"posts": posts,
	})

  }

  func PostsShow(c *gin.Context) {

	// retrieve id from context.Param of type id
	id := c.Param("id")

	// Initalize db
	dns := "host=tuffi.db.elephantsql.com user=yaudahpd password=o8BXH9DwavcVLgvGJoKVHi4iMQg4KrUc dbname=yaudahpd port=5432 sslmode=disable TimeZone=Asia/Shanghai"
  	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	var post models.Post
	result := db.First(&post, id)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"post": post,
	})

  }

  func PostsUpdate(c * gin.Context) {

	// Initalize db
	dns := "host=tuffi.db.elephantsql.com user=yaudahpd password=o8BXH9DwavcVLgvGJoKVHi4iMQg4KrUc dbname=yaudahpd port=5432 sslmode=disable TimeZone=Asia/Shanghai"
  	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	//Get id off url
	id := c.Param("id")

	//Get data of req body
	var body struct {
		Body string
		Title string
	}

	c.Bind(&body)

	//Find the post we r updating
	var post models.Post
	db.First(&post, id)

	//Update it
	db.Model(&post).Updates(models.Post{
		Title: body.Title,
		Body: body.Body,
	})

	//Respond with it
	c.JSON(http.StatusOK, gin.H{
		"post": post,
	})
  }

  func PostsDelete(c *gin.Context) {

	// Initalize db
	dns := "host=tuffi.db.elephantsql.com user=yaudahpd password=o8BXH9DwavcVLgvGJoKVHi4iMQg4KrUc dbname=yaudahpd port=5432 sslmode=disable TimeZone=Asia/Shanghai"
  	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	//Get id off url
	id := c.Param("id")

	//Delete post
	db.Delete(&models.Post{}, id)

	//Respond
	c.Status(200)

  }