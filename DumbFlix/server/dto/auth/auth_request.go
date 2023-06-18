package authdto

type AuthRequest struct {
	Name string `json:"name" gorm:"varchar(255)"`
	Email string `json:"email" gorm:"varchar(255)"`
	Password string `json:"password" gorm:"varchar(255)"`
	Phone    string `json:"phone" validate:"required"`
	Address  string `json:"address" validate:"required"`
	Role  string `json:"role"`
	Gender string `json:"gender" validate:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" validate:"required"`
	Password string `json:"password" validate:"required"`
}