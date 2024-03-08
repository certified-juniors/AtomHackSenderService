package app

import (
	"fmt"
	"log"

	"github.com/SicParv1sMagna/AtomHackMarsService/docs"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// Run запускает приложение
func (app *Application) Run() {
	r := gin.Default()

	docs.SwaggerInfo.Title = "AtomHackMarsBackend RestAPI"
	docs.SwaggerInfo.Description = "API server for Mars application"
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = "localhost:8080"
	docs.SwaggerInfo.BasePath = "/api/v1"

	ApiGroup := r.Group("/api/v1")
	{
		ApiGroup.POST("/resend")
		ApiGroup.POST("/")
	}

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	addr := fmt.Sprintf("%s:%d", app.cfg.API.ServiceHost, app.cfg.API.ServicePort)
	r.Run(addr)

	log.Println("Server down")
}
