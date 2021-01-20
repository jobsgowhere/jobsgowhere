package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/api/controllers"
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

	if status := w.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	body, _ := ioutil.ReadAll(w.Body)
	pageContent := string(body)

	titleStartIndex := strings.Index(pageContent, "<title>")
	if titleStartIndex == -1 {
		fmt.Println("No title element found")
		os.Exit(0)
	}

	titleStartIndex += 7

	// Find the index of the closing tag
	titleEndIndex := strings.Index(pageContent, "</title>")
	if titleEndIndex == -1 {
		fmt.Println("No closing tag for title found.")
		os.Exit(0)
	}

	pageTitle := []byte(pageContent[titleStartIndex:titleEndIndex])

	// Print out the result
	fmt.Printf("Page title: %s\n", pageTitle)
}

func TestGetJobPosts(t *testing.T) {
	jobPostController := controllers.MockJobPostController{}

	r := getRouter(true)
	r.GET("/api/jobs", jobPostController.GetJobPosts)

	w := performRequest(r, "GET", "/api/jobs")

	if status := w.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}

func TestGetTalentPost(t *testing.T) {
	talentController := controllers.MockTalentController{}

	r := getRouter(true)
	r.GET("/api/talents", talentController.GetTalents)

	w := performRequest(r, "GET", "/api/talents")

	if status := w.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
}
