
APP_NAME := jobsgowhere
APP_PATH := /$(APP_NAME)
COMPOSE := docker-compose -f docker-compose.yml
DATABASE_URL :=postgres://jobsgowhere:@db:5432/jobsgowhere?sslmode=disable
setup-local:
	 go get github.com/golang-migrate/migrate

db:
	$(COMPOSE) up -d db

migrate: MOUNT_VOLUME = -v $(shell pwd)/data/migrations:/migrations
migrate:
	$(COMPOSE) run --rm $(MOUNT_VOLUME) db-migrate \
	sh -c './migrate -path /migrations -database $$DATABASE_URL up'

setup: db migrate
	cd ui && npm install
	#cd ui && npm install webpack-dev-server rimraf webpack react-scripts -g

update:
	npm update

clean:
	go mod vendor
	go mod tidy

build-full: clean build

build-ui:
	cd ui && npm run build

build: build-ui
	go build main.go

run:
	npm start

docker-build: build-ui
	docker build -t jobsgowhere/server .

docker-run:
	docker run -p 8080:8080 jobsgowhere/server

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