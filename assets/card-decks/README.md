### Naming
* JSON file name = disaster type parameter in url
* eg. include earthquake.json in routes/card-decks for riskmap.in/cards/earthquake/one-time-link

### JSON Format & corresponding folder structure
* Include "route" and "moduleId" parameters in json file
* Wrap objects in an array
* Under routes/cards, duplicate and use card-template to add a new card
* Replace all instances of "card-template" with "route" name (in card-template.js, rename class name with "route" name & capitalize)

### Review cards
* Each card deck to have its own review card
* Use naming convention: disaster-review (eg. flood-review, earthquake-review, etc.)
* TODO: Create & use a customizable ReportCard.submittables object (currently Review.report)
* TODO: Create customizable checkRequiredInputs getter (refer Review.checkRequiredInputs), as a ReportCard object, employ in each review card
