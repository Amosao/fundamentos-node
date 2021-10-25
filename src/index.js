const express = require('express')

const app = express();
app.use( express.json() );

//Constant numbers for HTTP exemples
var numbers = [1,2];

//Port
app.listen(8080);

//List all numbers
app.get('/numbers', (req, res) => {
    return res.json( { success: true, numbers: numbers } );
});

//Change the initial pattern
app.post('/numbers/edit', (req, res) => {
    const { newPattern } = req.body;

    numbers = newPattern;

    return res.json( { success: true, numbers: numbers } );
});

//Add a new value to the list
app.put('/numbers/add/:number', ( req, res ) => {
    const { number } = req.params;

    numbers.push( Number( number ) );

    return res.json( { success: true, numbers: numbers } );
});

//Change a number for another
app.patch( '/numbers/update/:number', ( req, res ) => {
    const { newNumber } = req.body;
    const { number } = req.params;

    let index = numbers.indexOf( number );

    numbers.splice( index, 1, newNumber );

    return res.json( { success: true, numbers: numbers } );
});

//Delete number
app.delete( '/numbers/delete/:number', ( req, res ) => {
    const { number } = req.params;

    let index = numbers.indexOf( number );
    numbers.splice( index, 1 );

    return res.json( { success: true, numbers: numbers } );
});