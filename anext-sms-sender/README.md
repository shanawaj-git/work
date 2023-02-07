# Overview
`@albathanext/anext-sms-sender` is used to send SMS from different modules of AlbathaNext solutions. This library abstracts the implementation of actual SMS sending using the selected provider.

#### API Documentation
See [The API Documentation](docs)

#### Developing
##### Prerequisites
Node.js:
- required version >= `16`
- [Installation docs](https://yarnpkg.com/getting-started/install)

##### Setting UP
To set up the project development environment
```
$ git clone git@gitlab.com:albathanext/anext-sms-sender.git
$ cd anext-sms-sender
$ npm install
```
##### Running tests
To run tests
```
$ npm run test
```

#### Publishing
> make sure your local project is clean, i.e. no uncommitted changes present.
```
$ git checkout main
$ npm run version x.x.x*
$ npm push
```
> *version is of the format x.x.x, e.g. `1.10.12`

