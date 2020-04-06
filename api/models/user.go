package models

import "time"

// User struct
type User struct {
	ID           string      `json:"id"`
	FirstName    string      `json:"first_name"`
	LastName     string      `json:"last_name"`
	AvatarUrl    string      `json:"avatar_url"`
	JobTitle     string      `json:"job_title,omitempty"`
	Company      string      `json:"company,omitempty"`
	CreatedAt    time.Time   `json:"-"`
	Headline     string      `json:"headline,omitempty"`
	Profile      UserProfile `json:"profiles,omitempty"`
	IsJobHunting bool        `json:"-"`
}

type UserProfile struct {
	LinkedIn string `json:"linkedin"`
}
