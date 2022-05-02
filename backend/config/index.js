require('dotenv').config();
const USER = encodeURIComponent(process.env.DB_USER)
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const DBNAME = process.env.DB_NAME
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0.pnsvs.mongodb.net/${DBNAME}?retryWrites=true&w=majority` 

const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || 3005,
    cors: process.env.CORS,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUri: MONGO_URI,
    herokuUri: process.env.HEROKU_URI,
    secretToken: process.env.SECRET_TOKEN,
    expireTimeCookieToken: parseFloat(process.env.EXPIRE_TIME_COOKIE_TOKEN),
    expressSessionSecret: process.env.EXPRESS_SESSION_SECRET,
}

module.exports = config