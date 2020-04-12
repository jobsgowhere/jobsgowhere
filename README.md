# JobsGoWhere
Job board for people who lost their jobs during covid crisis. 

Check our [contribution guidelines](CONTRIBUTING.md) if you want to contribute to this project.

## Steps to setup database on a local postgres instance
1. Install `golang-migrate` on mac using `brew install golang-migrate`
2. Create a local postgresql instance and a database `josbsgowhere`
3. Run `make redo-local-db`. (Note: this step will drop and recreate objects in database)

Here is the link to install migrate for mac, linux and windows users:
https://github.com/golang-migrate/migrate/tree/master/cmd/migrate

## Steps to run

1. `npm install webpack-dev-server rimraf webpack -g`
2. `npm install`
3. `cd ui` && `npm install`
4. `cd ui` && `npm run build`
5. From the project root, `npm start`


## Steps to run with docker
Just do `make run`


