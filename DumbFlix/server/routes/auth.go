package routes

import (
	"server/handlers"
	"server/pkg/mysql"
	"server/repositories"
	"server/pkg/middleware"


	"github.com/labstack/echo/v4"
)

func AuthRoutes(e *echo.Group) {
	authRepository := repositories.RepositoryAuth(mysql.DB)
	h := handlers.HandlerAuth(authRepository)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login) // add this code
	e.GET("/check-auth", middleware.Auth(h.CheckAuth)) // add this code

}
