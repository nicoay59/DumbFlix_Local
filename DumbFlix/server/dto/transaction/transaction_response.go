package transactiondto


import "server/models"


type TransactionResponse struct {
	ID int `json:"id"`
	Total  int             `json:"total" form:"total"`
	Status string          `json:"status" form:"status"`
	UserID int             `json:"user_id"`
	User   models.UserResponse `json:"user"`
}


