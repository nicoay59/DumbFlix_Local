package repositories



import (
	"server/models"

	"gorm.io/gorm"
)

type EpisodeRepository interface {
	FindEpisode() ([]models.Episode, error)
	GetEpisode(ID int) (models.Episode, error)
	CreateEpisode(episode models.Episode) (models.Episode, error)
	UpdateEpisode(episode models.Episode) (models.Episode, error)
	DeleteEpisode(episode models.Episode, ID int) (models.Episode, error)
}

func RepositoryEpisode(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindEpisode() ([]models.Episode, error) {
	var Episode []models.Episode
	// err := r.db.Find(&trip).Error
	err := r.db.Preload("Film").Find(&Episode).Error

	return Episode, err
}

func (r *repository) GetEpisode(ID int) (models.Episode, error) {
	var Episode models.Episode
	err := r.db.Preload("Film.Category").First(&Episode,"film_id = ?", ID).Error
	// err := r.db.First(&trip, ID).Error

	return Episode, err
}

func (r *repository) CreateEpisode(Episode models.Episode) (models.Episode, error) {
	err := r.db.Preload("Film.Category").Create(&Episode).Error
	return Episode, err
}

func (r *repository) UpdateEpisode(Episode models.Episode) (models.Episode, error) {
	err := r.db.Save(&Episode).Error

	return Episode, err
}

func (r *repository) DeleteEpisode(Episode models.Episode, ID int) (models.Episode, error) {
	err := r.db.Delete(&Episode, ID).Scan(&Episode).Error

	return Episode, err
}
