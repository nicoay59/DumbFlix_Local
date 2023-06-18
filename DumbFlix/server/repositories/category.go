package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type CategoryRepository interface {
	FindCategory() ([]models.Category, error)
	GetCategory(ID int) (models.Category, error)
	CreateCategory(category models.Category) (models.Category, error)
	UpdateCategory(category models.Category) (models.Category, error)
	DeleteCategory(category models.Category, ID int) (models.Category, error)
}

func RepositoryCategory(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCategory() ([]models.Category, error) {
	var categories []models.Category
	err := r.db.Find(&categories).Error
	// err := r.db.Preload("Trip").Find(&categories).Error

	return categories, err
}

func (r *repository) GetCategory(ID int) (models.Category, error) {
	var categories models.Category
	// err := r.db.Preload("Trip").First(&categories, ID).Error
	err := r.db.First(&categories, ID).Error

	return categories, err
}

func (r *repository) CreateCategory(categories models.Category) (models.Category, error) {
	err := r.db.Create(&categories).Error

	return categories, err
}

func (r *repository) UpdateCategory(categories models.Category) (models.Category, error) {
	err := r.db.Save(&categories).Error

	return categories, err
}

func (r *repository) DeleteCategory(categories models.Category, ID int) (models.Category, error) {
	err := r.db.Delete(&categories, ID).Scan(&categories).Error

	return categories, err
}