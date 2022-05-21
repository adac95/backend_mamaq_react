const app = require('./backend/app')
const config = require('./backend/config')

app.listen(config.port, ()=> console.log(`servidor conectador en http://localhost:${config.port}`))
