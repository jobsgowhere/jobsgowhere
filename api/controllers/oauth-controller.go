package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/linkedin"

	"github.com/gin-gonic/gin"
)

type OAuthController struct {
}

var (
	state        = "linkedin_random_csrf_string" // TODO needs more secure implementation
	clientID     = os.Getenv("linkedin_client_id")
	clientSecret = os.Getenv("linkedin_client_secret")
	redirectURL  = fmt.Sprintf("%s/oauth/linkedin_callback", os.Getenv("linkedin_oauth_callback_host"))
)

func (c *OAuthController) GetLinkedInAuthorizationUrl(ctx *gin.Context) {
	ctx.JSON(200, gin.H{
		"url": getConfig().AuthCodeURL(state),
	})
}

func (c *OAuthController) OAuthCallback(ctx *gin.Context) {
	query := ctx.Request.URL.Query()
	codes := query["code"]
	states := query["state"]
	token, err := getConfig().Exchange(oauth2.NoContext, codes[0])
	if err != nil {
		ctx.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	client := getConfig().Client(oauth2.NoContext, token)
	profile, err := getProfile(client, token.AccessToken)
	if err != nil {
		ctx.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}
	emailResponse, err := getEmail(client, token.AccessToken)
	if err != nil {
		ctx.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"code":        codes[0],
		"state":       states[0],
		"token":       token,
		"profile":     profile,
		"first_name":  profile.FirstName.Localized["en_US"],
		"last_name":   profile.LastName.Localized["en_US"],
		"linkedin_id": profile.ID,
		"email":       emailResponse.Elements[0].HandleValue.EmailAddress,
	})
}

func getConfig() *oauth2.Config {
	return &oauth2.Config{
		ClientID:     clientID,
		ClientSecret: clientSecret,
		RedirectURL:  redirectURL,
		Scopes:       []string{"r_emailaddress", "r_liteprofile"},
		Endpoint:     linkedin.Endpoint,
	}
}

func getProfile(client *http.Client, accessToken string) (LiteProfile, error) {
	req, err := http.NewRequest("GET", "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,email,profilePicture(displayImage~:playableStreams))", nil)
	if err != nil {
		return LiteProfile{}, err
	}
	req.Header.Set("Bearer", accessToken)
	response, err := client.Do(req)
	if err != nil {
		return LiteProfile{}, err
	}

	defer response.Body.Close()
	str, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return LiteProfile{}, err
	}

	var profile LiteProfile

	err = json.Unmarshal(str, &profile)
	if err != nil {
		return LiteProfile{}, err
	}

	return profile, nil
}

func getEmail(client *http.Client, accessToken string) (LinkedInEmailResponse, error) {
	req, err := http.NewRequest("GET", "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))", nil)
	if err != nil {
		return LinkedInEmailResponse{}, err
	}
	req.Header.Set("Bearer", accessToken)
	response, err := client.Do(req)
	if err != nil {
		return LinkedInEmailResponse{}, err
	}

	defer response.Body.Close()
	str, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return LinkedInEmailResponse{}, err
	}

	var email LinkedInEmailResponse
	err = json.Unmarshal(str, &email)
	return email, err
}

type MultiLocaleStringPreferredLocale struct {
	Country  string `json:"country"`
	Language string `json:"language"`
}

type MultiLocaleString struct {
	Localized       map[string]string                `json:"localized"`
	PreferredLocale MultiLocaleStringPreferredLocale `json:"preferredLocale"`
}

type LiteProfile struct {
	ID        string            `json:"id"`
	FirstName MultiLocaleString `json:"firstName"`
	LastName  MultiLocaleString `json:"lastName"`
}

type LinkedInEmailResponseElementHandleValue struct {
	EmailAddress string `json:"emailAddress"`
}

type LinkedInEmailResponseElement struct {
	HandleValue LinkedInEmailResponseElementHandleValue `json:"handle~"`
	Handle      string                                  `json:"handle"`
}

type LinkedInEmailResponse struct {
	Elements []LinkedInEmailResponseElement `json:"elements"`
}
