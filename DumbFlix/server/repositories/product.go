package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type ProductRepository interface {
	FindProduct() ([]models.Product, error)
	GetProduct(ID int) (models.Product, error)
	CreateProduct(product models.Product) (models.Product, error)
	UpdateProduct(product models.Product) (models.Product, error)
	DeleteProduct(product models.Product, ID int) (models.Product, error)
}

func RepositoryProduct(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindProduct() ([]models.Product, error) {
	var categories []models.Product
	err := r.db.Find(&categories).Error
	// err := r.db.Preload("Trip").Find(&categories).Error

	return categories, err
}

func (r *repository) GetProduct(ID int) (models.Product, error) {
	var categories models.Product
	// err := r.db.Preload("Trip").First(&categories, ID).Error
	err := r.db.First(&categories, ID).Error

	return categories, err
}

func (r *repository) CreateProduct(categories models.Product) (models.Product, error) {
	err := r.db.Create(&categories).Error

	return categories, err
}

func (r *repository) UpdateProduct(categories models.Product) (models.Product, error) {
	err := r.db.Save(&categories).Error

	return categories, err
}

func (r *repository) DeleteProduct(categories models.Product, ID int) (models.Product, error) {
	err := r.db.Delete(&categories, ID).Scan(&categories).Error

	return categories, err
}