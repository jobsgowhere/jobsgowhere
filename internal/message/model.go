package message

// SendMessageParams struct
type SendMessageParams struct {
	FromID  string `json:"from"`
	ToID    string `json:"to"`
	Subject string `json:"subject"`
	Body    string `json:"body"`
}
