package message

// SendMessageParams struct
type SendMessageParams struct {
	ToID      string `json:"to"`
	Subject   string `json:"subject"`
	Body      string `json:"body"`
	PostTitle string `json:"postTitle"`
}
