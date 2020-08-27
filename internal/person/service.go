package person

import (
	"context"

	"github.com/jobsgowhere/jobsgowhere/internal/models"
)

// Service is used to facilitate all otp related activities for any request
type Service interface {
	GetProfile(ctx context.Context, iamID string) (Person, error)
	CreateProfile(ctx context.Context, iamID string, params ProfileParams) (Person, error)
	EditProfile(ctx context.Context, iamID string, params ProfileParams) (Person, error)
}

// person service struct
type personService struct {
	repo Repository
}

func (p *personService) GetProfile(ctx context.Context, iamID string) (Person, error) {
	var personObj Person
	person, err := p.repo.GetProfile(ctx, iamID)
	if err != nil {
		return Person{}, err
	}

	personObj = convert(person)

	return personObj, nil
}

func (p *personService) CreateProfile(ctx context.Context, iamID string, params ProfileParams) (Person, error) {
	person, err := p.repo.CreateProfile(ctx, iamID, params)
	if err != nil {
		return Person{}, err
	}
	personObj := convert(person)
	return personObj, nil
}

func (p *personService) EditProfile(ctx context.Context, iamID string, params ProfileParams) (Person, error) {
	person, err := p.repo.EditProfile(ctx, iamID, params)
	if err != nil {
		return Person{}, err
	}
	personObj := convert(person)
	return personObj, nil
}

func convert(person *models.Person) Person {
	// if incomplete profile is found
	if len(person.R.PersonProfiles) == 0 {
		return Person{
			ID:             person.ID,
			FirstName:      person.FirstName.String,
			LastName:       person.LastName.String,
			AvatarURL:      person.AvatarURL.String,
			Email:          person.Email,
			Company:        "",
			Headline:       "",
			CompanyWebsite: "",
			ProfileType:    "",
			Profile: Profile{
				LinkedIn: "",
			},
			Status: Incomplete.String(),
		}
	}

	// return incomplete profile
	if person.R.PersonProfiles[0].Headline.String == "" &&
		person.R.PersonProfiles[0].Website.String == "" {
		return Person{
			ID:             person.ID,
			FirstName:      person.FirstName.String,
			LastName:       person.LastName.String,
			AvatarURL:      person.AvatarURL.String,
			Email:          person.Email,
			Company:        "",
			Headline:       "",
			CompanyWebsite: "",
			ProfileType:    "",
			Profile: Profile{
				LinkedIn: person.R.PersonProfiles[0].ProfileURL,
			},
			Status: Incomplete.String(),
		}
	}

	// return seeker / recruiter profile
	return Person{
		ID:             person.ID,
		FirstName:      person.FirstName.String,
		LastName:       person.LastName.String,
		AvatarURL:      person.AvatarURL.String,
		Email:          person.Email,
		Company:        person.R.PersonProfiles[0].Company.String,
		Headline:       person.R.PersonProfiles[0].Headline.String,
		CompanyWebsite: person.R.PersonProfiles[0].Website.String,
		ProfileType:    person.R.PersonProfiles[0].ProfileType.String,
		Profile: Profile{
			LinkedIn: person.R.PersonProfiles[0].ProfileURL,
		},
		Status: Complete.String(),
	}
}
