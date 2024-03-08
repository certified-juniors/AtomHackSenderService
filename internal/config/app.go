package config

type App struct {
	ErrorLevel string `env:"MARS_ERROR_LEVEL" envDefault:"info"`

	API      API
	DelayAPI DelayAPI
	InitAPI  InitAPI
	Database Database
	Minio    Minio
	Kafka    Kafka
}
