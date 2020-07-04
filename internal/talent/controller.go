package talent

import (
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/jobsgowhere/jobsgowhere/pkg/util"
	"github.com/jobsgowhere/jobsgowhere/pkg/web"
	"github.com/volatiletech/sqlboiler/boil"

	"github.com/gin-gonic/gin"
)

// Controller interface
type Controller interface {
	GetTalentByID(ginCtx *gin.Context)
	GetTalents(ginCtx *gin.Context)
	PostTalent(ginCtx *gin.Context)
}

// talentController struct
type talentController struct {
	service Service
}

// CreateTalentParams struct
type CreateTalentParams struct {
	Title          string `json:"title"`
	Description    string `json:"description"`
	CurrentCompany string `json:"current_company"`
	City           string `json:"city"`
}

// NewController for talent repository
func NewController(exec boil.ContextExecutor) Controller {
	repo := &talentRepository{executor: exec}
	svc := &talentService{repo: repo}
	jc := &talentController{service: svc}
	return jc
}

// get talent by ID
func (c *talentController) GetTalentByID(ginCtx *gin.Context) {
	id := ginCtx.Param("id")
	if strings.TrimSpace(id) == "" {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", util.GenerateMissingMessage("id"))
		return
	}
	talent, err := c.service.GetTalentByID(ginCtx.Request.Context(), id)
	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}
	web.RespondOK(ginCtx, talent)
}

// get talents
func (c *talentController) GetTalents(ginCtx *gin.Context) {
	itemsPerPage := 20
	pageNumber, err := strconv.Atoi(ginCtx.Param("pageNumber"))
	if err != nil {
		web.RespondError(ginCtx, http.StatusBadRequest, "invalid_argument_type", "The data type is incorrect for parameter `pageNumber`")
		return
	}

	talents, err := c.service.GetTalents(ginCtx.Request.Context(), pageNumber, itemsPerPage)
	if err != nil {
		log.Println("Error occurred talentController::GetTalents" + err.Error())
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", "An error occurred in the server, please retry after sometime. err="+err.Error())
		return
	}
	if len(talents) == 0 {
		// todo log that len(talents) == 0
	}
	web.RespondOK(ginCtx, talents)
}

// create talent
func (c *talentController) PostTalent(ginCtx *gin.Context) {
	iamID := ginCtx.GetString("iam_id")

	var createTalent CreateTalentParams
	err := ginCtx.Bind(&createTalent)

	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	if strings.TrimSpace(createTalent.Title) == "" || strings.TrimSpace(createTalent.Description) == "" ||
		strings.TrimSpace(createTalent.City) == "" {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", "Required parameters are missing")
		return
	}

	talent, err := c.service.CreateTalent(ginCtx.Request.Context(), iamID, createTalent)

	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}
	web.RespondOK(ginCtx, talent)
}
