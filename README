### Assignment

Build an API that our frontend app would implement to retrieve and submit forms. Submitted data should be stored in a database. Authentication is not required and the raw form structure can be hardcoded.

### Requirements

- set up a Node Express.js repository in TypeScript
- set up a PostgreSQL database on your local machine
- set up endpoints to get a form’s structure, submit data and validate it
    
    → keep in mind that this system needs to be built for scale
    
- use TypeORM as ORM (optional)


## Plan
Since we are in the AI tools era, i decided to give it a try to see if ChatGPT could help increase speed and quality, and im very happy with the result, specially when it comes to unit test and documentation.

I pdf the all conversation [HERE](./chat.openai.com-Solution.pdf)


## Implementation

Its as simple express server, entry point for server is index.ts, app is defined in app.ts, and routes on routes.ts and code divided between controllers and services, with the Models being inside entities. I added simple login with morgan, used jest for unit test, and swagger for docs. Project also includes eslint hooked in pre-commit git as a good practice.

## Install with Docker

I Use docker for local development, to keep close to infra as possible and avoid need to install anything locally, since its configured with hot reloading, makes dev a much better experience

```
docker-compose up
```

## Tests

```
npm run test
```

## API Docs

```
http://localhost:3000/api-docs/
```