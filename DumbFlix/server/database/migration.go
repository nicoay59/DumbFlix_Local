package database

import (
	"fmt"
	"server/models"
	"server/pkg/mysql"
)

func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Category{},
		&models.Film{},
		&models.Transaction{},
		&models.Episode{},
		&models.Product{},
	)

	if err != nil {
		panic("Migration Failed 😢😢😢🤷‍♀️🤷‍♀️🤷‍♀️")
	}

	fmt.Println("Migration DB Success gaksih 😎😎👌👍")
}