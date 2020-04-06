package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/jobsgowhere/jobsgowhere/api/models"
	"time"
)

// MockTalentController struct
type MockTalentController struct {
}

// GetJobPosts method
func (c *MockTalentController) GetTalents(ctx *gin.Context) {
	talents := []models.User{}
	talents = append(talents, models.User{
		ID:        "ed5787a5-7298-4c05-8952-99fd531ffbda",
		FirstName: "Subhransu",
		LastName:  "Behera",
		AvatarUrl: "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png",
		CreatedAt: time.Unix(1585374210, 0),
		Headline:  "Web Developer | Full Stack Engineer | Front End Specialist | HTML5, CSS3, Bootstrap, JQuery, PHP",
		Profile: models.UserProfile{
			LinkedIn: "https://www.linkedin.com/in/subhransubehera/",
		},
		IsJobHunting: true,
	})

	ctx.JSON(200, gin.H{
		"talents": talents,
	})
}
