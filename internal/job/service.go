package job

import (
	"context"

	"github.com/jobsgowhere/jobsgowhere/internal/models"
)

type HuntingMode int

const (
	Inactive HuntingMode = 0
	Active   HuntingMode = 1
	Open     HuntingMode = 2
)

func (h HuntingMode) String() string {
	switch h {
	case Inactive:
		return "Inactive"
	case Active:
		return "Active"
	case Open:
		return "Open"
	}
	return ""
}

// Service is used to facilitate all otp related activities for any request
type Service interface {
	GetJobByID(ctx context.Context, jobID string) (JobPost, error)
	GetJobs(ctx context.Context, pageNumber int, itemsPerPage int) ([]JobPost, error)
	SearchJobs(ctx context.Context, searchText string) ([]JobPost, error)
	GetFavouriteJobs(ctx context.Context, iamID string) ([]JobPost, error)
	CreateJob(ctx context.Context, iamID string, params JobParams) (JobPost, error)
	UpdateJobByID(ctx context.Context, iamID string, jobID string, params JobParams) (JobPost, error)
	DeleteJobByID(ctx context.Context, iamID string, jobID string) (error)
}

type jobService struct {
	repo Repository
}

func (j *jobService) GetJobs(ctx context.Context, pageNumber int, itemsPerPage int) ([]JobPost, error) {
	jobs, err := j.repo.GetJobs(ctx, pageNumber, itemsPerPage)
	if err != nil {
		return nil, err
	}
	var jobPosts []JobPost
	for _, job := range jobs {
		jobPost := convert(job)
		jobPosts = append(jobPosts, jobPost)
	}
	return jobPosts, nil
}

func (j *jobService) SearchJobs(ctx context.Context, searchText string) ([]JobPost, error) {
	jobs, err := j.repo.SearchJobs(ctx, searchText)
	if err != nil {
		return nil, err
	}
	var jobPosts []JobPost
	for _, job := range jobs {
		jobPost := convert(job)
		jobPosts = append(jobPosts, jobPost)
	}
	return jobPosts, nil
}

func (j *jobService) GetJobByID(ctx context.Context, jobID string) (JobPost, error) {
	job, err := j.repo.GetJobByID(ctx, jobID)
	if err != nil {
		return JobPost{}, err
	}
	jobPost := convert(job)
	return jobPost, nil
}

func (j *jobService) GetFavouriteJobs(ctx context.Context, iamID string) ([]JobPost, error) {
	jobs, err := j.repo.GetFavouriteJobs(ctx, iamID)
	if err != nil {
		return nil, err
	}
	var jobPosts []JobPost
	for _, job := range jobs {
		jobPost := convert(job)
		jobPosts = append(jobPosts, jobPost)
	}
	return jobPosts, nil
}

func (j *jobService) CreateJob(ctx context.Context, iamID string, params JobParams) (JobPost, error) {
	job, err := j.repo.CreateJob(ctx, iamID, params)
	if err != nil {
		return JobPost{}, err
	}
	jobPost := convert(job)
	return jobPost, nil
}

func (j *jobService) UpdateJobByID(ctx context.Context, iamID string, jobID string, params JobParams) (JobPost, error) {
	job, err := j.repo.UpdateJobByID(ctx, iamID, jobID, params)
	if err != nil {
		return JobPost{}, err
	}
	jobPost := convert(job)
	return jobPost, nil
}

func (j *jobService) DeleteJobByID(ctx context.Context, iamID string, jobID string) (error) {
	if err := j.repo.DeleteJobByID(ctx, iamID, jobID); err != nil {
		return err
	}
	return nil
}

func convert(job *models.Job) JobPost {
	return JobPost{
		ID:          job.ID,
		Title:       job.Title,
		Description: job.Description,
		City:        job.Location,
		JobLink:     job.JobLink,
		CreatedAt:   job.CreatedAt,
		CreatedBy: User{
			ID:        job.R.Person.ID,
			FirstName: job.R.Person.FirstName.String,
			LastName:  job.R.Person.LastName.String,
			AvatarUrl: job.R.Person.AvatarURL.String,
			JobTitle:  job.R.Person.R.JobProvider.Title,
			Company:   job.R.Person.R.PersonProfiles[0].Company.String,
			Profile: UserProfile{
				LinkedIn: job.R.Person.R.PersonProfiles[0].ProfileURL,
			},
			HuntingMode: HuntingMode(job.R.Person.R.JobProvider.HuntingMode.Int).String(),
		},
	}
}
