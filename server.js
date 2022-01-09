const express = require('express')
const path = require('path')
const hbs = require('hbs')
const execCommand = require('./utils/execCommandScript')

const port = 3000

const app = express()

const publicDirectoryPath = path.join(__dirname, '../testTask1/public')
const viewsPath = path.join(__dirname, '../testTask1/templates/views')
const partialsPath = path.join(__dirname, '../testTask1/templates/views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Shell request',
    })
})

app.post('/exec',(req,res)=>{
    console.log('Command requested: '+req)
    if(!req.query.command){
        res.send('Wrond request')
    }else{
        let response = {
            'status': '',
            'response body': ''
        }
        execCommand(req.query.command, (err,data)=>{
            if(err){
                response.status = err
                response["response body"] = null
            }else{
                response.status = 200
                response["response body"] = data
            }
            res.send(response)
        })
        console.log(response)
    }
})

app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})