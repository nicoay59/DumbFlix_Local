package userdto

type UserResponse struct {
	ID        int    `json:"id"`
	Email string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
	Name string `json:"name" form:"name"`
	Gender string `json:"gender" form:"gender"`
	Phone string `json:"phone" form:"phone"`
	Address string `json:"address" form:"address"`
	Role string `json:"role" form:"role"`
	Subs string	`json:"subs" form:"subs"`
}