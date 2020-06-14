# JobsGoWhere
Job board for people who lost their jobs during covid crisis. 

Check our [contribution guidelines](CONTRIBUTING.md) if you want to contribute to this project.

## Steps to setup database on a local postgres instance
1. Install `golang-migrate` on mac using `brew install golang-migrate`
2. Create a local postgresql instance and a database `josbsgowhere`
3. Run `make redo-local-db`. (Note: this step will drop and recreate objects in database)

Here is the link to install migrate for mac, linux and windows users:
https://github.com/golang-migrate/migrate/tree/master/cmd/migrate

## Setup LinkedIn
1. Copy `.env.example` as `.env`
2. Fill in `LINKEDIN_CLIENT_ID` and `LINKEDIN_CLIENT_SECRET`
3. Update `LINKEDIN_CALLBACK_HOST` as required

## Steps to run with docker
1. `docker-compose build`
2. `docker-compose up -d`
3. `make redo-docker-db` as needed
