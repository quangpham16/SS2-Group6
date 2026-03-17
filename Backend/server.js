
/** import thu vien */
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()



app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('Successful')
})
.catch((error) => {
console.error('Unsucessful', error.message)
})
app.get ('/', (req,res)=> {
res.send('done')
})
app.get('/api/status', (req,res) =>{res.json({message: "Hehehehe"});
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
console.log ("Thank you")

} )





