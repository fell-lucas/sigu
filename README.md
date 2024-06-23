# Grupo 11

- [Igor Costa](https://github.com/IgorDalepiane)
- [Lucas Fell](https://github.com/fell-lucas)

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

You should also create a new Turso SQLite database at [https://turso.tech/](https://turso.tech/). Then, duplicate the `.env.example` file and rename it to `.env`. Fill in the variables with the URL of your database and the access token.

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

## Deployment

Access at: [https://sigu.pages.dev/](https://sigu.pages.dev/)
