package job

import (
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/pkg/util"
	"github.com/jobsgowhere/jobsgowhere/pkg/web"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

type Controller interface {
	GetJobByID(ginCtx *gin.Context)
	GetJobs(ginCtx *gin.Context)
	GetFavouriteJobs(ginCtx *gin.Context)
	PostJob(ginCtx *gin.Context)
	PutJobByID(ginCtx *gin.Context)
}

// jobController struct
type jobController struct {
	service Service
}

// JobParams struct
type JobParams struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	City        string `json:"city"`
}

func NewController(exec boil.ContextExecutor) Controller {
	repo := &jobRepository{executor: exec}
	svc := &jobService{repo: repo}
	jc := &jobController{service: svc}
	return jc
}

func (c *jobController) GetJobByID(ginCtx *gin.Context) {
	id := ginCtx.Param("id")
	if strings.TrimSpace(id) == "" {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", util.GenerateMissingMessage("id"))
		return
	}
	job, err := c.service.GetJobByID(ginCtx.Request.Context(), id)
	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", "An error occurred in the server, please retry after sometime")
		return
	}
	web.RespondOK(ginCtx, job)
}

func (c *jobController) GetJobs(ginCtx *gin.Context) {
	itemsPerPage := 10
	pageNumber, err := strconv.Atoi(ginCtx.Param("pageNumber"))
	if err != nil {
		web.RespondError(ginCtx, http.StatusBadRequest, "invalid_argument_type", "The data type is incorrect for parameter `pageNumber`")
		return
	}

	jobs, err := c.service.GetJobs(ginCtx.Request.Context(), pageNumber, itemsPerPage)
	if err != nil {
		log.Println("Error occurred jobController::GetJobs" + err.Error())
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", "An error occurred in the server, please retry after sometime. err="+err.Error())
		return
	}
	if len(jobs) == 0 {
		jobs = make([]JobPost, 0)
	}
	web.RespondOK(ginCtx, jobs)
}

func (c *jobController) GetFavouriteJobs(ginCtx *gin.Context) {
	iamID := ginCtx.GetString("iam_id")
	jobs, err := c.service.GetFavouriteJobs(ginCtx.Request.Context(), iamID)

	if err != nil {
		log.Println("Error occurred jobController::GetFavouriteJobs" + err.Error())
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", "An error occurred in the server, please retry after sometime. err="+err.Error())
		return
	}
	if len(jobs) == 0 {
		jobs = make([]JobPost, 0)
	}
	web.RespondOK(ginCtx, jobs)
}

// create job
func (c *jobController) PostJob(ginCtx *gin.Context) {
	iamID := ginCtx.GetString("iam_id")

	var jobParams JobParams
	if err := ginCtx.Bind(&jobParams); err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	if !valid_job_params(jobParams) {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", "Required parameters are missing")
		return
	}

	job, err := c.service.CreateJob(ginCtx.Request.Context(), iamID, jobParams)
	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	web.RespondOK(ginCtx, job)
}

func (c *jobController) PutJobByID(ginCtx *gin.Context) {
	iamID := ginCtx.GetString("iam_id")

	id := ginCtx.Param("id")
	if strings.TrimSpace(id) == "" {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", util.GenerateMissingMessage("id"))
		return
	}

	var jobParams JobParams
	if err := ginCtx.Bind(&jobParams); err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	if !valid_job_params(jobParams) {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", "Required parameters are missing")
		return
	}

	job, err := c.service.UpdateJobByID(ginCtx.Request.Context(), iamID, id, jobParams)
	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	web.RespondOK(ginCtx, job)
}

func valid_job_params(jp JobParams) bool {
	if strings.TrimSpace(jp.Title) == "" || strings.TrimSpace(jp.Description) == "" || strings.TrimSpace(jp.City) == "" {
		return false
	}
	return true
}
