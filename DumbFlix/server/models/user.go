package models

type User struct {
	ID            int                   `json:"id"`
	Email         string                `json:"email" gorm:"varchar(255)"`
	Password      string                `json:"password" gorm:"varchar(255)"`
	Name          string                `json:"name" gorm:"varchar(255)"`
	Gender        string                `json:"gender" gorm:"varchar(255)"`
	Phone         string                `json:"phone" gorm:"varchar(255)"`
	Address       string                `json:"address" gorm:"varchar(255)"`
	Role          string                `json:"role" gorm:"varchar(255)"`
	Subs          bool                  `json:"subs"`
	TransactionID int                   `json:"transaction_id"`
	Transaction   []TransactionResponse `json:"transaction" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type UserResponse struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Gender   string `json:"gender"`
	Phone    int    `json:"phone"`
	Address  string `json:"address"`
	Role     string `json:"role"`
	Subs     string `json:"subs"`
	// TransactionID int `json:"transaction_id"`
}

func (UserResponse) TableName() string {
	return "users"
}
