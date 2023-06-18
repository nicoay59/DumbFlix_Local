package episodedto

import "server/models"



type EpisodeResponse struct {
	Title    string      `json:"title" form:"title"`
	Thumb    string      `json:"thumb" form:"thumb"`
	Year     int         `json:"year" form:"year"`
	LinkFilm string      `json:"linkFilm" form:"link"`
	FilmID   int         `json:"film_id" `
	Film     models.Film `json:"film"`
}