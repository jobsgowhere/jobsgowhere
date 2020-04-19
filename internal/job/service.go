package job

// Service is used to facilitate all otp related activities for any request
type Service interface {
}

type jobService struct {
	repo Repository
}
