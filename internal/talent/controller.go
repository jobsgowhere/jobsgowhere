package talent

import (
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/jobsgowhere/jobsgowhere/pkg/util"
	"github.com/jobsgowhere/jobsgowhere/pkg/web"
	"github.com/volatiletech/sqlboiler/v4/boil"

	"github.com/gin-gonic/gin"
)

// Controller interface
type Controller interface {
	GetTalentByID(ginCtx *gin.Context)
	GetTalents(ginCtx *gin.Context)
	SearchTalents(ginCtx *gin.Context)
	PostTalent(ginCtx *gin.Context)
	PutTalentByID(ginCtx *gin.Context)
	DeleteTalentByID(ginCtx *gin.Context)
}

// talentController struct
type talentController struct {
	service Service
}

type TalentParams struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	City        string `json:"city"`
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
	itemsPerPage := 10
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
		talents = make([]Talent, 0)
	}
	web.RespondOK(ginCtx, talents)
}

func (c *talentController) SearchTalents(ginCtx *gin.Context) {
	var searchParams TalentSearch

	if err := ginCtx.Bind(&searchParams); err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	talents, err := c.service.SearchTalents(ginCtx.Request.Context(), searchParams.Text)
	if err != nil {
		log.Println("Error occurred talentController::GetTalents" + err.Error())
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", "An error occurred in the server, please retry after sometime. err="+err.Error())
		return
	}
	if len(talents) == 0 {
		talents = make([]Talent, 0)
	}
	web.RespondOK(ginCtx, talents)
}

// create talent
func (c *talentController) PostTalent(ginCtx *gin.Context) {
	iamID := ginCtx.GetString("iam_id")

	var talentParams TalentParams
	if err := ginCtx.Bind(&talentParams); err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	if !talentParams.valid() {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", "Required parameters are missing")
		return
	}

	talent, err := c.service.CreateTalent(ginCtx.Request.Context(), iamID, talentParams)
	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	web.RespondOK(ginCtx, talent)
}

func (c *talentController) PutTalentByID(ginCtx *gin.Context) {
	iamID := ginCtx.GetString("iam_id")

	id := ginCtx.Param("id")
	if strings.TrimSpace(id) == "" {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", util.GenerateMissingMessage("id"))
		return
	}

	var talentParams TalentParams
	if err := ginCtx.Bind(&talentParams); err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	if !talentParams.valid() {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", "Required parameters are missing")
		return
	}

	talent, err := c.service.UpdateTalentByID(ginCtx.Request.Context(), iamID, id, talentParams)
	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	web.RespondOK(ginCtx, talent)
}

func (c *talentController) DeleteTalentByID(ginCtx *gin.Context) {
	iamID := ginCtx.GetString("iam_id")

	id := ginCtx.Param("id")
	if strings.TrimSpace(id) == "" {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", util.GenerateMissingMessage("id"))
		return
	}

	if err := c.service.DeleteTalentByID(ginCtx.Request.Context(), iamID, id); err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	web.RespondOKWithoutData(ginCtx)
}

func (tp TalentParams) valid() bool {
	if strings.TrimSpace(tp.Title) == "" || strings.TrimSpace(tp.Description) == "" || strings.TrimSpace(tp.City) == "" {
		return false
	}
	return true
}
