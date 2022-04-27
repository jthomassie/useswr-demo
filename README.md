# useswr-demo

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

### next.js, mongodb, swr, axios, bootstrap, mapbox-gl, turf

- Set up a Next.js API that connects to a Mongodb collection of geojson map features using SWR and Axios.
- Filter the geojson features with queries and aggregations to create layers on a Mapbox map.
- Use the interactive map and Bootstrap forms to filter, create, update, or delete features in the database.

## Get Started

Import the modules:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

View in your browser:

- [http://localhost:3000/features](http://localhost:3000/features) - open a page in your browser
- [http://localhost:3000/api/features](http://localhost:3000/api/features) - access the page's endpoint

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, Mongodb, and Next's API features, take a look at the following resources:

- [Next.js documentation](https://nextjs.org/docs) - Next.js reference and examples
- [Learn Next.js](https://nextjs.org/learn) - interactive tutorial
- [Learn Mongodb queries and aggregations](https://www.mongodb.com/docs/manual/) - Mongodb reference and examples
- [Integrating Mongodb and Next.js](https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/) - interactive tutorial

## Deploy on Vercel

- [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) - easily deploy Next.js apps with APIs
- [Next.js deployment documentation](https://nextjs.org/docs/deployment) - Next.js reference and examples
