const app = require('./app')
const config = require('./config')

app.listen(config.port, ()=> console.log(`servidor conectador en http://localhost:${config.port}`))
