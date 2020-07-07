package talent

import (
	"context"

	"github.com/gofrs/uuid"
	"github.com/jobsgowhere/jobsgowhere/internal/models"
	"github.com/volatiletech/null"
	"github.com/volatiletech/sqlboiler/boil"
	"github.com/volatiletech/sqlboiler/queries/qm"
)

const errSqlNoRows = "sql: no rows in result set"

// Repository interface for talent
type Repository interface {
	GetTalentByID(ctx context.Context, talentID string) (*models.JobSeeker, error)
	GetTalents(ctx context.Context, pageNumber int, itemsPerPage int) (models.JobSeekerSlice, error)
	CreateTalent(ctx context.Context, iamID string, params CreateTalentParams) (*models.JobSeeker, error)
}

// talentRepository struct
type talentRepository struct {
	executor boil.ContextExecutor
}

func (repo *talentRepository) GetTalentByID(ctx context.Context, talentID string) (*models.JobSeeker, error) {
	uuid, err := uuid.FromString(talentID)

	if err != nil {
		return nil, err
	}

	talent, err := models.JobSeekers(
		qm.Load(models.JobSeekerRels.Person),
		qm.Load(models.JobSeekerRels.Person+"."+models.PersonRels.PersonProfiles),
		models.JobSeekerWhere.ID.EQ(uuid.String())).One(ctx, repo.executor)

	if err != nil {
		if err.Error() == errSqlNoRows {
			return nil, nil
		}
		return nil, err
	}

	return talent, nil
}

func (repo *talentRepository) GetTalents(ctx context.Context, pageNumber int, itemsPerPage int) (models.JobSeekerSlice, error) {

	return models.JobSeekers(
		qm.Load(models.JobSeekerRels.Person),
		qm.Load(models.JobSeekerRels.Person+"."+models.PersonRels.PersonProfiles),
		qm.OrderBy(models.JobSeekerColumns.CreatedAt+" DESC")).All(ctx, repo.executor)
}

func (repo *talentRepository) CreateTalent(ctx context.Context, iamID string, params CreateTalentParams) (*models.JobSeeker, error) {
	u1, err := uuid.NewV4()

	if err != nil {
		return nil, err
	}

	person, err := models.People(
		models.PersonWhere.IamID.EQ(iamID)).One(ctx, repo.executor)

	if err != nil {
		return nil, err
	}

	var jobSeeker models.JobSeeker
	jobSeeker.ID = u1.String()
	jobSeeker.Title = params.Title
	jobSeeker.Headline = null.StringFrom(params.Description)
	jobSeeker.City = null.StringFrom(params.City)
	jobSeeker.SeekingMode = null.IntFrom(1) // default to active
	jobSeeker.PersonID = person.ID

	err = jobSeeker.Insert(ctx, repo.executor, boil.Infer())

	if err != nil {
		return nil, err
	}

	talent, err := models.JobSeekers(
		qm.Load(models.JobSeekerRels.Person),
		qm.Load(models.JobSeekerRels.Person+"."+models.PersonRels.PersonProfiles),
		models.JobSeekerWhere.ID.EQ(u1.String())).One(ctx, repo.executor)

	if err != nil {
		return nil, err
	}

	return talent, nil
}
