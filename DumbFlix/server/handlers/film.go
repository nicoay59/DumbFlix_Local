package handlers

import (
	"fmt"
	"net/http"
	filmdto "server/dto/film"
	dto "server/dto/result"
	"server/models"
	"server/repositories"

	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type FilmHandler struct {
	FilmRepository repositories.FilmRepository
}

func HandlerFilm(FilmRepository repositories.FilmRepository) *FilmHandler {
	return &FilmHandler{FilmRepository}
}

var path_file = "http://localhost:5000/uploads/"

func (h *FilmHandler) FindFilm(c echo.Context) error {
	film, err := h.FilmRepository.FindFilm()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// for i, p := range trip {
	// 	imagePath := os.Getenv("PATH_FILE") + p.Image
	// 	trip[i].Image = imagePath
	//   }

	for i, p := range film {
		film[i].Thumb = path_file + p.Thumb
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: film})
}

func (h *FilmHandler) GetFilm(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	film, err := h.FilmRepository.GetFilm(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	film.Thumb = path_file + film.Thumb
	// trip.Image = os.Getenv("PATH_FILE") + trip.Image
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: film})
}

func (h *FilmHandler) CreateFilm(c echo.Context) error {

	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	year, _ := strconv.Atoi(c.FormValue("year"))
	category_id, _ := strconv.Atoi(c.FormValue("category_id"))
	fmt.Println(year)

	request := filmdto.CreateFilmRequest{
		CategoryID: category_id,
		Title:      c.FormValue("title"),
		Year:       year,
		Desc:       c.FormValue("desc"),
		TitleEps:   c.FormValue("titleps"),
		Thumb:      dataFile,
		Link:       c.FormValue("link"),
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// trip, err = h.TripRepository.CreateTrip(trip)
	// if err != nil {
	//   return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	// }

	// trip, _ = h.TripRepository.GetTrip(trip.ID)

	// return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTrip(trip)})

	film := models.Film{
		// FullName: request.FullName,
		// Email:    request.Email,
		// Password: request.Password,
		// Address:  request.Address,
		// Phone:    request.Phone,
		CategoryID: category_id,
		Category:   request.Category,
		Title:      request.Title,
		Year:       year,
		TitleEps:   request.TitleEps,
		Desc:       request.Desc,
		Thumb:      dataFile,
		Link:       request.Link,
	}

	data, err := h.FilmRepository.CreateFilm(film)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertFilmResponse(data)})
}

func (h *FilmHandler) UpdateFilm(c echo.Context) error {
	request := new(filmdto.UpdateFilmRequest)
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	id, _ := strconv.Atoi(c.Param("id"))

	film, err := h.FilmRepository.GetFilm(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Title != "" {
		film.Title = request.Title
	}
	if request.Year != 0 {
		film.Year = request.Year
	}
	if request.CategoryID != 0 {
		film.Year = request.Year
	}

	// if request.Country != request.Country {
	// 	trip.Country = request.Country
	// }

	if request.Desc != "" {
		film.Desc = request.Desc
	}
	if request.TitleEps != "" {
		film.TitleEps = request.TitleEps
	}
	if request.Thumb != "" {
		film.Thumb = request.Thumb
	}
	if request.Link != "" {
		film.Link = request.Link
	}

	data, err := h.FilmRepository.UpdateFilm(film)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertFilmResponse(data)})
}

func (h *FilmHandler) DeleteFilm(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.FilmRepository.GetFilm(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.FilmRepository.DeleteFilm(trip, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertFilmResponse(data)})
}

func convertFilmResponse(u models.Film) filmdto.FilmResponse {
	return filmdto.FilmResponse{
		// ID:   u.ID,
		// Name: u.Name,
		// CountryID:      u.CountryID,
		Category: u.Category,
		Title:    u.Title,
		Year:     u.Year,
		Desc:     u.Desc,
		TitleEps: u.TitleEps,
		Thumb:    u.Thumb,
		Link:     u.Link,
	}
}
