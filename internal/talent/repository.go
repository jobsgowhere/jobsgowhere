package talent

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/gofrs/uuid"
	"github.com/jobsgowhere/jobsgowhere/internal/models"
	"github.com/volatiletech/null"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

const errSqlNoRows = "sql: no rows in result set"

// Repository interface for talent
type Repository interface {
	GetTalentByID(ctx context.Context, talentID string) (*models.JobSeeker, error)
	GetTalents(ctx context.Context, pageNumber int, itemsPerPage int) (models.JobSeekerSlice, error)
	CreateTalent(ctx context.Context, iamID string, params TalentParams) (*models.JobSeeker, error)
	UpdateTalentByID(ctx context.Context, iamID string, talentID string, params TalentParams) (*models.JobSeeker, error)
	DeleteTalentByID(ctx context.Context, iamID string, talentID string) error
	SearchTalents(ctx context.Context, searchText string) (models.JobSeekerSlice, error)
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
		qm.Offset((pageNumber-1)*itemsPerPage),
		qm.Limit(itemsPerPage),
		qm.OrderBy(models.JobSeekerColumns.CreatedAt+" DESC")).All(ctx, repo.executor)
}

func (repo *talentRepository) SearchTalents(ctx context.Context, searchText string) (models.JobSeekerSlice, error) {
	var upSearchText = strings.ToUpper(searchText)

	return models.JobSeekers(
		qm.Load(models.JobSeekerRels.Person),
		qm.Load(models.JobSeekerRels.Person+"."+models.PersonRels.PersonProfiles),
		qm.InnerJoin(models.TableNames.Person+" person ON job_seeker.person_id = person.id"),
		qm.Where("UPPER(title) like ? OR UPPER(headline) like ? OR UPPER(person.first_name) like ? OR UPPER(person.last_name) like ?",
			`%`+upSearchText+`%`, `%`+upSearchText+`%`,
			`%`+upSearchText+`%`, `%`+upSearchText+`%`),
		qm.Limit(10),
		qm.OrderBy(models.JobSeekerColumns.CreatedAt+" DESC")).All(ctx, repo.executor)
}

func (repo *talentRepository) CreateTalent(ctx context.Context, iamID string, params TalentParams) (*models.JobSeeker, error) {
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

func (repo *talentRepository) UpdateTalentByID(ctx context.Context, iamID string, talentID string, params TalentParams) (*models.JobSeeker, error) {
	uuid, err := uuid.FromString(talentID)
	if err != nil {
		return nil, err
	}

	talent, err := models.JobSeekers(
		models.JobSeekerWhere.ID.EQ(uuid.String()),
	).One(ctx, repo.executor)
	if err != nil {
		return nil, err
	}

	person, err := models.People(
		models.PersonWhere.IamID.EQ(iamID),
	).One(ctx, repo.executor)
	if err != nil {
		return nil, err
	}

	// check for valid
	if talent.PersonID != person.ID {
		log.Println("ERROR: talent.PersonID does not match person.ID!!")
		return nil, fmt.Errorf("talent.PersonID does not match person.ID!!")
	}

	talent.Title = params.Title
	talent.Headline = null.StringFrom(params.Description)
	talent.City = null.StringFrom(params.City)

	_, err = talent.Update(ctx, repo.executor, boil.Infer())
	if err != nil {
		return nil, err
	}

	talent, err = models.JobSeekers(
		qm.Load(models.JobSeekerRels.Person),
		qm.Load(models.JobSeekerRels.Person+"."+models.PersonRels.PersonProfiles),
		models.JobSeekerWhere.ID.EQ(uuid.String()),
	).One(ctx, repo.executor)
	if err != nil {
		return nil, err
	}

	return talent, nil
}

func (repo *talentRepository) DeleteTalentByID(ctx context.Context, iamID string, talentID string) error {
	uuid, err := uuid.FromString(talentID)
	if err != nil {
		return err
	}

	talent, err := models.JobSeekers(
		models.JobSeekerWhere.ID.EQ(uuid.String()),
	).One(ctx, repo.executor)
	if err != nil {
		return err
	}

	person, err := models.People(
		models.PersonWhere.IamID.EQ(iamID),
	).One(ctx, repo.executor)
	if err != nil {
		return err
	}

	// check for valid
	if talent.PersonID != person.ID {
		log.Println("ERROR: talent.PersonID does not match person.ID!!")
		return fmt.Errorf("talent.PersonID does not match person.ID!!")
	}

	_, err = talent.Delete(ctx, repo.executor)
	if err != nil {
		return err
	}

	return nil
}
