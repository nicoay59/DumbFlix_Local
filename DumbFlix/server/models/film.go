package models

type Film struct {
	ID         int      `json:"id"`
	CategoryID int      `json:"category_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Category   Category `json:"category" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Title      string   `json:"title" gorm:"varchar(255)"`
	Year       int      `json:"year"`
	Desc       string   `json:"desc" gorm:"varchar(255)"`
	TitleEps   string   `json:"titleps" gorm:"varchar(255)"`
	Thumb      string   `json:"image" gorm:"varchar(255)"`
	Link       string   `json:"link" gorm:"varchar(255)"`
}

type FilmResponse struct {
	Category string `json:"category" gorm:"varchar(255)"`
	Title    string `json:"title" gorm:"varchar(255)"`
	Year     int    `json:"year"`
	Desc     string `json:"desc" gorm:"varchar(255)"`
	TitleEps string `json:"titleps" gorm:"varchar(255)"`
	Thumb    string `json:"image" gorm:"varchar(255)"`
	Link     string `json:"link" gorm:"varchar(255)"`
}
