const express = require('express')

const app = express()

app.get('/greetings/:userParam', function(req, res){
    res.send(`Welcome, ${req.params.userParam}!`)
})

app.get('/roll/:number', function(req, res) {
    const num = req.params.number

    // Check if the parameter is a valid number then turning string into a number using Number() function
    const numVal = Number(num)
    if (isNaN(numVal)) {
        res.send("You must specify a number.")
    }

    const randomRoll = Math.floor(Math.random() * (numVal + 1))
    res.send(`You rolled a ${randomRoll}.`)
})

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

app.get('/collectibles/:idxParam', function(req, res) {

    const index = req.params.idxParam
    const item = collectibles[index];

        if(item) {
            res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
            return
        } else {
            res.send('This item is not yet in stock. Check back soon!')
        }
})

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', function(req, res){
    const minPrice = req.query['min-price']
    const maxPrice = req.query['max-price']
    const type = req.query['type']

    if(req.query.hasOwnProperty('min-price')) {
        res.send(shoes.filter((shoe) => shoe.price >= minPrice)
    )}

    if(req.query.hasOwnProperty('max-price')) {
        res.send(shoes.filter((shoe) => shoe.price <= maxPrice)
    )}

    if(req.query.hasOwnProperty('type')) {
        res.send(shoes.filter((shoe) => shoe.type === type)
    )}

    res.send(shoes)
    
})


app.listen(3000, function(){
    console.log('Express App waiting for requests')
})