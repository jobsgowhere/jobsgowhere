package message

// SendMessageParams struct
type SendMessageParams struct {
	FromID  string `json:"from"`
	ToID    string `json:"to"`
	Title   string `json:"title"`
	Subject string `json:"subject"`
}
