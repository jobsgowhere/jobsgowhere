package talent

import (
	"context"

	"github.com/jobsgowhere/jobsgowhere/internal/models"
)

type SeekingMode int

const (
	Inactive SeekingMode = 0
	Active   SeekingMode = 1
)

func (h SeekingMode) String() string {
	switch h {
	case Inactive:
		return "Inactive"
	case Active:
		return "Active"
	}
	return ""
}

// Service is used to facilitate all otp related activities for any request
type Service interface {
	GetTalentByID(ctx context.Context, talentID string) (Talent, error)
	GetTalents(ctx context.Context, pageNumber int, itemsPerPage int) ([]Talent, error)
	CreateTalent(ctx context.Context, params CreateTalentParams) (Talent, error)
}

// talent service struct
type talentService struct {
	repo Repository
}

func (j *talentService) GetTalents(ctx context.Context, pageNumber int, itemsPerPage int) ([]Talent, error) {
	talents, err := j.repo.GetTalents(ctx, pageNumber, itemsPerPage)
	if err != nil {
		return nil, err
	}
	var talentObjs []Talent
	for _, talent := range talents {
		talentObj := convert(talent)
		talentObjs = append(talentObjs, talentObj)
	}
	return talentObjs, nil
}

func (j *talentService) GetTalentByID(ctx context.Context, talentID string) (Talent, error) {
	talent, err := j.repo.GetTalentByID(ctx, talentID)
	if err != nil {
		return Talent{}, err
	}
	talentObj := convert(talent)
	return talentObj, nil
}

func (j *talentService) CreateTalent(ctx context.Context, params CreateTalentParams) (Talent, error) {
	talent, err := j.repo.CreateTalent(ctx, params)
	if err != nil {
		return Talent{}, err
	}
	talentObj := convert(talent)
	return talentObj, nil
}

func convert(talent *models.JobSeeker) Talent {
	return Talent{
		ID:             talent.ID,
		PersonID:       talent.PersonID,
		Title:          talent.Title,
		FirstName:      talent.R.Person.FirstName.String,
		LastName:       talent.R.Person.LastName.String,
		AvatarURL:      talent.R.Person.AvatarURL.String,
		Headline:       talent.Headline.String,
		CurrentCompany: talent.R.Person.CurrentCompany.String,
		SeekingMode:    SeekingMode(talent.SeekingMode.Int).String(),
		CreatedAt:      talent.CreatedAt,
		Profile: Profile{
			LinkedIn: talent.R.Person.R.PersonProfiles[0].ProfileURL,
		},
	}
}
