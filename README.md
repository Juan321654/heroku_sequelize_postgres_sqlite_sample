https://postgres-test-tiv.herokuapp.com/users

to have true SQL references, the `reference` should go in the `migrations` files
basically treat the `migrations` as if it was the raw SQL, the `models` seems to be only sequelize calls faking sql queries. for example, if the `Post` model does not have the `post_id` in the `models` file, `sequelize` will try to push `id` when doing the queries with express because thats the default behavior.

`models` = sql values
`migrations` = sql creation

heroku steps:

1. add `"engines": { "node": "14.x" }, ` to the `package.json`

2. terminal > `git init` > `heroku create app-name`

3. create `Procfile` file add `web: npm start`

4. `git add .` > `git commit -m 'comment'` > `git push heroku master` >>> `git remote -v` to check current gits

5. `heroku ps:scale web=1`

6. test locally to see everything is working so far `heroku local web`

8. `heroku run bash` to see files are uploaded > `exit`

9. `heroku addons:create heroku-postgresql:hobby-dev` > creates an ENV variable with the database url

10. `heroku config` > copy database url

11. create `.env` file add `DATABASE_URL=postgres://....`

12. file > config/config.json >

```
"production": {
    "dialect": "postgres",
    "use_env_variable": "DATABASE_URL",
    "ssl": true,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
```

13. git add, commit, git push heroku master

14. `heroku run bash` > `npx sequelize-cli db:migrate`


**OR just use SQLite**

- if the `sqlite.db` was uploaded already there is no need to run any `npx sequelize-cli` commands
- you only have to do until step `7` 
- dont forget to change the config file to

```
{
  "development": {
    "storage": "./users.db",
    "dialect": "sqlite"
  },
  "test": {
    "storage": "./users.db",
    "dialect": "sqlite"
  },
  "production": {
    "storage": "./users.db",
    "dialect": "sqlite"
  }
}
```