package person

import (
	"github.com/volatiletech/sqlboiler/boil"
)

const errSqlNoRows = "sql: no rows in result set"

type Repository interface {
}

type personRepository struct {
	executor boil.ContextExecutor
}
