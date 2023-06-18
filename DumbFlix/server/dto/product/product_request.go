package productdto

import "time"

type CreateProductRequest struct {
	Duration time.Duration `json:"duration" validate:"required"`
	Price  int  `json:"price" validate:"required"`
}

type UpdateProductRequest struct {
	Duration time.Duration `json:"duration"`
	Price  int  `json:"price"`
}
