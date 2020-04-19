package job

import (
	"context"
	"github.com/jobsgowhere/jobsgowhere/internal/models"
	"github.com/volatiletech/sqlboiler/boil"
	"github.com/volatiletech/sqlboiler/queries/qm"
)

const errSqlNoRows = "sql: no rows in result set"

type Repository interface {
	GetJobByID(ctx context.Context, jobID string) (*models.Job, error)
	GetJobs(ctx context.Context, pageNumber int, itemsPerPage int) (models.JobSlice, error)
}

type jobRepository struct {
	executor boil.ContextExecutor
}

func (repo *jobRepository) GetJobByID(ctx context.Context, jobID string) (*models.Job, error) {
	job, err := models.Jobs(
		models.JobWhere.ID.EQ(jobID)).One(ctx, repo.executor)
	if err != nil {
		if err.Error() == errSqlNoRows {
			return nil, nil
		}
		return nil, err
	}
	return job, nil
}

func (repo *jobRepository) GetJobs(ctx context.Context, pageNumber int, itemsPerPage int) (models.JobSlice, error) {
	return models.Jobs(
		qm.OrderBy(models.JobColumns.CreatedAt+" DESC"),
		qm.Offset(pageNumber*itemsPerPage),
		qm.Limit(itemsPerPage)).All(ctx, repo.executor)
}
