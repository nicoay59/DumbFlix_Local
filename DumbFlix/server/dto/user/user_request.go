package userdto

type CreateUserRequest struct {
	Email    string `json:"email" gorm:"varchar(255)" validate:"required"`
	Password string `json:"password" gorm:"varchar(255)" validate:"required"`
	Name     string `json:"name" gorm:"varchar(255)" validate:"required"`
	Gender   string `json:"gender" gorm:"varchar(255)" validate:"required"`
	Phone    string `json:"phone" gorm:"varchar(255)" validate:"required"`
	Address  string `json:"address" gorm:"varchar(255)" validate:"required"`
	Role     string `json:"role" gorm:"varchar(255)"`
	Subs     bool   `json:"subs" `
}

type UpdateUserRequest struct {
	Email    string `json:"email" gorm:"varchar(255)"`
	Password string `json:"password" gorm:"varchar(255)"`
	Name     string `json:"name" gorm:"varchar(255)"`
	Gender   string `json:"gender" gorm:"varchar(255)"`
	Phone    string `json:"phone" gorm:"varchar(255)"`
	Address  string `json:"address" gorm:"varchar(255)"`
	Role     string `json:"role" gorm:"varchar(255)"`
	Subs     bool   `json:"subs"`
}
