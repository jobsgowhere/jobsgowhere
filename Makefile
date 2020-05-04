
APP_NAME := jobsgowhere
APP_PATH := /$(APP_NAME)
COMPOSE := docker-compose -f docker-compose.yml
DATABASE_URL := postgres://jobsgowhere:@db:5432/jobsgowhere?sslmode=disable

build:
	docker build -t jobsgowhere/server .

run:
	docker run -p 8080:8080 --name jobsgowhere jobsgowhere/server

dev-react:
	docker run -p 8080:8080 -v ui/dist:/app/dist --name jobsgowhere-dev-react jobsgowhere/server

dev-react-build:
	cd ui && yarn && yarn build && cp -r dist ../dist

dev-backend:
	source .env && go run main.go

setup-local:
	 go get github.com/golang-migrate/migrate

db:
	$(COMPOSE) up -d db

migrate: MOUNT_VOLUME = -v $(shell pwd)/data/migrations:/migrations
migrate:
	$(COMPOSE) run --rm $(MOUNT_VOLUME) db-migrate \
	sh -c './migrate -path /migrations -database $$DATABASE_URL up'

setup: db migrate
	cd ui && yarn install
	#cd ui && yarn install webpack-dev-server rimraf webpack react-scripts -g

drop-db: MOUNT_VOLUME =  -v $(shell pwd)/data/migrations:/migrations
drop-db:
	$(COMPOSE) run --rm $(MOUNT_VOLUME) db-migrate \
	sh -c './migrate -path /migrations -database $$DATABASE_URL drop'

redo-db: drop-db migrate

redo-local-db:
	migrate -path ./data/migrations -database postgres://localhost:5432/jobsgowhere?sslmode=disable drop
	migrate -path ./data/migrations -database postgres://localhost:5432/jobsgowhere?sslmode=disable up

test: clean setup
	go test -mod=vendor -coverprofile=c.out -failfast -timeout 1m ./...

compose-down:
	# Remove volume in compose down as well
	$(COMPOSE) down -v

compose-up:
	$(COMPOSE)

build-local:
	go build -o ./bin/main
	cd ui && yarn run build
	cd ui && cp -r dist ./../bin/dist
	cp .env ./bin/