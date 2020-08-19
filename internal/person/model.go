package person

// ProfileParams struct
type ProfileParams struct {
	FirstName      string `json:"first_name"`
	LastName       string `json:"last_name"`
	Headline       string `json:"headline"`
	Company        string `json:"company"`
	CompanyWebsite string `json:"website"`
	AvatarURL      string `json:"avatar_url"`
	Email          string `json:"email"`
	ProfileType    string `json:"profile_type"`
}

// Person struct
type Person struct {
	ID             string  `json:"id"`
	FirstName      string  `json:"first_name"`
	LastName       string  `json:"last_name"`
	Headline       string  `json:"headline"`
	Company        string  `json:"company"`
	CompanyWebsite string  `json:"website"`
	AvatarURL      string  `json:"avatar_url"`
	Email          string  `json:"email"`
	ProfileType    string  `json:"profile_type"`
	Profile        Profile `json:"profiles,omitempty"`
	Status         string  `json:"status"`
}

// Profile struct
type Profile struct {
	LinkedIn string `json:"linkedin"`
}

// ProfileNotFound Error Code
const ProfileNotFound = "profile_not_found"

// ProfileType enum
type ProfileType string

// ProfileType enum constants
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

// ProfileStatus enum
type ProfileStatus string

// ProfileStatus enum constants
const (
	Complete   ProfileStatus = "Complete"
	Incomplete ProfileStatus = "Incomplete"
)

func (h ProfileStatus) String() string {
	switch h {
	case Complete:
		return "Complete"
	case Incomplete:
		return "Incomplete"
	}
	return ""
}
