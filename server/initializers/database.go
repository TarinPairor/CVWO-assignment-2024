package initializers

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB // Declare a global variable to store the database connection

func ConnectToDB() *gorm.DB {
	var err error
	// Update the values in the DSN to match your database configuration
	dsn := "host=tuffi.db.elephantsql.com user=yaudahpd password=o8BXH9DwavcVLgvGJoKVHi4iMQg4KrUc dbname=yaudahpd port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	// Print some property to ensure it's not null
	if DB != nil {
		log.Println("Connected to the database successfully")
		log.Printf("Database name: %s", DB.Name())
	} else {
		log.Fatal("Database connection is nil")
	}

	return DB
}


