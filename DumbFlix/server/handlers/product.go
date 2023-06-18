package handlers

import (
	"net/http"
	dto "server/dto/result"
	productdto "server/dto/product"
	"server/models"
	"server/repositories"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type ProductHandler struct {
	RepositoryProduct repositories.ProductRepository
}

func HandlerProduct(RepositoryProduct repositories.ProductRepository ) *ProductHandler {
	return &ProductHandler{RepositoryProduct}
}

func (h *ProductHandler) FindProducts(c echo.Context) error {
	Product, err := h.RepositoryProduct.FindProduct() 
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Product})
}

// func (h *ProductHandler) GetTrans(c echo.Context) error {
// 	ProductData, err := h.RepositoryProduct.GetTrans()
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}
// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: ProductData})
// }

func (h *ProductHandler) GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	ProductData, err := h.RepositoryProduct.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: ProductData})
}

func (h *ProductHandler) CreateProduct(c echo.Context) error {
	request := new(productdto.CreateProductRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	Product := models.Product{
		
	}

	data, err := h.RepositoryProduct.CreateProduct(Product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertProductResponse(data)})
}

func (h *ProductHandler) UpdateProduct(c echo.Context) error {
	request := new(productdto.UpdateProductRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	Product, err := h.RepositoryProduct.GetProduct(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Duration != 0 {
		Product.Duration = request.Duration
	}

	if request.Price != 0 {
		Product.Price = request.Price
	}

	data, err := h.RepositoryProduct.UpdateProduct(Product)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertProductResponse(data)})
}

func (h *ProductHandler) DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Product, err := h.RepositoryProduct.GetProduct(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.RepositoryProduct.DeleteProduct(Product, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertProductResponse(data)})
}

func convertProductResponse(u models.Product) productdto.ProductResponse {
	return productdto.ProductResponse{
		ID:       u.ID,
		Duration: u.Duration,
		Price:    u.Price,
	}
}