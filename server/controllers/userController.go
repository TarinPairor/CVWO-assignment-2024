package controllers

import (
	"net/http"
	"time"

	"github.com/TarinPairor/CVWO-assignment-2024/initializers"
	"github.com/TarinPairor/CVWO-assignment-2024/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

var db *gorm.DB

func init() {
	db = initializers.ConnectToDB()
}

func Signup(c *gin.Context) {
	//Get email/password off req body
	var body struct {
		Email string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	//Hash password (default 10)
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	//Create the user
	user := models.User{
		Email:    body.Email,
		PassWord: string(hash),
	}
	result := db.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
		return
	}

	//Respond
	c.JSON(http.StatusOK, gin.H{
		"user": user,
	  })
}

func Login(c *gin.Context) {
	//Get email/password off req body
	var body struct {
		Email string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	//Look up register user
	var user models.User
	db.First(&user, "email = ?", body.Email)
	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	//Compare sent in pass with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.PassWord), []byte(body.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	//gen jwt token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	//Sign in and get the complete encoded token as a string 
	tokenString, err := token.SignedString([]byte("abc"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})
		return
	}

	//send back 
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600 * 24 * 30, "", "", false, true)

	//Respond
	c.JSON(http.StatusOK, gin.H{
	  })
}

func Validate(c *gin.Context) {

	user, _ := c.Get("user")

	//user.(models.User).

	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}