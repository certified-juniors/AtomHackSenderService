package model

// Document представляет модель документа
type Document struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	Title     string `json:"title"`
	Owner     string `json:"owner"`
	SentTime  string `json:"sentTime"`
	CreatedAt string `json:"createdAt"`
	Payload   string `json:"payload" gorm:"type:text"`
	Files     []byte `json:"files"`
}
