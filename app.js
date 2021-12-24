const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

var fs = require('fs')
const path = require('path')
const dataFilePath = path.join(__dirname, 'data.txt')

app.get('/', (req, res) => {
    console.warn(req.body);
    res.render('Home')
});
app.post("/dashboard", (req, res) => {
    let data ='';
    res.render('Dashboard')
    req.on('data', (chunk) => {
        data += chunk
    });
    req.on('end', () => {
        fs.readFile(dataFilePath, 'utf8', (err, oldData) => {
            let newData = oldData + '\n' + data
            fs.writeFile(dataFilePath, newData, () => {
            })
        })
        console.log(data)
    })
});
app.get("/profile/:name", (req, res) => {
    console.warn(req.params.name);
    res.render('Profile', { name: req.params.name })
});

app.get('*', (req, res) => {
    res.render('Error')
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});