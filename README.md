# GENERAL

## Windows && MongoDB

[How to Download & Install MongoDB on Windows](https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514)

### MongoImport

mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-3h7dy.mongodb.net:27017,cluster0-shard-00-01-3h7dy.mongodb.net:27017,cluster0-shard-00-02-3h7dy.mongodb.net:27017 --ssl --username <USERNAME> --password <PASSWORD> --authenticationDatabase admin --db inventory --collection tvs --type json --jsonArray --file /c/Development/react/tv-inventory/frontend/src/db/tvs.json

