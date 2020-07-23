# apartment-recommender
CS 411 Project

1. Clone the repo and run the following command:
	```
	npm install
	```
2. Create a .env file at the root of the project with the following variables, change the values where needed:
	```
	HOST=localhost
	SQL_PORT=3306
	SQL_USER='root'
	SQL_PASS='PASSWORD'
	DATABASE='DATABASE_NAME'
	```
3. Make sure your db is setup like in db_setup.sql (UserId and ReviewId are VARCHAR(50) instead of INTEGER)
