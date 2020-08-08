package person

import (
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/pkg/web"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

// Controller interface
type Controller interface {
	PostProfile(ginCtx *gin.Context)
	GetProfile(ginCtx *gin.Context)
}

// personController struct
type personController struct {
	service Service
}

// NewController for person repository
func NewController(exec boil.ContextExecutor) Controller {
	repo := &personRepository{executor: exec}
	svc := &personService{repo: repo}
	pc := &personController{service: svc}
	return pc
}

// create talent
func (c *personController) GetProfile(ginCtx *gin.Context) {
	iamID := ginCtx.GetString("iam_id")
	profile, err := c.service.GetProfile(ginCtx.Request.Context(), iamID)

	if err != nil {
		if err.Error() == "profile_not_found" {
			web.RespondError(ginCtx, http.StatusNotFound, ProfileNotFound, "Profile not found for the given iam_id")
			return
		} else {
			log.Println("Error occurred personController::GetProfile" + err.Error())
			web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", "An error occurred in the server, please retry after sometime. err="+err.Error())
			return
		}
	}

	if strings.TrimSpace(profile.ID) == "" {
		web.RespondError(ginCtx, http.StatusNotFound, ProfileNotFound, "Profile not found for the given iam_id")
		return
	}
	web.RespondOK(ginCtx, profile)
}

// create profile
func (c *personController) PostProfile(ginCtx *gin.Context) {
	var createProfile CreateProfileParams
	err := ginCtx.Bind(&createProfile)

	iamID := ginCtx.GetString("iam_id")

	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	if strings.TrimSpace(createProfile.ProfileType) == "" || strings.TrimSpace(createProfile.FirstName) == "" ||
		strings.TrimSpace(createProfile.LastName) == "" || strings.TrimSpace(createProfile.Headline) == "" ||
		strings.TrimSpace(createProfile.CompanyWebsite) == "" || strings.TrimSpace(createProfile.Email) == "" ||
		strings.TrimSpace(createProfile.AvatarURL) == "" {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", "Required parameters are missing")
		return
	}

	person, err := c.service.CreateProfile(ginCtx.Request.Context(), iamID, createProfile)

	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}
	web.RespondOK(ginCtx, person)
}
