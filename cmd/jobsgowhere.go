package cmd

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/internal/job"
)

var supportedRoutes = []string{"POST", "OPTIONS", "DELETE", "GET", "PUT", "PATCH"}

func ConfigureRoutes(router *gin.Engine, db *sql.DB) {
	jc := job.NewController(db)
	router.GET("/api/jobs/:pageNumber", jc.GetJobs)
	//
	//router.GET("/api/jobs", jobPostController.GetJobPosts)
	//router.GET("/api/talents", talentController.GetTalents)

}
