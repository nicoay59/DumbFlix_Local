package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type User interface {
	FindUsers() ([]models.User, error)
	GetUser(ID int) (models.User, error)
	CreateUser(user models.User) (models.User, error)
	UpdateUser(user models.User) (models.User, error)
	DeleteUser(user models.User, ID int) (models.User, error)
}

func RepositoryUser(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindUsers() ([]models.User, error) {
	var users []models.User
	err := r.db.Find(&users).Error

	return users, err
}

func (r *repository) GetUser(ID int) (models.User, error) {
	var user models.User
	err := r.db.Preload("User").First(&user, ID).Error

	return user, err
}

func (r *repository) CreateUser(User models.User) (models.User, error) {
	err := r.db.Create(&User).Error

	return User, err
}

func (r *repository) UpdateUser(User models.User) (models.User, error) {
	err := r.db.Save(&User).Error

	return User, err
}

func (r *repository) DeleteUser(User models.User, ID int) (models.User, error) {
	err := r.db.Delete(&User, ID).Error

	return User, err
}
