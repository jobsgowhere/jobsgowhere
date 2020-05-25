package talent

import "time"

// Talent struct
type Talent struct {
	ID             string    `json:"id"`
	PersonID       string    `json:"person_id"`
	FirstName      string    `json:"first_name"`
	LastName       string    `json:"last_name"`
	AvatarURL      string    `json:"avatar_url"`
	Title          string    `json:"title"`
	Headline       string    `json:"headline,omitempty"`
	CurrentCompany string    `json:"current_company,omitempty"`
	SeekingMode    string    `json:"seeking_mode"`
	CreatedAt      time.Time `json:"created_at"`
	Profile        Profile   `json:"profiles,omitempty"`
}

// Profile struct
type Profile struct {
	LinkedIn string `json:"linkedin"`
}
