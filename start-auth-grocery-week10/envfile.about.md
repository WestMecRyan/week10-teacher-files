# name of the db you want to connect to
MONGO_DB="test_grocery"
# cluster number is in your connection string from mongodb drivers page
MONGO_CLUSTER=cluster0.xxxxx.mongodb.net
# database user from the database access panel on mongodb
MONGO_USER=grocery_db_user
# database user password from database access pane
MONGO_PASS=xxxxxxxxxxxxx
# Encrypted secret from running node -> require('crypto').randomBytes(64).toString('hex')
JWT_SECRET=xxxxxxxxxxxxxxxx
NODE_ENV=development
