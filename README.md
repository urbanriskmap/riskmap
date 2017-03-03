### PetaBencana.id
Front-end code &nbsp;
[![Build Status](https://travis-ci.org/urbanriskmap/petabencana.id.svg?branch=master)](https://travis-ci.org/urbanriskmap/petabencana.id)
<br>
[Project description](https://github.com/urbanriskmap/petabencana-docs/blob/master/README.md)
<br>
This platform is built using the Aurelia framework, which has a few prerequisites. To get started, follow the machine & application setup steps. 
____

### Machine setup
* Install NodeJS >= 4.x
    * You can [download it here](https://nodejs.org/en/).
* Install NPM 3.x
    * Even though you may have the latest NodeJS, that doesn't mean you have the latest version of NPM. You can check your version with `npm -v`. If you need to update, run `npm install npm -g`.
* Install Aurelia CLI 
    * `npm install aurelia-cli -g`

### Application setup
* Install the project dependencies 
    * `npm install`
    
### Configuration
* Environments
    * *to run in local, update the following values in /aurelia_project/environments/local.js* 
    * `debug` : (true/false) enable aurelia router logs in browser console
    * `testing` : (true/false) enable aurelia-testing plugin
    * `tile_layer` : set map tile source url (allows using multiple tileLayers for development, staging, production, etc)
    * `data_server` : set url of cognicity server (Default value is http://localhost:8001/ if using [cognicity-server] (https://github.com/urbanriskmap/cognicity-server-v3))
    * `app` : set it to map landing page url (Default value is http://localhost:9000/ if using this platform) 
    * `default_language`: set it to one of the languages in `supported_languages` (Default is 'en')
    * `supported_languages`: set it to an array of languages you support (Default is ['en', 'id']. In case you add more languages, update  the array and add corresponding locale information in /src/resources/locales/TWO_LETTER_LANGUAGE_CODE.js)
    * `enable_test_cardid`: set to false to disable cardid=test123 in prod environments (Default is true for local and dev environments)

* Map Configuration
    * *to add new cities, update the `instance regions` in /src/resources/config.js > Config.map*
    * Default supported cities are Jakarta, Surabaya, Bandung (Refer [here](https://docs.petabencana.id/routes/cities.html) for updates)
    * For every new instance region (city) added, set a three letter `region` code. And set the `bounds` to have southwest and northeast bounds of the city in `sw` and `ne` respectively.
    * The value set in `default_region` sets the initial map view in localhost:9000/map
    * *Set `map.center` in /src/routes/cards/location/location.js to the center of the new instance region you have added in map config files*
    
### To build
* Start the development server
    * `npm start` This will start a dev server on localhost:9000

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

If you want to run BrowserStack, you need to provide environment variables with your 
username and password. Put `export BROWSERSTACK_USERNAME=yourUsername` and `export BROWSERSTACK_KEY=yourAccessKey` into 
your ~/.bashrc or ~/.bash_profile in order for karma to pick up the browserstack credentials. 

You also need the browserstack local [testing binary](https://www.browserstack.com/local-testing). Install it with your key: 
`./BrowserStackLocal --key yourAccessKey`

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
