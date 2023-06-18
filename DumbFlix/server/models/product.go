package models

import "time"

type Product struct {
	ID            int         `json:"id"`
	Duration      time.Duration `json:"duration"`
	Price  int          `json:"price"`
}

type ProductResponse struct{
	Duration      time.Duration `json:"duration"`
	Price  int          `json:"price"`
	TransactionID  int `json:"transaction_id"`
}


func (ProductResponse) TableName() string {
	return "products"
}