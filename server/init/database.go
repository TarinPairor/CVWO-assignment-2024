package initializers

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)
  

var DB *gorm.DB

func ConnectToDB() {

	var err error
	// Update the values in the DSN to match your database configuration
	dsn := "host=tuffi.db.elephantsql.com user=yaudahpd password=o8BXH9DwavcVLgvGJoKVHi4iMQg4KrUc dbname=yaudahpd port=5432 sslmode=disable TimeZone=Asia/Shanghai"
  	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
		print(DB)
	}
}
