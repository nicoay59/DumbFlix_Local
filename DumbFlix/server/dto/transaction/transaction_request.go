package transactiondto

import (
	"server/models"
	"time"
)

type CreateTransactionRequest struct {
	Total     int                 `json:"total" form:"total" validate:"required"`
	StartTime time.Time           `json:"start"`
	Duration  time.Duration       `json:"duration"`
	Subs      bool                `json:"subs"`
	Status    string              `json:"status" form:"status" validate:"required"`
	UserID    int                 `json:"user_id"`
	User      models.UserResponse `json:"user"`
}

type UpdateTransactionRequest struct {
	Total  int                 `json:"total" form:"total"`
	Status string              `json:"status" form:"status"`
	UserID int                 `json:"user_id"`
	User   models.UserResponse `json:"user"`
}
