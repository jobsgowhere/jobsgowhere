package talent

import (
	"context"
	"database/sql"
)

type Repository interface {
}

type talentRepository struct {
	ctx      context.Context
	executor sql.DB
}
