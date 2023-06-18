package routes


import (
	"server/handlers"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func EpisodeRoutes(e *echo.Group) {
	episodeRepository := repositories.RepositoryEpisode(mysql.DB)
	h := handlers.HandlerEpisode(episodeRepository)

	e.GET("/episodes", h.FindEpisode)
	e.GET("/episode/:id", h.GetEpisode)
	e.POST("/episode", h.CreateEpisode)
	// e.PATCH("/episode/:id", h.UpdateEpisode)
	e.DELETE("/episode/:id", h.DeleteEpisode)
	// middleware.UploadFile()
	// middleware.Auth()
	// 	middleware.Auth()
	// 	middleware.Auth()
}