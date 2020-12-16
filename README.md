# JobsGoWhere

Job board for people who lost their jobs during covid crisis.

Check our [contribution guidelines](CONTRIBUTING.md) if you want to contribute to this project.

## Steps to setup database on a local postgres instance

1. Install `golang-migrate` on mac using `brew install golang-migrate`
2. Create a local postgresql instance and a database `josbsgowhere`
3. Run `make redo-local-db`. (Note: this step will drop and recreate objects in database)

Here is the link to install migrate for mac, linux and windows users:
https://github.com/golang-migrate/migrate/tree/master/cmd/migrate

## Steps to run with go

1. In root dir of the project folder, `cd ui`
2. Run `yarn install && yarn build` to install and then build
3. `cd ..` back to root and run `go run main.go`
4. Navigate to localhost:8080

## Contributors 

* [Yao Long](https://sg.linkedin.com/in/yaolongchong)
* [Sheldon Cheng](https://twitter.com/sheldytox)
* [Subhransu Behera](https://twitter.com/subhransu)
* [Jacob Tan](https://twitter.com/jacobtyq)
* [Kajal Sinha](https://www.linkedin.com/in/kajalsinha)
* [Jun Wei](https://www.linkedin.com/in/ng-jun-wei-a3b78798)
* [Mingding Han](https://www.linkedin.com/in/mingdinghan)
* [Stan Chang Khin Boon](https://twitter.com/lxcid)
* [Ivan Foong](https://twitter.com/vonze21)
* [Zahidur Rahman Faisal](https://www.linkedin.com/in/zahidur-rahman-faisal-10552b33)

