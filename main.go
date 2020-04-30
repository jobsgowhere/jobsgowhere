package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/api/controllers"
	"github.com/jobsgowhere/jobsgowhere/cmd"
	"github.com/jobsgowhere/jobsgowhere/api/util"
	_ "github.com/joho/godotenv/autoload"
	_ "github.com/lib/pq"
	
	"log"
	"net/http"
	"os"
)

func main() {
	//gin.SetMode(gin.ReleaseMode)
	router := gin.Default()

	jobPostController := controllers.MockJobPostController{}
	talentController := controllers.MockTalentController{}
	oauthController := controllers.OAuthController{}

	db, err := util.GetDB()
	if err != nil {
		log.Panic(err)
	}
	defer db.Close()

	router.Use(func(ctx *gin.Context) {
		if !util.Contains([]string{"POST", "PUT", "PATCH"}, ctx.Request.Method) {
			return
		}

		if ctx.Request.Header["Content-Length"][0] == "0" {
			ctx.JSON(http.StatusBadRequest, gin.H{"message": "Payload should not be empty"})
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}

		if len(ctx.Request.Header["Content-Type"]) == 0 ||
			!util.Contains(ctx.Request.Header["Content-Type"], "application/json") {
			ctx.JSON(http.StatusUnsupportedMediaType, gin.H{"message": "Content type should be application/json"})
			ctx.AbortWithStatus(http.StatusUnsupportedMediaType)
			return
		}
	})

	router.LoadHTMLGlob("ui-dist/*.html")
	router.Static("/static", "./ui-dist/static")
	router.GET("/", func(ctx *gin.Context) {
		//ctx.HTML(http.StatusOK, "index.html", dataToUIPage)
		ctx.HTML(http.StatusOK, "index.html", gin.H{})
	})

	router.GET("/api/jobs", jobPostController.GetJobPosts)
	router.GET("/api/talents", talentController.GetTalents)
	router.GET("/api/oauth/linkedin_url", oauthController.GetLinkedInAuthorizationUrl)
	router.GET("/oauth/linkedin_callback", oauthController.OAuthCallback)

	cmd.ConfigureRoutes(router, db)

	router.NoRoute(func(ctx *gin.Context) {
		//ctx.HTML(http.StatusOK, "index.html", dataToUIPage)
		ctx.HTML(http.StatusOK, "index.html", gin.H{})
	})

	log.Printf("linkedin_client_id=%s\n", os.Getenv("LINKEDIN_CLIENT_ID"))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}
	router.Run(":" + port)
}
