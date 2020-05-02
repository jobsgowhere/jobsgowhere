package talent

import (
	"context"

	"github.com/gofrs/uuid"
	"github.com/jobsgowhere/jobsgowhere/internal/models"
	"github.com/volatiletech/sqlboiler/boil"
	"github.com/volatiletech/sqlboiler/queries/qm"
)

const errSqlNoRows = "sql: no rows in result set"

// Repository interface for talent
type Repository interface {
	GetTalentByID(ctx context.Context, personID string) (*models.JobSeeker, error)
	GetTalents(ctx context.Context, pageNumber int, itemsPerPage int) (models.JobSeekerSlice, error)
}

// talentRepository struct
type talentRepository struct {
	executor boil.ContextExecutor
}

func (repo *talentRepository) GetTalentByID(ctx context.Context, personID string) (*models.JobSeeker, error) {
	uuid, err := uuid.FromString(personID)

	if err != nil {
		return nil, err
	}

	talent, err := models.JobSeekers(
		qm.Load(models.JobSeekerRels.Person),
		qm.Load(models.JobSeekerRels.Person+"."+models.PersonRels.PersonProfiles),
		models.JobSeekerWhere.PersonID.EQ(uuid.String())).One(ctx, repo.executor)

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
