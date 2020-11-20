package message

import (
	"bytes"
	"context"
	"html/template"
	"os"

	"github.com/jobsgowhere/jobsgowhere/internal/models"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
	"github.com/volatiletech/sqlboiler/boil"
	"github.com/volatiletech/sqlboiler/v4/queries/qm"
)

// const errSqlNoRows = "sql: no rows in result set"

// Repository - message repository interface
type Repository interface {
	SendMessage(ctx context.Context, toPersonID string, senderIamID string, title string, message string, postTitle string) error
}

type messageRepository struct {
	executor boil.ContextExecutor
}

type EmailContent struct {
	LogoURL          string
	ReceiverImgURL   string
	ReceiverName     string
	ReceiverPosition string
	ReceiverCompany  string
	ReceiverHeadline string
	SenderImgURL     string
	SenderName       string
	SenderEmail      string
	SenderMessage    string
}

func (repo *messageRepository) SendMessage(ctx context.Context, toPersonID string,
	senderIamID string, subject string, body string, postTitle string) error {

	toPerson, err := models.People(
		qm.Load(models.PersonRels.PersonProfiles),
		models.PersonWhere.ID.EQ(toPersonID)).One(ctx, repo.executor)

	if err != nil {
		return err
	}

	sender, err := models.People(
		qm.Load(models.PersonRels.PersonProfiles),
		models.PersonWhere.IamID.EQ(senderIamID)).One(ctx, repo.executor)

	if err != nil {
		return err
	}

	toPersonName := toPerson.FirstName.String + " " + toPerson.LastName.String
	senderName := sender.FirstName.String + " " + sender.LastName.String

	from := mail.NewEmail("JobsHippo", "noreply@jobshippo.com.sg")
	to := mail.NewEmail(toPersonName, toPerson.Email)
	emailSender := mail.NewEmail(senderName, sender.Email)

	emailContent := EmailContent{
		LogoURL:          os.Getenv("LOGO_URL"),
		ReceiverImgURL:   toPerson.AvatarURL.String,
		ReceiverName:     toPersonName,
		ReceiverPosition: toPerson.R.PersonProfiles[0].Headline.String,
		ReceiverCompany:  toPerson.R.PersonProfiles[0].Company.String,
		ReceiverHeadline: postTitle,
		SenderImgURL:     sender.AvatarURL.String,
		SenderName:       senderName,
		SenderEmail:      sender.Email,
		SenderMessage:    body,
	}

	htmlContent, err := template.ParseFiles("./internal/message/send_message.html")
	if err != nil {
		return err
	}
	var htmlContentBuffer bytes.Buffer
	if err := htmlContent.Execute(&htmlContentBuffer, emailContent); err != nil {
		return err
	}

	message := mail.NewSingleEmail(from, subject, to, body, htmlContentBuffer.String())
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	_, err = client.Send(message)

	if err != nil {
		return err
	}

	messageSubject := "Copy of your message to " + toPersonName
	senderMessage := mail.NewSingleEmail(from, messageSubject, emailSender, body, htmlContentBuffer.String())
	_, err = client.Send(senderMessage)

	if err != nil {
		return err
	}

	return nil
}
