package routes


import (
	"server/handlers"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func ProductRoutes(e *echo.Group) {
	productRepository := repositories.RepositoryProduct(mysql.DB)
	h := handlers.HandlerProduct(productRepository)

	e.GET("/products", h.FindProducts)
	e.GET("/product/:id", h.GetProduct)
	e.POST("/product", h.CreateProduct)
	// e.PATCH("/Product/:id", h.UpdateProduct)
	e.DELETE("/product/:id", h.DeleteProduct)
	// middleware.UploadFile()
	// middleware.Auth()
	// 	middleware.Auth()
	// 	middleware.Auth()
}