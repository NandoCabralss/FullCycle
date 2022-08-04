FROM golang:alpine3.16 as builder

WORKDIR /app

COPY . .

RUN go build full-cycle.go

FROM hello-world:latest

COPY --from=builder /app/full-cycle .

CMD ["/full-cycle"]