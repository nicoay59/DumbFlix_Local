package models

import "time"

type Transaction struct {
	ID        int             `json:"id"`
	Status    string          `json:"status" gorm:"varchar(255)"`
	Total     int             `json:"total"`
	UserID    int             `json:"user_id"`
	User      UserResponse    `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	StartTime time.Time       `json:"start"`
	Duration  time.Time       `json:"duration"`
	Subs      bool            `json:"subs"`
	ProductID int             `json:"product_id"`
	Product   ProductResponse `json:"product" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type TransactionResponse struct {
	ID       int       `json:"id"`
	Status   string    `json:"status"`
	UserID   int       `json:"user_id"`
	Subs     bool      `json:"subs"`
	Duration time.Time `json:"duration"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
