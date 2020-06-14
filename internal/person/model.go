package person

// CreateProfileParams struct
type CreateProfileParams struct {
	// PersonID       string `json:"person_id"`
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	Title          string `json:"title"`
	Company        string `json:"company"`
	CompanyWebsite string `json:"website"`
	Email          string `json:"email"`
}

// Person struct
type Person struct {
	ID             string  `json:"id"`
	FirstName      string  `json:"first_name"`
	LastName       string  `json:"last_name"`
	AvatarURL      string  `json:"avatar_url"`
	CurrentCompany string  `json:"current_company,omitempty"`
	Profile        Profile `json:"profiles,omitempty"`
}

// Profile struct
type Profile struct {
	LinkedIn string `json:"linkedin"`
}

// ProfileNotFound Error Code
const ProfileNotFound = "profile_not_found"
