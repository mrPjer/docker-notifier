Docker Notifier
===============

Docker Notifier is a simple Docker container that forwards your Docker events to your favorite endpoint!

Manually running the event listener
-----------------------------------

1. Install go
2. `cd listener`
3. `export GOPATH=$(pwd)`
4. `cd src`
3. `go get -x github.com/mrPjer/mocker` (this will take a while)
4. `go build github.com/mrPjer/mocker && ./mocker`
