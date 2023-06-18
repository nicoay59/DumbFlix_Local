package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func FilmRoutes(e *echo.Group) {
	filmRepository := repositories.RepositoryFilm(mysql.DB)
	h := handlers.HandlerFilm(filmRepository)

	e.GET("/films", h.FindFilm)
	e.GET("/film/:id", h.GetFilm)
	e.POST("/film", middleware.UploadFile(h.CreateFilm))
	e.PATCH("/film/:id", h.UpdateFilm)
	e.DELETE("/film/:id", h.DeleteFilm)
	//
	// middleware.Auth()
	// 	middleware.Auth()
	// 	middleware.Auth()
}
