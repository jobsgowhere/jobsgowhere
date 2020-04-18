# Build Frontend Stage
FROM node as react-builder
WORKDIR /build
COPY ui/ ./
RUN yarn
RUN yarn build

# Build Backend Stage
FROM golang:alpine as golang-builder
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64
WORKDIR /build
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN go build -o main .

# Final Stage
FROM alpine
WORKDIR /app
COPY --from=golang-builder /build/main .
COPY --from=react-builder /build/dist ./dist
EXPOSE 8080
CMD ["/app/main"]
