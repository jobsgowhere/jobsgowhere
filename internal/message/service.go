package message

import "context"

// Service - message service interface
type Service interface {
	SendMessage(ctx context.Context, toPersonID string,
		senderIamID string, subject string, body string, postTitle string) error
}

type messageService struct {
	repo Repository
}

func (m *messageService) SendMessage(ctx context.Context, toPersonID string,
	senderIamID string, subject string, body string, postTitle string) error {

	err := m.repo.SendMessage(ctx, toPersonID, senderIamID, subject, body, postTitle)

	if err != nil {
		return err
	}

	return nil
}
