package main

import (
	initializers "github.com/TarinPairor/CVWO-assignment-2024/init"
	model "github.com/TarinPairor/CVWO-assignment-2024/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&model.Post{})
}