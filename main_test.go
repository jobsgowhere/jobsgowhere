package main

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/api/controllers"
	"github.com/realistschuckle/testify/assert"
)

// This function is used for setup before executing the test functions
func TestMain(m *testing.M) {
	//Set Gin to Test Mode
	gin.SetMode(gin.TestMode)

	// Run the other tests
	os.Exit(m.Run())
}

// Helper function to create a router during testing
func getRouter(withDist bool) *gin.Engine {
	r := gin.Default()
	if withDist {
		r.LoadHTMLGlob("ui/dist/*.html")
		r.Static("/static", "./ui/dist/static")
	}
	return r
}

// Helper function to perform a request and serve the path
func performRequest(r http.Handler, method, path string) *httptest.ResponseRecorder {
	req, _ := http.NewRequest(method, path, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	return w
}

func TestHomePage(t *testing.T) {
	r := getRouter(true)
	r.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", gin.H{})
	})

	w := performRequest(r, "GET", "/")
	assert.Equal(t, http.StatusOK, w.Code)
}

func TestGetJobPosts(t *testing.T) {
	jobPostController := controllers.MockJobPostController{}

	r := getRouter(true)
	r.GET("/api/jobs", jobPostController.GetJobPosts)

	w := performRequest(r, "GET", "/api/jobs")
	assert.Equal(t, http.StatusOK, w.Code)
}
