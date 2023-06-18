package filmdto

import "server/models"

type CreateFilmRequest struct {
	CategoryID int             `json:"category_id" `
	Category   models.Category `json:"category" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" `
	Title      string          `json:"title" gorm:"varchar(255)" validate:"required"`
	Year       int             `json:"year" validate:"required"`
	Desc       string          `json:"desc" gorm:"varchar(255)" validate:"required"`
	TitleEps   string          `json:"titleps" gorm:"varchar(255)" validate:"required"`
	Thumb      string          `json:"thumb" gorm:"varchar(255)" validate:"required"`
	Link       string          `json:"link" gorm:"varchar(255)"`
}

type UpdateFilmRequest struct {
	CategoryID int             `json:"category_id"`
	Category   models.Category `json:"category" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Title      string          `json:"title" gorm:"varchar(255)"`
	Year       int             `json:"year"`
	Desc       string          `json:"desc" gorm:"varchar(255)"`
	TitleEps   string          `json:"titleps" gorm:"varchar(255)"`
	Thumb      string          `json:"thumb" gorm:"varchar(255)"`
	Link       string          `json:"link" gorm:"varchar(255)"`
}
