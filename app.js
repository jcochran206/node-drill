const express = require('express');
const morgan = require('morgan');

// application
const app = express();
const port = 8080;

app.use(morgan('dev'));
//routes
app.get('/', (res, req) => {
    res.send('Hello server');
});
// drill routes 
app.get('/sum', (req, res) => {
   // constants for var
   const numA = req.query.a;
   const numB = req.query.b;

   //conditional for var
    if(!numA){
        return res.status(400).send('provide an A query params');
    }

    if(!numB){
        return res.status(400).send('provide an B query params');
    }

    if(+numA === NaN){
        return res.status(400).send('please proved a number for A');
    }

    if(+numB === NaN){
        return res.status(400).send('please proved a number for B');
    }
   //return sum
   const sum = +numA + +numB;
   res.send(`the sum of ${numA} + ${numB} is equal to ${sum}!`);
   
});


app.listen(port, () => {
    console.log('Express server is listening on port 8080')
});
