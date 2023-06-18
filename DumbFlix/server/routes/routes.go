package routes

import "github.com/labstack/echo/v4"

func RouteInit(e *echo.Group){
	UserRoutes(e)
	CategoryRoutes(e)
	FilmRoutes(e)
	ProductRoutes(e)
	TransactionRoutes(e)
	EpisodeRoutes(e)
	AuthRoutes(e)
	
}