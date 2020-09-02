package job

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/gofrs/uuid"
	"github.com/jobsgowhere/jobsgowhere/internal/models"
	"github.com/volatiletech/sqlboiler/v4/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

const errSqlNoRows = "sql: no rows in result set"

type Repository interface {
	GetJobByID(ctx context.Context, jobID string) (*models.Job, error)
	GetJobs(ctx context.Context, pageNumber int, itemsPerPage int) (models.JobSlice, error)
	SearchJobs(ctx context.Context, searchText string) (models.JobSlice, error)
	GetFavouriteJobs(ctx context.Context, iamID string) (models.JobSlice, error)
	CreateJob(ctx context.Context, iamID string, params JobParams) (*models.Job, error)
	UpdateJobByID(ctx context.Context, iamID string, jobID string, params JobParams) (*models.Job, error)
	DeleteJobByID(ctx context.Context, iamID string, jobID string) (error)
}

type jobRepository struct {
	executor boil.ContextExecutor
}

func (repo *jobRepository) GetJobByID(ctx context.Context, jobID string) (*models.Job, error) {

	uuid, err := uuid.FromString(jobID)

	if err != nil {
		return nil, err
	}

	job, err := models.Jobs(
		qm.Load(models.JobRels.Person),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.JobProvider),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.PersonProfiles),
		models.JobWhere.ID.EQ(uuid.String())).One(ctx, repo.executor)
	if err != nil {
		if err.Error() == errSqlNoRows {
			return nil, err
		}
		return nil, err
	}
	return job, nil
}

func (repo *jobRepository) GetJobs(ctx context.Context, pageNumber int, itemsPerPage int) (models.JobSlice, error) {
	return models.Jobs(
		qm.Load(models.JobRels.Person),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.JobProvider),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.PersonProfiles),
		qm.Offset((pageNumber-1)*itemsPerPage),
		qm.Limit(itemsPerPage),
		qm.OrderBy(models.JobColumns.CreatedAt+" DESC")).All(ctx, repo.executor)
}

func (repo *jobRepository) SearchJobs(ctx context.Context, searchText string) (models.JobSlice, error) {
	var upSearchText = strings.ToUpper(searchText)

	return models.Jobs(
		qm.Load(models.JobRels.Person),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.JobProvider),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.PersonProfiles),
		qm.InnerJoin(models.TableNames.PersonProfile+" pp ON job.person_id = pp.person_id"),
		qm.Where("UPPER(title) like ? OR UPPER(description) like ? OR UPPER(pp.company) like ?",
			`%`+upSearchText+`%`, `%`+upSearchText+`%`, `%`+upSearchText+`%`),
		qm.Limit(10),
		qm.OrderBy(models.JobColumns.CreatedAt+" DESC")).All(ctx, repo.executor)
}

func (repo *jobRepository) GetFavouriteJobs(ctx context.Context, iamID string) (models.JobSlice, error) {
	person, err := models.People(
		models.PersonWhere.IamID.EQ(iamID)).One(ctx, repo.executor)

	if err != nil {
		return nil, err
	}

	jobs, err := models.Jobs(
		qm.Load(models.JobRels.Person),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.JobProvider),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.PersonProfiles),
		qm.InnerJoin(models.TableNames.JobSeekerFav+" jsf ON job.id = jsf.job_id"),
		qm.Where("jsf.person_id = ?", person.ID),
	).All(ctx, repo.executor)

	if err != nil {
		if err.Error() == errSqlNoRows {
			return nil, err
		}
		return nil, err
	}
	return jobs, nil
}

func (repo *jobRepository) CreateJob(ctx context.Context, iamID string, params JobParams) (*models.Job, error) {
	u1, err := uuid.NewV4()

	if err != nil {
		return nil, err
	}

	person, err := models.People(
		models.PersonWhere.IamID.EQ(iamID)).One(ctx, repo.executor)

	if err != nil {
		return nil, err
	}

	var jobPost models.Job
	jobPost.Title = params.Title
	jobPost.Description = params.Description
	jobPost.Location = params.City
	jobPost.ID = u1.String()
	jobPost.Status = 1 // default to active
	jobPost.PersonID = person.ID

	err = jobPost.Insert(ctx, repo.executor, boil.Infer())

	if err != nil {
		return nil, err
	}

	job, err := models.Jobs(
		qm.Load(models.JobRels.Person),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.JobProvider),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.PersonProfiles),
		models.JobWhere.ID.EQ(u1.String())).One(ctx, repo.executor)

	if err != nil {
		return nil, err
	}

	return job, nil
}

func (repo *jobRepository) UpdateJobByID(ctx context.Context, iamID string, jobID string, params JobParams) (*models.Job, error) {
	uuid, err := uuid.FromString(jobID)
	if err != nil {
		return nil, err
	}

	job, err := models.Jobs(
		models.JobWhere.ID.EQ(uuid.String()),
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

	if job.PersonID != person.ID {
		log.Println("ERROR: job.PersonID does not match person.ID!!")
		return nil, fmt.Errorf("job.PersonID does not match person.ID!!")
	}

	job.Title = params.Title
	job.Description = params.Description
	job.Location = params.City

	_, err = job.Update(ctx, repo.executor, boil.Infer())
	if err != nil {
		return nil, err
	}

	job, err = models.Jobs(
		qm.Load(models.JobRels.Person),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.JobProvider),
		qm.Load(models.JobRels.Person+"."+models.PersonRels.PersonProfiles),
		models.JobWhere.ID.EQ(uuid.String()),
	).One(ctx, repo.executor)
	if err != nil {
		return nil, err
	}

	return job, nil
}

func (repo *jobRepository) DeleteJobByID(ctx context.Context, iamID string, jobID string) (error) {
	uuid, err := uuid.FromString(jobID)
	if err != nil {
		return err
	}

	job, err := models.Jobs(
		models.JobWhere.ID.EQ(uuid.String()),
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

	if job.PersonID != person.ID {
		log.Println("ERROR: job.PersonID does not match person.ID!!")
		return fmt.Errorf("job.PersonID does not match person.ID!!")
	}

	_, err = job.Delete(ctx, repo.executor)
	if err != nil {
		return err
	}

	return nil
}
