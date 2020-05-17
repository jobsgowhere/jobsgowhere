package message

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/pkg/web"
	"github.com/volatiletech/sqlboiler/boil"
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
	var sendMessageParams SendMessageParams
	err := ginCtx.Bind(&sendMessageParams)

	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	if strings.TrimSpace(sendMessageParams.FromID) == "" || strings.TrimSpace(sendMessageParams.ToID) == "" ||
		strings.TrimSpace(sendMessageParams.Subject) == "" || strings.TrimSpace(sendMessageParams.Body) == "" {
		web.RespondError(ginCtx, http.StatusBadRequest, "not_enough_arguments", "Required parameters are missing")
		return
	}

	err = c.service.SendMessage(ginCtx.Request.Context(), sendMessageParams.ToID,
		sendMessageParams.FromID, sendMessageParams.Subject, sendMessageParams.Body)

	if err != nil {
		web.RespondError(ginCtx, http.StatusInternalServerError, "internal_error", err.Error())
		return
	}

	web.RespondOKWithoutData(ginCtx)
}
