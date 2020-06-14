package person

// CreateProfileParams struct
type CreateProfileParams struct {
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	Headline       string `json:"headline"`
	Company        string `json:"company"`
	CompanyWebsite string `json:"website"`
	Email          string `json:"email"`
	ProfileType    string `json:"profile_type"`
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

type ProfileType string

const (
	Recruiter ProfileType = "Recruiter"
	Seeker    ProfileType = "Seeker"
)

func (h ProfileType) String() string {
	switch h {
	case Recruiter:
		return "Recruiter"
	case Seeker:
		return "Seeker"
	}
	return ""
}
