// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://012cb71d7230d59fef2503df9995e670@o4508183385997312.ingest.de.sentry.io/4508183389732944",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
