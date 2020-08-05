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
	var personObj Person
	person, err := p.repo.GetProfile(ctx, iamID)
	if err != nil {
		return Person{}, err
	}

	personObj = convert(person)

	return personObj, nil
}

func (p *personService) CreateProfile(ctx context.Context, iamID string, params CreateProfileParams) (Person, error) {
	person, err := p.repo.CreateProfile(ctx, iamID, params)
	if err != nil {
		return Person{}, err
	}
	personObj := convert(person)
	return personObj, nil
}

func convert(person *models.Person) Person {
	if person.R.JobProvider != nil {
		return Person{
			ID:             person.ID,
			FirstName:      person.FirstName.String,
			LastName:       person.LastName.String,
			AvatarURL:      person.AvatarURL.String,
			Email:          person.Email,
			Company:        person.CurrentCompany.String,
			Headline:       person.R.JobProvider.Title,
			CompanyWebsite: person.R.JobProvider.WebsiteURL.String,
			ProfileType:    Recruiter.String(),
			Profile: Profile{
				LinkedIn: person.R.PersonProfiles[0].ProfileURL,
			},
		}
	} else {
		return Person{
			ID:             person.ID,
			FirstName:      person.FirstName.String,
			LastName:       person.LastName.String,
			AvatarURL:      person.AvatarURL.String,
			Email:          person.Email,
			Company:        person.CurrentCompany.String,
			Headline:       "",
			CompanyWebsite: "",
			ProfileType:    Seeker.String(),
			Profile: Profile{
				LinkedIn: person.R.PersonProfiles[0].ProfileURL,
			},
		}
	}
}
