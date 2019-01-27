const express = require('express')
const app = express()
const moment = require('moment')
require('moment/locale/es')
app.use((req,res,next)=>{
    moment().locale('es')
    console.log(moment().format('LLLL'))
    req.currentTime = moment().format('LLLL')
    next()
})

app.get('/',(req,res)=>{
    res.json({currentTime: req.currentTime})
})

app.get('/api/timestamp/:datestring?',(req,res)=>{
    let date = req.params.datestring
    let result = {}
    let regex = /^\d{4}[-|/]\d{2}[-|/]\d{2}/
    if(date === undefined){
        date = new Date()
    }else if(regex.test(date)){
        date = new Date(date)
    }else if(/\d/.test(date)){
        date = new Date(parseInt(date))
    }else{
        res.json({
            error: 'Invalid Date'
        })
    }

    result = {
        unix: date.getTime(),
        utc: date.toUTCString()
    }
    res.json(result)
})

app.listen(3000,()=>{
    console.log('server listenig on port 3000')
})