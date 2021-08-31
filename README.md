![JuggleChat](https://github.com/aaronbriel/jugglechat-experiment/blob/master/logo.png?raw=true)

An Eclectic and Malleable Multi-Chatbot Framework. [Link](http://doi.org/10.1002/cae.22449) to publication.

## Description

This constitutes JuggleChat's front end experimental UI. Participants IDs are extracted and they are presented with instructions which vary depending on their experimental group (set in `client > index.tsx`). They are then presented with a lesson on Covid-19. If they are in a chatbot experimental group, they are presented with a chat interface, where they are able to ask the chatbot 5 questions. They are then asked to evaluate the chat experience.

Finally, they are brought to a quiz page which tests their knowledge of Covid-19 with 5 questions. IDs, chatbot allocations (in the case of the JuggleChat experimental group), evaluation data, and quiz results are all stored in a Postgres database through typeorm entities.

Code is written to be self-explanatory, although comments are added where there may be a need for further explanation.

## Installation

Create database, update connection information in server/Server.js > createConnection, then run:

    npm install

###  Build client

    cd client
    npm run build

### Build server

    npm run build

These commands build the app/server for production to the `build` folder. React is bundled in production mode and optimized for best performance.

In addition, the build is minified and the filenames include the hashes.

## Start client and server

    npm start

Runs the client app and expressjs server.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Deployment

In server/Server.js change axios URL in get_response to point to reserved static IP

    gcloud app deploy
