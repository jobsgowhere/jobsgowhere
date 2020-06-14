package person

import (
	"context"
	"database/sql"
	"errors"

	"github.com/gofrs/uuid"
	"github.com/jobsgowhere/jobsgowhere/internal/models"
	"github.com/volatiletech/sqlboiler/boil"
	"github.com/volatiletech/sqlboiler/queries/qm"
)

const errSqlNoRows = "sql: no rows in result set"

// Repository interface for person
type Repository interface {
	GetProfile(ctx context.Context, iamID string) (*models.PersonProfile, error)
	CreateProfile(ctx context.Context, params CreateProfileParams) (*models.PersonProfile, error)
}

// personRepository struct
type personRepository struct {
	executor boil.ContextExecutor
}

func (repo *personRepository) GetProfile(ctx context.Context, iamID string) (*models.PersonProfile, error) {
	person, err := models.People(
		qm.Load(models.PersonRels.PersonProfiles),
		models.PersonWhere.IamID.EQ(iamID)).One(ctx, repo.executor)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	if len(person.R.PersonProfiles) == 0 {
		return nil, errors.New("profile not found")
	}

	personProfile := person.R.PersonProfiles[0]
	return personProfile, err
}

func (repo *personRepository) CreateProfile(ctx context.Context, params CreateProfileParams) (*models.PersonProfile, error) {
	u1, err := uuid.NewV4()

	if err != nil {
		return nil, err
	}

	u2, err := uuid.FromString(params.PersonID)

	if err != nil {
		return nil, err
	}

	personExists, err := models.PersonExists(ctx, repo.executor, u2.String())

	if err != nil && personExists == false {
		if err.Error() == errSqlNoRows {
			return nil, nil
		}
		return nil, err
	}

	var personProfile models.PersonProfile
	personProfile.ID = u1.String()
	personProfile.PersonID = u2.String()

	err = personProfile.Insert(ctx, repo.executor, boil.Infer())

	if err != nil {
		return nil, err
	}

	profile, err := models.PersonProfiles(
		qm.Load(models.PersonProfileRels.Person),
		models.PersonProfileWhere.ID.EQ(u1.String())).One(ctx, repo.executor)

	if err != nil {
		return nil, err
	}

	return profile, nil
}
