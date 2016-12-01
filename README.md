# petabencana-aurelia

[![Build Status](https://travis-ci.org/urbanriskmap/petabencana.id.svg?branch=master)](https://travis-ci.org/urbanriskmap/petabencana.id)

Example template using the [Aurelia Framework](http://aurelia.io/)

To get up and running...

- Install Aurelia CLI: `npm install aurelia-cli -g`
- Enter petabencana-aurelia folder
- Install the project dependencies: `npm install`
- Start the development server: `npm start`

This will start a dev server on localhost:9000
For Flood Maps,
localhost:9000/#/map

For Report Cards,
localhost:9000/#/cards/test_OTL

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

----
### Testing
Testing environment supported by [BrowserStack](https://www.browserstack.com/)
