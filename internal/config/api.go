package config

type API struct {
	ServiceHost string `env:"SS_HOST" envDefault:"0.0.0.0"`
	ServicePort int    `env:"SS_PORT" envDefault:"8080"`
}

type DelayAPI struct {
	ServiceHost string `env:"DS_HOST"`
	ServicePort int    `env:"DS_PORT"`
}

type InitAPI struct {
	ServiceHost string `env:"IS_HOST"`
	ServicePort int    `env:"IS_PORT"`
}
