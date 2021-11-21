const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { error } = require('console')
const { send } = require('process')

const app = express()

const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Václav Špaček'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Václav Špaček'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Václav Špaček'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to write location.'
        })
    }

    // res.send({
    //     forecast: 'It is rainning',
    //     location: 'Praha',
    //     address: req.query.address
    // })

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must search'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.get('/*', (req, res) => {
//     res.render('404', {
//         title: 'Error 404',
//         name: 'Václav Špaček',
//         error: 'Page not found!'
//     })
// })


app.use(express.static(path.join(__dirname, '../public')))

app.use(express.static(path.join(__dirname, '../public/about.html')))

app.use(express.static(path.join(__dirname, '../public/help.html')))

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})