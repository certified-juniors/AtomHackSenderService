package handler

import (
	"github.com/SicParv1sMagna/AtomHackMarsService/internal/config"
	"github.com/SicParv1sMagna/AtomHackMarsService/internal/http/repository"
	"github.com/SicParv1sMagna/AtomHackMarsService/internal/kafka"
	log "github.com/sirupsen/logrus"
)

type Handler struct {
	r *repository.Repository
	c *kafka.Consumer
}

func New(repo *repository.Repository, config *config.App) *Handler {
	consumer, err := kafka.NewConsumer(&config.Kafka)
	if err != nil {
		log.Fatal("Error occured while creating producer", err)
	}

	return &Handler{
		r: repo,
		c: consumer,
	}
}
