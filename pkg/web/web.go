package web

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"time"
)

func RespondError(ginCtx *gin.Context, httpCode int, errorCode, errorDescription string) {
	ginCtx.JSON(httpCode, gin.H{
		"error":             errorCode,
		"error_description": errorDescription,
	})
	ginCtx.AbortWithStatus(httpCode)
}

func RespondOK(ginCtx *gin.Context, data interface{}) {
	// TODO: Handle data == nil condition
	bytes, err := json.Marshal(data)
	if err != nil {
		err := ginCtx.AbortWithError(http.StatusInternalServerError, err)
		if err != nil {
			LogError("cannot abort with error %s", err.Error())
		}
		return
	}
	ginCtx.Header("Content-Type", "application/json; charset=utf-8")
	ginCtx.Status(http.StatusOK)
	ginCtx.Writer.Write(bytes)
}

func LogError(message string, args ...string) {
	date := time.Now().Format(time.StampMilli)
	var tmpArgs []string
	//tmpArgs := make([]string, 0)

	tmpArgs = append(tmpArgs, date)
	tmpArgs = append(tmpArgs, "[ERR]")
	tmpArgs = append(tmpArgs, args...)

	log.Printf(message, message, tmpArgs)
}
