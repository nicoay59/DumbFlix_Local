package routes


import (
	"server/handlers"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	TransactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(TransactionRepository)

	e.GET("/transactions", h.FindTransactions)
	e.GET("/transaction/:id", h.GetTransaction)
	e.POST("/transaction", h.CreateTransaction)
	// e.PATCH("/transaction/:id", h.UpdateTransaction)
	e.DELETE("/transaction/:id", h.DeleteTransaction)
	e.GET("/transactionuser", h.GetTransByUSer)
	e.POST("/notification", h.Notification)
	// middleware.UploadFile()
	// middleware.Auth()
	// middleware.Auth()
	// 	middleware.Auth()
	// 	middleware.Auth()
}