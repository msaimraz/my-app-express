const express = require('express')
const app = express()
const port = 3000

var fs = require('fs')
const path = require('path')
const dataFilePath = path.join(__dirname, 'data.json')

app.get('/', (req, res) => {
    res.write('Hello World............................!')
    res.end()
})

app.get('/signup', function (req, res) {
    res.sendFile(path.join(__dirname, '/signup.html'));
    console.log(req.body)
});

app.post('/home', function (req, res) {
    let data = ''
    res.sendFile(path.join(__dirname, '/home.html'));
    req.on('data', (chunk) => {
        data += chunk
    });
    req.on('end', () => {
        fs.readFile(dataFilePath , 'utf8' , (err , oldData)=>{
            let newData = oldData + '\n' + data
            fs.writeFile(dataFilePath , newData , ()=>{
                console.log('saved')
            })
        })
        console.log(data)
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/notFound.html'))
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});