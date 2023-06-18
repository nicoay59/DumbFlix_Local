package productdto


import "time"


type ProductResponse struct{
	ID int `json:"id"`
	Duration time.Duration `json:"duration"`
	Price  int  `json:"price"`
}