setup:
	cd ui && npm install
	#cd ui && npm install webpack-dev-server rimraf webpack react-scripts -g


update:
	npm update

clean:
	go mod vendor
	go mod tidy

build-full: clean build

build:
	go build main.go
	cd ui && npm run build

run:
	npm start