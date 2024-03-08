package config

type Database struct {
	DSN string `env:"PERIODS_POSTGRES_URL"`
}
