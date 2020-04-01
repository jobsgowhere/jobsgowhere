# Contributing to JobsGoWhere

:+1::tada: Thanks for taking the time to contribute! :tada::+1:

The following is a set of guidelines for contributing to JobsGoWhere - a job board to help people find a job who lost their job due to covid crisis.
 
These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Find an issue

The first step is to find [an open issue](https://github.com/jobsgowhere/jobsgowhere/issues?q=is%3Aopen+is%3Aissue) to work on.

Issues are labelled to make it easier to identify the type of tasks associated with them. 

You may pick any unassigned issues labelled as `help-wanted`. 
**Before working on the task please add a comment indicating your interest.**

This is to avoid duplicate work. 

If you just want to share an idea you may want to create a new issue. However, search for similar issues before creating a new issue.

## Branching Strategy

`master` branch is protected which means no-one can push code directly to `master` branch. This ensures `master` branch is always stable and working as expected. 

You need to a fork is a copy of a repository and create a new branch. 
This new branch should be created from the latest `master` branch. 

Some good examples of branch names:

- feature-add-login-screen
- bugfix-fix-email-validation
- chore-setup-docker-integration

## Sending Pull Request

After your task is done you need to send a `pull request`

Pull Request will go through PR reviews. And one of the PR reviewers will approve the PR or provide feedback / comments to further improve the PR. 

A good PR usually have a good title and description of what the pull request is trying to change. 

Read this to understand more about [how to write a perfect pull request](https://blog.github.com/2015-01-21-how-to-write-the-perfect-pull-request/)

## CircleCI 

Each Pull Request needs to have proper test coverage for the code you are adding or changing. We will set-up **CircleCI** for the project and after that all Pull Request will trigger a CI build and run the tests. 

CI stands for Continuous Integration. You can read more about it [here](https://en.wikipedia.org/wiki/Continuous_integration)


