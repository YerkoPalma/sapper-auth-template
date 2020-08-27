# sapper-auth-template

Sapper template based on the [default sapper template][sapper-template] 
with the addition of [mongodb][mongodb] through [mongoose][mongoose] 
and [passport][passport] for user authentication

## Getting started

Use any of the documented ways to start a project, for example degit:

```bash
npx degit "yerkopalma/sapper-auth-template" my-app
```

Then install and run

```bash
cd my-app
npm install
npm run dev
```

## Additions

What makes this template different from the default Sapper template is 
mainly the auth system, but there are other things also:

- Use [Bulma][Bulma] framework through [Svelma][Svelma].
- Use [dotenv][dotenv] for env variables (you should create your `.env` file since is gitignored).
- Use sass with [svelte-preprocess][svelte-preprocess] so you can use sass on your components.
- Use mongodb with Mongoose ORM.

## Final notes

Some other things that deserve to be pointed out

- Svelma components are importer from source, so they can be server side rendered.
- Authenticated users are kept in [Sapper session store](https://sapper.svelte.dev/docs#Stores)

## Contribute

If you find any bug or weird behaviour please open an issue in this repo.

[sapper-template]: https://github.com/sveltejs/sapper-template
[mongodb]: https://www.mongodb.com/
[mongoose]: https://mongoosejs.com/
[passport]: http://www.passportjs.org/
[Bulma]: https://bulma.io/
[Svelma]: https://c0bra.github.io/svelma/
[dotenv]: https://github.com/motdotla/dotenv
[svelte-preprocess]: https://github.com/sveltejs/svelte-preprocess