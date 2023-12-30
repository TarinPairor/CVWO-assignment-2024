package main

import (
	"log"

	initializers "github.com/TarinPairor/CVWO-assignment-2024/init"
	"github.com/TarinPairor/CVWO-assignment-2024/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	// Ensure DB is not nil before using it

	dns := "host=tuffi.db.elephantsql.com user=yaudahpd password=o8BXH9DwavcVLgvGJoKVHi4iMQg4KrUc dbname=yaudahpd port=5432 sslmode=disable TimeZone=Asia/Shanghai"
  	db, err := gorm.Open(postgres.Open(dns), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
		print(db)
	}
	// Use the Create method of the Gorm DB instance to insert the new record
	db.AutoMigrate(&models.Post{})

}
