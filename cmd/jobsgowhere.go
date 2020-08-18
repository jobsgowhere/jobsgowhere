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
	apiWithAuth := router.Group("/api")
	jc := job.NewController(db)
	apiWithAuth.Use(oauth.AuthMiddleware())

	api.GET("/jobs/:pageNumber", jc.GetJobs)
	api.GET("/jobsbyid/:id", jc.GetJobByID)
	apiWithAuth.GET("/favouritejobs/", jc.GetFavouriteJobs)
	apiWithAuth.POST("/job/", jc.PostJob)
	apiWithAuth.PUT("/jobsbyid/:id", jc.PutJobByID)

	tc := talent.NewController(db)
	api.GET("/talents/:pageNumber", tc.GetTalents)
	api.GET("/talentsbyid/:id", tc.GetTalentByID)
	apiWithAuth.POST("/talent/", tc.PostTalent)

	mc := message.NewController(db)
	apiWithAuth.POST("/sendmessage", mc.SendMessage)

	pc := person.NewController(db)
	apiWithAuth.POST("/profile", pc.PostProfile)
	apiWithAuth.GET("/profile", pc.GetProfile)
}
