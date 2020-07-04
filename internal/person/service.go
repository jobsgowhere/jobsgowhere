package person

import (
	"context"

	"github.com/jobsgowhere/jobsgowhere/internal/models"
)

// Service is used to facilitate all otp related activities for any request
type Service interface {
	GetProfile(ctx context.Context, iamID string) (Person, error)
	CreateProfile(ctx context.Context, iamID string, params CreateProfileParams) (Person, error)
}

// person service struct
type personService struct {
	repo Repository
}

func (p *personService) GetProfile(ctx context.Context, iamID string) (Person, error) {
	var person Person
	personProfile, err := p.repo.GetProfile(ctx, iamID)
	if err != nil {
		return Person{}, err
	}
	if personProfile != nil {
		person = convert(personProfile)
	}
	return person, nil
}

func (p *personService) CreateProfile(ctx context.Context, iamID string, params CreateProfileParams) (Person, error) {
	person, err := p.repo.CreateProfile(ctx, iamID, params)
	if err != nil {
		return Person{}, err
	}
	personObj := convert(person)
	return personObj, nil
}

func convert(profile *models.PersonProfile) Person {
	return Person{
		ID:             profile.PersonID,
		FirstName:      profile.R.Person.FirstName.String,
		LastName:       profile.R.Person.LastName.String,
		AvatarURL:      profile.R.Person.AvatarURL.String,
		CurrentCompany: profile.R.Person.CurrentCompany.String,
		Profile: Profile{
			LinkedIn: profile.ProfileURL,
		},
	}
}
