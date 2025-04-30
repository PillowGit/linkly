# Environment

Configure the environment variables based on the `.env.example` file into a
`.env` file at the root of the project.

```bash
# Google NextAuth Credentials
GOOGLE_CLIENT_ID="clientid"
GOOGLE_CLIENT_SECRET="clientsecret"
AUTH_SECRET="authsecret"

# Supabase Credentials
SUPABASE_URL="https://something.supabase.co"
SUPABASE_KEY="supabasekey"

```

The google client id, client, and auth secrets can be obtained by creating an
OAuth 2.0 client ID in the Google Cloud Console.

The Supabase URL and key can be obtained by creating a new project in Supabase.

# Developing

Install dependenies with npm:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Ensure you have the environment variables set up in a `.env` file in the root of
the project.

# Deploying

## Vercel

Vercel is the recommended deployment platform for a basic project like this.

1. Add this folder as a repo on your github account
2. Log into vercel and link your github
3. Deploy the repo on Vercel with the SvelteKit template and add the .env variables

## Node server

Whether you're deploying on a droplet or self hosted server or something, this
can be deployed as a node server. In the `sveltekit.config.js` file, change the
adapter to use the node adapter and comment out the vercel adapter:

```js
import adapter from '@sveltejs/adapter-node';
// import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// ...
```

Then build the project with:

```bash
npm run build
```

This will create a `build` folder with the compiled project. You can then run
the project with:

```bash
node build/index.js
```
