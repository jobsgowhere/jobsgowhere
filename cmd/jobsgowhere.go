package cmd

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/internal/job"
	"github.com/jobsgowhere/jobsgowhere/internal/message"
	"github.com/jobsgowhere/jobsgowhere/internal/person"
	"github.com/jobsgowhere/jobsgowhere/internal/talent"
	"github.com/jobsgowhere/jobsgowhere/pkg/oauth"
)

var supportedRoutes = []string{"POST", "OPTIONS", "DELETE", "GET", "PUT", "PATCH"}

// ConfigureRoutes - route definitions
func ConfigureRoutes(router *gin.Engine, db *sql.DB) {
	api := router.Group("/api")
	jc := job.NewController(db)
	api.Use(oauth.AuthMiddleware())
	api.GET("/jobs/:pageNumber", jc.GetJobs)
	api.GET("/jobsbyid/:id", jc.GetJobByID)
	api.GET("/favouritejobs/:id", jc.GetFavouriteJobs)
	api.POST("/job/", jc.PostJob)

	tc := talent.NewController(db)
	api.GET("/talents/:pageNumber", tc.GetTalents)
	api.GET("/talentsbyid/:id", tc.GetTalentByID)
	api.POST("/talent/", tc.PostTalent)

	mc := message.NewController(db)
	api.POST("/sendmessage", mc.SendMessage)

	pc := person.NewController(db)
	api.POST("/profile", pc.PostProfile)
	api.GET("/profile", pc.GetProfile)
}
