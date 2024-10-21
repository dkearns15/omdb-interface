# omdb-interface

Interview project to implement an interface for OMDB.

Built in Vue with Typescript, developed on Windows 11 on Node 18.13.0

### Assumptions
- Removed filtering by episodes as it is not supported by the API for standard text search
- Year filtering only applies to the currently loaded titles as the API does not support year range filtering

### Where could I have gone further?
- Proxying the requests to a cloud function to avoid api key scraping
- Abstract the api calls with an interface to open up support for other apis
- Tests...
- Improved api call error handling
  - Display error messages based on response from api
  - Different status codes
- Fancier UX, as well as hover states, loading states

## Project Setup

```sh
npm install
```
```
cp .env.example .env
```
Generate an OMDb API token (https://www.omdbapi.com/) and fill out the VITE_OMDB_API_KEY key in .env

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
