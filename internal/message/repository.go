package message

import (
	"context"
	"os"

	"github.com/jobsgowhere/jobsgowhere/internal/models"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/volatiletech/sqlboiler/boil"
)

// const errSqlNoRows = "sql: no rows in result set"

// Repository - message repository interface
type Repository interface {
	SendMessage(ctx context.Context, toPersonID string, senderIamID string, title string, message string) error
}

type messageRepository struct {
	executor boil.ContextExecutor
}

func (repo *messageRepository) SendMessage(ctx context.Context, toPersonID string,
	senderIamID string, subject string, body string) error {

	toPerson, err := models.People(
		models.PersonWhere.ID.EQ(toPersonID)).One(ctx, repo.executor)

	if err != nil {
		return err
	}

	sender, err := models.People(
		models.PersonWhere.IamID.EQ(senderIamID)).One(ctx, repo.executor)

	if err != nil {
		return err
	}

	toPersonName := toPerson.FirstName.String + " " + toPerson.LastName.String
	senderName := sender.FirstName.String + " " + sender.LastName.String

	from := mail.NewEmail("JobsGoWhere Message", "no-reply@jobsgowhere.com")
	to := mail.NewEmail(toPersonName, toPerson.Email)

	plainTextContent := senderName + "has sent a message" + body
	htmlContent := "<strong>" + senderName + "</strong> has sent a message, <br>" + body

	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	_, err = client.Send(message)

	if err != nil {
		return err
	}

	return nil
}
