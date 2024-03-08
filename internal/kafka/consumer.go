package kafka

import (
	"github.com/IBM/sarama"
	"github.com/SicParv1sMagna/AtomHackMarsService/internal/config"
	log "github.com/sirupsen/logrus"
)

type Consumer struct {
	consumer sarama.Consumer
	Topic    string
}

func NewConsumer(cfg *config.Kafka) (*Consumer, error) {
	consumer, err := sarama.NewConsumer([]string{cfg.Addr}, nil)
	if err != nil {
		return nil, err
	}

	return &Consumer{
		consumer: consumer,
		Topic:    cfg.Topic,
	}, nil
}

func (c *Consumer) ConsumeMessage(topic string) {
	partitionCosumer, err := c.consumer.ConsumePartition(topic, 0, sarama.OffsetNewest)
	if err != nil {
		log.Fatal("Failed to start consumer: ", err)
	}

	defer partitionCosumer.Close()

	for {
		select {
		case msg := <-partitionCosumer.Messages():
			log.Printf("Received message: %s\n", string(msg.Value))
		}
	}
}

func (c *Consumer) Close() error {
	return c.consumer.Close()
}
