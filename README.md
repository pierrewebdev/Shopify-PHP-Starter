# Shopify App Template - PHP

This is a template for building a [Shopify app](https://shopify.dev/docs/apps/getting-started) using PHP and React. It contains the basics for building a Shopify app.

Rather than cloning this repo, you can use your preferred package manager and the Shopify CLI with [these steps](#installing-the-template).

## Benefits

Shopify apps are built on a variety of Shopify tools to create a great merchant experience. The [create an app](https://shopify.dev/docs/apps/getting-started/create) tutorial in our developer documentation will guide you through creating a Shopify app using this template.

The PHP app template comes with the following out-of-the-box functionality:

-   OAuth: Installing the app and granting permissions
-   GraphQL Admin API: Querying or mutating Shopify admin data
-   REST Admin API: Resource classes to interact with the API
-   Shopify-specific tooling:
    -   AppBridge
    -   Polaris
    -   Webhooks

## Tech Stack

This template combines a number of third party open source tools:

-   [Laravel](https://laravel.com/) builds and tests the backend.
-   [Vite](https://vitejs.dev/) builds the [React](https://reactjs.org/) frontend.
-   [React Router](https://reactrouter.com/) is used for routing. We wrap this with file-based routing.
-   [React Query](https://react-query.tanstack.com/) queries the Admin API.
-   [`i18next`](https://www.i18next.com/) and related libraries are used to internationalize the frontend.
    -   [`react-i18next`](https://react.i18next.com/) is used for React-specific i18n functionality.
    -   [`i18next-resources-to-backend`](https://github.com/i18next/i18next-resources-to-backend) is used to dynamically load app translations.
    -   [`@formatjs/intl-localematcher`](https://formatjs.io/docs/polyfills/intl-localematcher/) is used to match the user locale with supported app locales.
    -   [`@formatjs/intl-locale`](https://formatjs.io/docs/polyfills/intl-locale) is used as a polyfill for [`Intl.Locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) if necessary.
    -   [`@formatjs/intl-pluralrules`](https://formatjs.io/docs/polyfills/intl-pluralrules) is used as a polyfill for [`Intl.PluralRules`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) if necessary.

These third party tools are complemented by Shopify specific tools to ease app development:

-   [Shopify API library](https://github.com/Shopify/shopify-api-php) adds OAuth to the Laravel backend. This lets users install the app and grant scope permissions.
-   [App Bridge React](https://shopify.dev/docs/tools/app-bridge/react-components) adds authentication to API requests in the frontend and renders components outside of the embedded App’s iFrame.
-   [Polaris React](https://polaris.shopify.com/) is a powerful design system and component library that helps developers build high quality, consistent experiences for Shopify merchants.
-   [Custom hooks](https://github.com/Shopify/shopify-frontend-template-react/tree/main/hooks) make authenticated requests to the GraphQL Admin API.
-   [File-based routing](https://github.com/Shopify/shopify-frontend-template-react/blob/main/Routes.jsx) makes creating new pages easier.
-   [`@shopify/i18next-shopify`](https://github.com/Shopify/i18next-shopify) is a plugin for [`i18next`](https://www.i18next.com/) that allows translation files to follow the same JSON schema used by Shopify [app extensions](https://shopify.dev/docs/apps/checkout/best-practices/localizing-ui-extensions#how-it-works) and [themes](https://shopify.dev/docs/themes/architecture/locales/storefront-locale-files#usage).

## Getting started

### Requirements

1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).
1. You must have [PHP](https://www.php.net/) installed.
1. You must have [Composer](https://getcomposer.org/) installed.
1. You must have [Node.js](https://nodejs.org/) installed.


### Setting up your Laravel app 

Once the Shopify CLI clones the repo, you will be able to run commands on your app.
However, the CLI will not manage your PHP dependencies automatically, so you will need to go through some steps to be able to run your app.
These are the typical steps needed to set up a Laravel app once it's cloned:

1. Start off by switching to the `web` folder:

    ```shell
    cd web
    ```

1. Install your composer dependencies:

    ```shell
    composer install
    ```

1. Create the `.env` file:

    ```shell
    cp .env.example .env
    ```

1. Bootstrap the default [SQLite](https://www.sqlite.org/index.html) database and add it to your `.env` file:

    ```shell
    touch storage/db.sqlite
    ```

    **NOTE**: Once you create the database file, make sure to update your `DB_DATABASE` variable in `.env` since Laravel requires a full path to the file.

1. Generate an `APP_KEY` for your app:

    ```shell
    php artisan key:generate
    ```

1. Create the necessary Shopify tables in your database:

    ```shell
    php artisan migrate
    ```

And your Laravel app is ready to run! You can now switch back to your app's root folder to continue:

```shell
cd ..
```

Also don't forget to set up a .env file according to the video you were sent.
You should also set up a separate .env file in the frontend folder and set that app with the Shopify client id of your app like this: 'VITE_SHOPIFY_API_KEY'.

This is needed for the frontend part of the app to connect to App Bridge properly.

### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard.
It provides environment variables, runs commands in parallel, and updates application URLs for easier development.

You can develop locally using your preferred Node.js package manager.
Run one of the following commands from the root of your app:

Using yarn:

```shell
yarn dev
```

Using npm:

```shell
npm run dev
```

Using pnpm:

```shell
pnpm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development.

## Deployment

### Application Storage

This template uses [Laravel's Eloquent framework](https://laravel.com/docs/9.x/eloquent) to store Shopify session data.
It provides migrations to create the necessary tables in your database, and it stores and loads session data from them.

The database that works best for you depends on the data your app needs and how it is queried.
You can run your database of choice on a server yourself or host it with a SaaS company.
Once you decide which database to use, you can update your Laravel app's `DB_*` environment variables to connect to it, and this template will start using that database for session storage.

### Build

The frontend is a single page React app. It requires the `SHOPIFY_API_KEY` environment variable, which you can find on the page for your app in your partners dashboard.
The CLI will set up the necessary environment variables for the build if you run its `build` command from your app's root:

Using yarn:

```shell
yarn build --api-key=REPLACE_ME
```

Using npm:

```shell
npm run build --api-key=REPLACE_ME
```

Using pnpm:

```shell
pnpm run build --api-key=REPLACE_ME
```

The app build command will build both the frontend and backend when running as above.
If you're manually building (for instance when deploying the `web` folder to production), you'll need to build both of them:

```shell
cd web/frontend
SHOPIFY_API_KEY=REPLACE_ME yarn build
cd ..
composer build
```

## Hosting

When you're ready to set up your app in production, you can follow [our deployment documentation](https://shopify.dev/docs/apps/deployment/web) to host your app on a cloud provider like [Heroku](https://www.heroku.com/) or [Fly.io](https://fly.io/).

When you reach the step for [setting up environment variables](https://shopify.dev/docs/apps/deployment/web#set-env-vars), you also need to set the following variables:

| Variable          | Secret? | Required |     Value      | Description                                                                         |
| ----------------- | :-----: | :------: | :------------: | ----------------------------------------------------------------------------------- |
| `APP_KEY`         |   Yes   |   Yes    |     string     | Run `php web/artisan key:generate --show` to generate one.                          |
| `APP_NAME`        |         |   Yes    |     string     | App name for Laravel.                                                               |
| `APP_ENV`         |         |   Yes    | `"production"` |                                                                                     |
| `DB_CONNECTION`   |         |   Yes    |     string     | Set this to the database you want to use, e.g. `"sqlite"`.                          |
| `DB_DATABASE`     |         |   Yes    |     string     | Set this to the connection string to your database, e.g. `"/app/storage/db.sqlite"` |
| `DB_FOREIGN_KEYS` |         |          |     `true`     | If your app is using foreign keys.                                                  |

## Known issues

### Hot module replacement and Firefox

When running the app with the CLI in development mode on Firefox, you might see your app constantly reloading when you access it.
That happened in previous versions of the CLI, because of the way HMR websocket requests work.

We fixed this issue with v3.4.0 of the CLI, so after updating it, you can make the following changes to your app's `web/frontend/vite.config.js` file:

1. Change the definition `hmrConfig` object to be:

    ```js
    const host = process.env.HOST
        ? process.env.HOST.replace(/https?:\/\//, "")
        : "localhost";

    let hmrConfig;
    if (host === "localhost") {
        hmrConfig = {
            protocol: "ws",
            host: "localhost",
            port: 64999,
            clientPort: 64999,
        };
    } else {
        hmrConfig = {
            protocol: "wss",
            host: host,
            port: process.env.FRONTEND_PORT,
            clientPort: 443,
        };
    }
    ```

1. Change the `server.host` setting in the configs to `"localhost"`:

    ```js
    server: {
      host: "localhost",
      ...
    ```

### I can't get past the ngrok "Visit site" page

When you’re previewing your app or extension, you might see an ngrok interstitial page with a warning:

```
You are about to visit <id>.ngrok.io: Visit Site
```

If you click the `Visit Site` button, but continue to see this page, then you should run dev using an alternate tunnel URL that you run using tunneling software.
We've validated that [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/run-tunnel/trycloudflare/) works with this template.

To do that, you can [install the `cloudflared` CLI tool](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/), and run:

```shell
# Note that you can also use a different port
cloudflared tunnel --url http://localhost:3000
```

In the output produced by `cloudflared tunnel` command, you will notice a https URL where the domain ends with `trycloudflare.com`. This is your tunnel URL. You need to copy this URL as you will need it in the next step.

```shell
2022-11-11T19:57:55Z INF Requesting new quick Tunnel on trycloudflare.com...
2022-11-11T19:57:58Z INF +--------------------------------------------------------------------------------------------+
2022-11-11T19:57:58Z INF |  Your quick Tunnel has been created! Visit it at (it may take some time to be reachable):  |
2022-11-11T19:57:58Z INF |  https://randomly-generated-hostname.trycloudflare.com                                     |
2022-11-11T19:57:58Z INF +--------------------------------------------------------------------------------------------+
```

In a different terminal window, navigate to your app's root and run one of the following commands (replacing `randomly-generated-hostname` with the Cloudflare tunnel URL copied from the output of `cloudflared` command):

```shell
# Using yarn
yarn dev --tunnel-url https://randomly-generated-hostname.trycloudflare.com:3000
# or using npm
npm run dev --tunnel-url https://randomly-generated-hostname.trycloudflare.com:3000
# or using pnpm
pnpm dev --tunnel-url https://randomly-generated-hostname.trycloudflare.com:3000
```

## Developer resources

-   [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
-   [App authentication](https://shopify.dev/docs/apps/auth)
-   [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
-   [Shopify API Library documentation](https://github.com/Shopify/shopify-api-php/tree/main/docs)
-   [Getting started with internationalizing your app](https://shopify.dev/docs/apps/best-practices/internationalization/getting-started)
    -   [i18next](https://www.i18next.com/)
        -   [Configuration options](https://www.i18next.com/overview/configuration-options)
    -   [react-i18next](https://react.i18next.com/)
        -   [`useTranslation` hook](https://react.i18next.com/latest/usetranslation-hook)
        -   [`Trans` component usage with components array](https://react.i18next.com/latest/trans-component#alternative-usage-components-array)
    -   [i18n-ally VS Code extension](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
