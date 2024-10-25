// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://012cb71d7230d59fef2503df9995e670@o4508183385997312.ingest.de.sentry.io/4508183389732944",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
