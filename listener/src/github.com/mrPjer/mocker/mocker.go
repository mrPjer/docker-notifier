package main

import (
	"os"
	"context"
	"fmt"
	"net/smtp"
	"net/http"
	"net/url"
	"strings"
	"log"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/ashwanthkumar/slack-go-webhook"
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
	var slackEndpoint = os.Getenv("SLACK_ENDPOINT")

	fmt.Printf("Name: %s (%s)\tID: %s\tAction: %s\n", name, image, id, action)
	sendToNotifier(name, image, id, action)

	var slackMessage = name + " (" + image + ") changed state to " + action

	sendToSlack(slackEndpoint, slackMessage)
}

func sendToNotifier(name, image, id, action string) {
	endpoint:= "http://localhost:9999"
	hc := http.Client{}

	form := url.Values{}
	form.Add("name", name)
	form.Add("image", image)
	form.Add("id", id)
	form.Add("action", action)

	req, err := http.NewRequest("POST", endpoint, strings.NewReader(form.Encode()))
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	if err != nil {
		log.Fatal(err)
	}

	_, err2 := hc.Do(req)

	if err2 != nil {
		log.Fatal(err)
	}
}

func sendEmail(name, image, id, action string) {
	auth := smtp.PlainAuth(
		"",
		"user@email.com",
		"password",
		"mail.server.com",
	)
	err := smtp.SendMail(
		"mail.server.com:25",
		auth,
		"sender@example.org",
		[]string{"recipient@example.net"},
		[]byte("This is the email body"),
	)
	if err != nil {
		log.Fatal(err)
	}
}

func sendToSlack(slackWebhook, message string) {
	payload := slack.Payload {
		Text: message,
		Username: "jacobsHack! Docker notifier",
	}

	err := slack.Send(slackWebhook, "", payload)

	if len(err) > 0 {
		fmt.Printf("Slack error: %s\n", err)
	}
}
