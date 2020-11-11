package message

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/pkg/web"
	"github.com/volatiletech/sqlboiler/v4/boil"
)

// Controller - message controller interface
type Controller interface {
	SendMessage(ginCtx *gin.Context)
}

// messageController struct
type messageController struct {
	service Service
}

// NewController - message controller
func NewController(exec boil.ContextExecutor) Controller {
	repo := &messageRepository{executor: exec}
	svc := &messageService{repo: repo}
	mc := &messageController{service: svc}
	return mc
}

func (c *messageController) SendMessage(ginCtx *gin.Context) {
	iamID := ginCtx.GetString("iam_id")
	var sendMessageParams SendMessageParams
	err := ginCtx.Bind(&sendMessageParams)

	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	if strings.TrimSpace(sendMessageParams.ToID) == "" || strings.TrimSpace(sendMessageParams.Subject) == "" ||
		strings.TrimSpace(sendMessageParams.Body) == "" || strings.TrimSpace(sendMessageParams.PostTitle) == "" {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", "Required parameters are missing")
		return
	}

	err = c.service.SendMessage(ginCtx.Request.Context(), sendMessageParams.ToID,
		iamID, sendMessageParams.Subject, sendMessageParams.Body, sendMessageParams.PostTitle)

	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	web.RespondOKWithoutData(ginCtx)
}
