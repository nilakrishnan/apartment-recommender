# apartment-recommender
CS 411 Project

1. Clone the repo and run the following command:
	```
	yarn install
	```
2. Create a .env file at the root of the project with the following variables, change the values where needed:
	```
	HOST=localhost
	SQL_PORT=3306
	SQL_USER='root'
	SQL_PASS='PASSWORD'
	DATABASE='DATABASE_NAME'
	```
3. Setup sql database to match schema described in db_setup.sql

4. Import CSV files in the /mysql folder

	In MySQLWorkbench, click schemas->tables, right click on the table and select 'Table Data Import Wizard' and follow the steps to import the CSV file.

	IMPORTANT: the order for importing the CSV files is building -> apartment -> amenities -> user -> review

5. Start the server by running the following command:
	```
	node server.js
	```

6. Run the application by running the following command:
	```
	yarn start
	```
