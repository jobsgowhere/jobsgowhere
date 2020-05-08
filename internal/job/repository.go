package job

import (
	"context"

	"github.com/gofrs/uuid"
	"github.com/jobsgowhere/jobsgowhere/internal/models"
	"github.com/volatiletech/sqlboiler/boil"
	"github.com/volatiletech/sqlboiler/queries/qm"
)

const errSqlNoRows = "sql: no rows in result set"

type Repository interface {
	GetJobByID(ctx context.Context, jobID string) (*models.Job, error)
	GetJobs(ctx context.Context, pageNumber int, itemsPerPage int) (models.JobSlice, error)
	GetFavouriteJobs(ctx context.Context, personID string) (models.JobSlice, error)
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
		qm.OrderBy(models.JobColumns.CreatedAt+" DESC")).All(ctx, repo.executor)

	//todo: Offset and Limit is not working
}

func (repo *jobRepository) GetFavouriteJobs(ctx context.Context, personID string) (models.JobSlice, error) {
	uuid, err := uuid.FromString(personID)

	if err != nil {
		return nil, err
	}

	jobFavs, err := models.JobSeekerFavs(
		models.JobSeekerFavWhere.PersonID.EQ(uuid.String())).All(ctx, repo.executor)

	if err != nil {
		if err.Error() == errSqlNoRows {
			return nil, err
		}
		return nil, err
	}

	var jobs models.JobSlice
	for _, favoriteJob := range jobFavs {
		job, err := models.Jobs(
			qm.Load(models.JobRels.Person),
			qm.Load(models.JobRels.Person+"."+models.PersonRels.JobProvider),
			qm.Load(models.JobRels.Person+"."+models.PersonRels.PersonProfiles),
			models.JobWhere.ID.EQ(favoriteJob.JobID)).One(ctx, repo.executor)

		if err != nil {
			if err.Error() == errSqlNoRows {
				return nil, err
			}
			return nil, err
		}

		jobs = append(jobs, job)
	}

	return jobs, nil
}
