package filmdto

import "server/models"

type FilmResponse struct {
	ID int `json:"id"`
	Category models.Category `json:"category"`
	Title    string   `json:"title" form:"title"`
	Year     int      `json:"year" form:"year"`
	Desc     string   `json:"desc" form:"desc"`
	TitleEps string   `json:"titleps" form:"titleps"`
	Thumb    string   `json:"thumb" form:"thumb"`
	Link     string   `json:"link" form:"link"`
}