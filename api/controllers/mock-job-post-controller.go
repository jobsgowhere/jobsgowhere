package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/api/models"
	"time"
)

// MockJobPostController struct
type MockJobPostController struct {
}

// GetJobPosts method
func (c *MockJobPostController) GetJobPosts(ctx *gin.Context) {
	jobPosts := []models.JobPost{}
	jobPosts = append(jobPosts, models.JobPost{
		ID:          "bd2d7358-2cbe-4353-b5a7-d6a21c6572a1",
		Title:       "Seeking experienced Singaporean react /nodejs specialist for a social networking project",
		Description: "Building an exciting project using react and nodejs.\n\nYou will be planning the architecture and also coding out scalable social networking site with us.\n\nThis project revolves around rebuilding an existing community base on a PHP forum software.\n\nUsing next.js for SSR and much of its features, together we will explore how to build a site with real time chat, social posting (stream feeds).\n\nIt would be a micro service project so if you are versed in api, you will be highly prioritised. As for more details please drop me an email at macseah@gmail.com or contact me here.",
		City:        "Singapore",
		CreatedAt:   time.Unix(1578614400, 0),
		CreatedBy: models.User{
			ID:           "bc731175-25eb-4583-b972-699c87d271e0",
			FirstName:    "Mac",
			LastName:     "Seah",
			AvatarUrl:    "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png",
			JobTitle:     "Senior Recruiter",
			Company:      "ABC",
			CreatedAt:    time.Unix(1578614400, 0),
			IsJobHunting: false,
		},
	})
	jobPosts = append(jobPosts, models.JobPost{
		ID:          "9b36534b-f878-44c2-a2af-22b593abe6a5",
		Title:       "Front End Developer - React",
		Description: "We are looking for developers to join fully funded startup team developing a new exciting App. If you want to work in a small highly skilled team leveraging the latest technologies incl. React, React Native, Apollo and GraphQL, please apply here: https://tinyurl.com/Doldyn.",
		City:        "Singapore",
		CreatedAt:   time.Unix(1566432000, 0),
		CreatedBy: models.User{
			ID:           "3f173f73-e8de-4a3c-b888-fc2daba44892",
			FirstName:    "Alhay",
			LastName:     "DD",
			AvatarUrl:    "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png",
			JobTitle:     "Team Lead",
			Company:      "Delorean",
			CreatedAt:    time.Unix(1566432000, 0),
			IsJobHunting: false,
		},
	})

	ctx.JSON(200, gin.H{
		"jobs": jobPosts,
	})
}
