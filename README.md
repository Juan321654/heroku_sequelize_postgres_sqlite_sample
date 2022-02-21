to have true SQL references, the `reference` should go in the `migrations` files
basically treat the `migrations` as if it was the raw SQL, the `models` seems to be only sequelize calls faking sql queries. for example, if the `Post` model does not have the `post_id` in the `models` file, `sequelize` will try to push `id` when doing the queries with express because thats the default behavior.

`models` = sql values
`migrations` = sql creation

heroku steps:

1. add `"engines": { "node": "14.x" }, ` to the `package.json`

2. terminal > `heroku create app-name` >  `git init`

3. `git add .` > `git commit -m 'comment'` > `git push heroku master`