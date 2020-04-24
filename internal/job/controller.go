package job

import (
	"errors"
	"fmt"
	"github.com/jobsgowhere/jobsgowhere/internal/models"
	"github.com/jobsgowhere/jobsgowhere/pkg/web"
	"github.com/volatiletech/sqlboiler/boil"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

type Controller interface {
	GetJobByID(ginCtx *gin.Context)
	GetJobs(ginCtx *gin.Context)
}

// jobController struct
type jobController struct {
	repository Repository // job.Repository
}

func NewController(exec boil.ContextExecutor) Controller {
	jc := &jobController{repository: &jobRepository{executor: exec}}
	return jc
}

func (c *jobController) GetJobByID(ginCtx *gin.Context) {
	panic("implement me")
}

func (c *jobController) GetJobs(ginCtx *gin.Context) {
	itemsPerPage := 20

	pageNumber, err := strconv.Atoi(ginCtx.Param("pageNumber"))
	if err != nil {
		web.RespondError(ginCtx, http.StatusBadRequest, "invalid_argument_type", "The data type is incorrect for parameter pageNumber")
		return
	}

	jobs, err := c.repository.GetJobs(ginCtx.Request.Context(), pageNumber, itemsPerPage)
	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", "An error occurred in the server, please retry after sometime")
		return
	}

	if len(jobs) == 0 {
		web.RespondOK(ginCtx, nil)
		return
	}
	
}

// Init method
func (c *jobController) New(exec boil.ContextExecutor) {
	c.repository = &jobRepository{executor: exec}
}

// CreateTask method
func (c *jobController) CreateTask(ctx *gin.Context) {
	var task models.Task
	ctx.BindJSON(&task)
	if task.Title == "" {
		ctx.JSON(400, gin.H{
			"error": "title should not be empty",
		})
		return
	}
	useridi, exists := ctx.Get("userid")
	if !exists {
		ctx.JSON(400, gin.H{
			"error": "userid not found in request context",
		})
		return
	}
	userid := useridi.(string)
	task.UserID = userid
	if task.Due.IsZero() {
		task.Due = time.Now().UTC()
	}

	createdTask, err := c.taskRepository.CreateTask(task)
	if err != nil {
		log.Printf("Error: %v\n", err)
		ctx.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(201, gin.H{
		"task": createdTask,
	})
}

// GetTasks method
func (c *jobController) GetJobs2(ctx *gin.Context) {
	var tasks []JobPost
	var err error
	query := ctx.Request.URL.Query()
	pendings := query["pending"]
	froms := query["from"]
	tos := query["to"]

	useridi, exists := ctx.Get("userid")
	if !exists {
		ctx.JSON(400, gin.H{
			"error": "userid not found in request context",
		})
		return
	}
	userid := useridi.(string)

	if len(pendings) > 0 {
		log.Printf("invoking GetPendingTasks for user %s\n", userid)
		tasks, err = c.taskRepository.GetPendingTasks(userid)
	} else if len(froms) > 0 && len(tos) > 0 {
		from := froms[0]
		to := tos[0]
		log.Printf("invoking GetTasksByDateRange for user=%s with from=%s, to=%s\n", userid, from, to)
		tasks, err = c.taskRepository.GetTasksByDateRange(userid, from, to)
	} else {
		errorMessage := "Invalid query parameters. Either pending or from/to should be provided"
		log.Println(errorMessage)
		err = errors.New(errorMessage)
	}

	if err != nil {
		ctx.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"tasks": tasks,
	})
}

// GetTaskByID method
func (c *jobController) GetTaskByID(ctx *gin.Context) {
	idstr := ctx.Param("id")
	id, err := strconv.ParseInt(idstr, 10, 64)
	if err != nil {
		ctx.JSON(400, gin.H{
			"message": fmt.Sprintf("%s is not a valid number", idstr),
		})
		return
	}

	useridi, exists := ctx.Get("userid")
	if !exists {
		ctx.JSON(400, gin.H{
			"error": "userid not found in request context",
		})
		return
	}
	userid := useridi.(string)

	task, err := c.taskRepository.GetTaskByID(userid, id)
	if err != nil {
		ctx.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"task": task,
	})
}

// UpdateTaskForID method
func (c *jobController) UpdateTaskForID(ctx *gin.Context) {
	idstr := ctx.Param("id")
	id, err := strconv.ParseInt(idstr, 10, 64)
	if err != nil {
		ctx.JSON(400, gin.H{
			"message": fmt.Sprintf("%s is not a valid number", idstr),
		})
		return
	}

	useridi, exists := ctx.Get("userid")
	if !exists {
		ctx.JSON(400, gin.H{
			"error": "userid not found in request context",
		})
		return
	}
	userid := useridi.(string)

	existingTask, err := c.taskRepository.GetTaskByID(userid, id)
	if err != nil {
		ctx.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}

	ctx.BindJSON(&existingTask)
	err = c.taskRepository.UpdateTask(userid, id, existingTask)
	if err != nil {
		ctx.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"message": fmt.Sprintf("%d updated", id),
	})
}

// DeleteTaskForID method
func (c *jobController) DeleteTaskForID(ctx *gin.Context) {
	idstr := ctx.Param("id")
	id, err := strconv.ParseInt(idstr, 10, 64)
	if err != nil {
		ctx.JSON(400, gin.H{
			"message": fmt.Sprintf("%s is not a valid number", idstr),
		})
		return
	}

	useridi, exists := ctx.Get("userid")
	if !exists {
		ctx.JSON(400, gin.H{
			"error": "userid not found in request context",
		})
		return
	}
	userid := useridi.(string)

	err = c.taskRepository.DeleteTask(userid, id)
	if err != nil {
		ctx.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"message": fmt.Sprintf("%d deleted", id),
	})
}
