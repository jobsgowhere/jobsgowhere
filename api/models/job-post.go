package models

import "time"

// JobPost struct
type JobPost struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	City        string    `json:"city"`
	CreatedAt   time.Time `json:"created_at"`
	CreatedBy   User      `json:"created_by"`
}
