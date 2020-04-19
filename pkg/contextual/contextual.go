package contextual

import "context"

// Contextual is an indicator that the object should not be used as singleton
type Contextual interface {
	Context() context.Context
}
