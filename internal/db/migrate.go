package db

import (
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	// err := db.AutoMigrate()
	// if err != nil {
	// 	panic("cant migrate db")
	// }

	// Генерация записей
	// for i := 0; i < 30; i++ {
	// 	document := model.Document{
	// 		Title:     "Document Title",
	// 		Owner:     "Document Owner",
	// 		CreatedAt: time.Now(),
	// 		Payload:   "Document Payload",
	// 		Status:    model.StatusFormed,
	// 		Files:     []model.File{},
	// 	}

	// 	// Создаем документ в базе данных
	// 	if err := db.Create(&document).Error; err != nil {
	// 		panic("cant create document")
	// 	}
	// }

	return nil
}
