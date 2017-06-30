### PetaBencana.id
Front-end code &nbsp;
[![Build Status](https://travis-ci.org/urbanriskmap/petabencana.id.svg?branch=master)](https://travis-ci.org/urbanriskmap/petabencana.id)
<br>
[Project description](https://github.com/urbanriskmap/petabencana-docs/blob/master/README.md)
<br>
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

___

### Project Structure
The project structure is as follows:
- **assets**: Static assets such as fonts, images, vector graphics, and icons
- **aurelia_project**: Aurelia generated folder containing config (Check Configuration section for more details) and framework specific libraries
- **scripts**: Generated scripts from the build process
- **src**: The main application code with the following files and subfolders
  * **components**: Contains custom-elements to be used in routes (Read more about Aurelia Custom Elements [here](http://aurelia.io/hub.html#/doc/article/aurelia/framework/latest/cheat-sheet/9))
  * **resources**: Contains globally available resource files
    * **locales**: translation files for supported locales (en and id currently)
    * **style_sheets**: contains the parent .less files that get imported in the .less files accompanying all HTML templates
    * **config.js**: Check Configuration section for more details
    * **reportCard.js**: singleton class shared across all cards
  * **routes**: Read more about how Aurelia Routing works [here](http://aurelia.io/hub.html#/doc/article/aurelia/router/latest/router-configuration/1)
    * **cards**: Contains card decks for GRASP interface (View and view model for each card. Read Card decks section for more information.)
    * **landing**: Contains template route for maps
- **test**: The tests to run (Check Testing section for more details)

___

### Card Decks
- Refer assets/card-decks/README.md
___

### Routing
* *App router is configured in /src/app.js*
    * '/' & '/map' *map landing page*
    * '/map/:city' *query parameter (city): flyTo supported city*
    * '/map/:city/:report' *query parameter (city & report): flyTo queried report id in a supported city*
    * '/cards/:disaster/:id' *query parameter (disaster type & one time card id): Disaster type specifies which card-deck to load, card id is the link to access report cards, (use test123 as card id in dev & local environments*

* *Additional query parameters*
    * ?lang : Use for setting language to one of the supported languages (en || id).
    * ?tab : Use for opening the side pane set to one of the following tabs (report || map || info)
    * eg. https://dev.petabencana.id/map?lang=en&tab=info

___

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
    * The value set in `default_region` sets the initial map view in http://localhost:9000/map
    * *Set `map.center` in /src/routes/cards/location/location.js to the center of the new instance region you have added in map config files*

___    

### To build
* Start the development server
    * `npm start` This will start a dev server on http://localhost:9000
* To generate a production build
    * Run `npm run build`
    * This will generate new scripts in scripts/ and also auto increment the reference numbers in index.html. Upload the following to the deployment destination (e.g. S3 bucket) protecting the structure:
```
assets/*
scripts/*
index.html
favicon.ico
```
___

### Testing
Testing environment supported by [BrowserStack](https://www.browserstack.com/)

Do ('npm test') to build the project and run the tests.

If you want to run BrowserStack, you need to provide environment variables with your
username and password. Put `export BROWSERSTACK_USERNAME=yourUsername` and `export BROWSERSTACK_KEY=yourAccessKey` into
your ~/.bashrc or ~/.bash_profile in order for karma to pick up the browserstack credentials. Now run `source ~/bash_profile` and
npm test in order to build the bundle and run karama unit tests against it.

##e2e testing:

End to end testing is implemented using protractor, webdriver, and browserstack. First install protractor: `npm install -g protractor` then download the webdriver binaries: `webdriver-manager update`. In order to run the tests, the front end must be being served. Run au run in a separate terminal, and then run `protractor protractor.conf.js` which will start the tests. Protractor can be a little finicky, so you should let it run without interacting with other browser windows.

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
