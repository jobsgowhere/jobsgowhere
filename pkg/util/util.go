package util

import (
	"fmt"
	"strings"
)

func GenerateMissingMessage(args ...string) string {
	allArgs := strings.Join(args, ",")
	return fmt.Sprintf("The value is missing for parameter(s) %s", allArgs)
}
