const apphud = require('./apphud')
let port = 4000;
apphud.listen(port, ()=>{
    console.log("Server has started")
})
