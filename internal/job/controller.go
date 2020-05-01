package job

import (
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/pkg/util"
	"github.com/jobsgowhere/jobsgowhere/pkg/web"
	"github.com/volatiletech/sqlboiler/boil"
)

type Controller interface {
	GetJobByID(ginCtx *gin.Context)
	GetJobs(ginCtx *gin.Context)
}

// jobController struct
type jobController struct {
	service Service
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
	itemsPerPage := 20
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
		// todo log that len(jobs) == 0
	}
	web.RespondOK(ginCtx, jobs)
}
