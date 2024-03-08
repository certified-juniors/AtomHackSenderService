package config

type Minio struct {
	Endpoint      string `env:"MARS_MINIO_URL"`
	MinioUser     string `env:"MARS_MINIO_ROOT_USER"`
	MinioPassword string `env:"MARS_MINIO_ROOT_PASSWORD"`
	MinioBucket   string `env:"MARS_MINIO_BUCKET"`
}
