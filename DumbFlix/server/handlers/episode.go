package handlers


import (
	"fmt"
	"net/http"
	episodedto "server/dto/episode"
	dto "server/dto/result"
	"server/models"
	"server/repositories"

	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type EpisodeHandler struct {
	EpisodeRepository repositories.EpisodeRepository
}

func HandlerEpisode(EpisodeRepository repositories.EpisodeRepository) *EpisodeHandler {
	return &EpisodeHandler{EpisodeRepository}
}

// var path_file = "http://localhost:5000/uploads/"



func (h *EpisodeHandler) FindEpisode(c echo.Context) error {
	Episode, err := h.EpisodeRepository.FindEpisode()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// for i, p := ranEpisode {
	// 	imagePath := os.Getenv("PATH_FILE") + p.Image
	// 	trip[i].Image = imagePath
	//   }
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Episode})
}

func (h *EpisodeHandler) GetEpisode(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	Episode, err := h.EpisodeRepository.GetEpisode(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// trip.Image = os.Getenv("PATH_FILE") + trip.Image
	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: Episode})
}

func (h *EpisodeHandler) CreateEpisode(c echo.Context) error {

	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	year, _ := strconv.Atoi(c.FormValue("year"))
	fmt.Println(year)
	filmid, _ := strconv.Atoi(c.FormValue("film_id"))
	fmt.Println(year)

	request := episodedto.CreateEpisodeRequest{
		Title: c.FormValue("title"),
		Thumb:          dataFile,
		Year:      year,
		LinkFilm:          c.FormValue("link"),
		Film:    models.Film{},
		FilmID: filmid,
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

	Episode := models.Episode{
		// FullName: request.FullName,
		// Email:    request.Email,
		// Password: request.Password,
		// Address:  request.Address,
		// Phone:    request.Phone,
		Title:          request.Title,
		Thumb:            dataFile,
		Year: request.Year,
		LinkFilm:        request.LinkFilm,
		FilmID:         request.FilmID,
		Film: request.Film,
	}

	data, err := h.EpisodeRepository.CreateEpisode(Episode)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertEpisodeResponse(data)})
}

// func (h *EpisodeHandler) UpdateEpisode(c echo.Context) error {
// 	request := new(episodedto.UpdateEpisodeRequest)
// 	if err := c.Bind(&request); err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	id, _ := strconv.Atoi(c.Param("id"))

// 	Episode, err := h.EpisodeRepository.GetEpisode(id)

// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	if request.Title != "" {
// 		Episode.Title = request.Title
// 	}
// 	if request.Year != 0 {
// 		Episode.Year = request.Year
// 	}

// 	// if request.Country != request.Country {
// 	// 	trip.Country = request.Country
// 	// }

// 	if request.Desc != "" {
// 		Episode.Desc = request.Desc
// 	}
// 	if request.TitleEps != "" {
// 		Episode.TitleEps = request.TitleEps
// 	}
// 	if request.Thumb != "" {
// 		Episode.Thumb = request.Thumb
// 	}
// 	if request.Link != "" {
// 		Episode.Link = request.Link
// 	}

// 	data, err := h.EpisodeRepository.UpdateEpisode(Episode)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}

// 	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertTripResponse(data)})
// }

func (h *EpisodeHandler) DeleteEpisode(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.EpisodeRepository.GetEpisode(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.EpisodeRepository.DeleteEpisode(trip, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{Code: http.StatusOK, Data: convertEpisodeResponse(data)})
}

func convertEpisodeResponse(u models.Episode) episodedto.EpisodeResponse {
	return episodedto.EpisodeResponse{
		// ID:   u.ID,
		// Name: u.Name,
		// CountryID:      u.CountryID,
		Title:        u.Title,
		Thumb: u.Thumb,
		Year:    u.Year,
		LinkFilm: u.LinkFilm,
		FilmID: u.FilmID,
		Film: u.Film,

	}
}