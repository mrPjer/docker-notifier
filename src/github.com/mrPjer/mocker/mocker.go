package main

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

func main() {
	cli, err := client.NewEnvClient()

	if err != nil {
		panic(err)
	}

	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{})

	if err != nil {
		panic(err)
	}

	for _, container := range containers {
		fmt.Printf("%s %s\n", container.ID[:10], container.Image)
	}

	events, _ := cli.Events(context.Background(), types.EventsOptions{})

	for event := range events {
		var name = event.Actor.Attributes["name"]
		var image = event.From
		var id = event.ID
		var action = event.Action
		handleContainerEvent(name, image, id, action)
	}

}

func handleContainerEvent(name, image, id, action string) {
	fmt.Printf("Name: %s (%s)\tID: %s\tAction: %s\n", name, image, id, action)
}
