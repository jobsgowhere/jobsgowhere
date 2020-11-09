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
	CreateTalent(ctx context.Context, iamID string, params TalentParams) (Talent, error)
	UpdateTalentByID(ctx context.Context, iamID string, talentID string, params TalentParams) (Talent, error)
	DeleteTalentByID(ctx context.Context, iamID string, talentID string) error
	SearchTalents(ctx context.Context, searchText string) ([]Talent, error)
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

func (j *talentService) SearchTalents(ctx context.Context, searchText string) ([]Talent, error) {
	talents, err := j.repo.SearchTalents(ctx, searchText)
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

func (j *talentService) CreateTalent(ctx context.Context, iamID string, params TalentParams) (Talent, error) {
	talent, err := j.repo.CreateTalent(ctx, iamID, params)
	if err != nil {
		return Talent{}, err
	}
	talentObj := convert(talent)
	return talentObj, nil
}

func (j *talentService) UpdateTalentByID(ctx context.Context, iamID string, talentID string, params TalentParams) (Talent, error) {
	talent, err := j.repo.UpdateTalentByID(ctx, iamID, talentID, params)
	if err != nil {
		return Talent{}, err
	}
	talentObj := convert(talent)
	return talentObj, nil
}

func (j *talentService) DeleteTalentByID(ctx context.Context, iamID string, talentID string) error {
	if err := j.repo.DeleteTalentByID(ctx, iamID, talentID); err != nil {
		return err
	}
	return nil
}

func convert(talent *models.JobSeeker) Talent {
	return Talent{
		ID:          talent.ID,
		Title:       talent.Title,
		Description: talent.Headline.String,
		City:        talent.City.String,
		CreatedAt:   talent.CreatedAt,
		CreatedBy: User{
			ID:        talent.R.Person.ID,
			FirstName: talent.R.Person.FirstName.String,
			LastName:  talent.R.Person.LastName.String,
			AvatarUrl: talent.R.Person.AvatarURL.String,
			JobTitle:  talent.Title,
			Company:   talent.R.Person.R.PersonProfiles[0].Company.String,
			Profile: UserProfile{
				LinkedIn: talent.R.Person.R.PersonProfiles[0].ProfileURL,
			},
			SeekingMode: SeekingMode(talent.SeekingMode.Int).String(),
		},
	}
}
