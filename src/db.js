const moongose = require('mongoose')
const { database} = require('./keys')

moongose.connect(database.URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
})
.then(()=>console.log('DB esta conectada'))
.catch(err =>console.log(err));