# petabencana-aurelia

[![Build Status](https://travis-ci.org/urbanriskmap/petabencana.id.svg?branch=master)](https://travis-ci.org/urbanriskmap/petabencana.id)

### Summary

### Getting Started
- Install Aurelia CLI: `npm install aurelia-cli -g`
- Install the project dependencies: `npm install`
- Start the development server: `npm start`This will start a dev server on localhost:9000


### How to build 

### Configuration

### Project Structure
- configuration file 
- aurelia env files - custom stuff 
- translation files 
- fontelo and assets 
The project structure is as follows:

- **assets**: static assets such as images, vector graphics and icons
- **auerlia_project**: Aurelia generated folder containing config and framework specific libraries
- **locales**: translation files for supported locales (en and id currently)
- **scripts**: generated scripts from the build process
- **src**: the main application code
- **test**: the tests to run (`npm test`)

To generate a production build run `npm run build` - this will generate new scripts in scripts/ and also auto increment the reference numbers in index.html.  Upload the following to the deployment destination (e.g. S3 bucket) protecting the structure:

```
assets/*
locales/*
scripts/*
index.html
favicon.ico
```

To test the build locally a static server can be used e.g. https://github.com/scottcorgan/pushstate-server


### Routing
- query parameters, 
- cards/testing123 
- localhost:9000/map
- localhost:9000/cards/test_OTL


### Card Decks
- currently our cards are fixed as 6 cards that capture flooding information. 


----
### Testing
Testing environment supported by [BrowserStack](https://www.browserstack.com/)
Do ('npm test') to build the project and run the tests. 
Mockapi to be used in the future. 

## Contribution Guidelines

- Issues are tracked on [github](https://github.com/urbanriskmap/petabencana.id/issues). 

### Release

The release procedure is as follows:
* Update the CHANGELOG.md file with the newly released version, date, and a high-level overview of changes. Commit the change.
* Update JSDoc documentation if required (see above).
* Create a tag in git from the current head of master. The tag version should be the same as the version specified in the package.json file - this is the release version.
* Update the version in the package.json file and commit the change.
* Further development is now on the updated version number until the release process begins again.

### License
