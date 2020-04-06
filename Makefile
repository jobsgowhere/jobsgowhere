setup:
	cd ui && npm install
	#cd ui && npm install webpack-dev-server rimraf webpack react-scripts -g

update:
	npm update

clean:
	go mod vendor
	go mod tidy

build-full: clean build

build-ui:
	npm install webpack-dev-server rimraf webpack react-scripts -g
	npm install
	cd ui && npm run build

build: build-ui
	go build main.go

run:
	npm start

docker-build: build-ui
	docker build -t jobsgowhere/server .

docker-run:
	docker run -p 8080:8080 jobsgowhere/server
