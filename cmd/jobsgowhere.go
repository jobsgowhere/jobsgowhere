package cmd

import (
	"database/sql"
	"github.com/jobsgowhere/jobsgowhere/pkg/oauth"

	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/internal/job"
	"github.com/jobsgowhere/jobsgowhere/internal/message"
	"github.com/jobsgowhere/jobsgowhere/internal/talent"
)

var supportedRoutes = []string{"POST", "OPTIONS", "DELETE", "GET", "PUT", "PATCH"}

// ConfigureRoutes - route definitions
func ConfigureRoutes(router *gin.Engine, db *sql.DB) {
	jc := job.NewController(db)
	router.Use(oauth.AuthMiddleware())
	router.GET("/api/jobs/:pageNumber", jc.GetJobs)
	router.GET("/api/jobsbyid/:id", jc.GetJobByID)
	router.GET("/api/favouritejobs/:id", jc.GetFavouriteJobs)
	router.POST("/api/job/", jc.PostJob)

	tc := talent.NewController(db)
	router.GET("/api/talents/:pageNumber", tc.GetTalents)
	router.GET("/api/talentsbyid/:id", tc.GetTalentByID)
	router.POST("/api/talent/", tc.PostTalent)

	mc := message.NewController(db)
	router.POST("/api/sendmessage", mc.SendMessage)

	//
	//router.GET("/api/jobs", jobPostController.GetJobPosts)
	//router.GET("/api/talents", talentController.GetTalents)

}
