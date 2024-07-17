const app = require('./app')

// to know the environment variable

    console.log(app.get('env '))
//creating a server
const port = 2000;


app.listen(port, ()=>{
    console.log('server has started')
})