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

// cipher
app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;
    const limit = {a: 97, z: 122};

    if(!text){
        res.status(400).send('please provide query params for text')
    }

    if(!shift){
        res.status(400).send('please provide query params for shift')
    }

    if(isNaN(+shift)){
        res.status(400).send('please provide a number');
    }

    const crypt = text.toLowerCase().split('').map(char => {
        const charIndex = char.charCodeAt(0) + +shift;

        if(charIndex > limit.z){
            return String.fromCharCode((charIndex - limit.z) + (limit.a - 1))
        }

        return String.fromCharCode(charIndex);
    });

    res.send(crypt.join(''));
});
//lotto
app.get('/lotto', (req, res) => {
    //constants 
    const numbers = req.query.n;

if( !numbers || 
    numbers.length !== 6 || 
    numbers.some(n => n > 20) || 
    numbers.some(n => n < 0)
  ) { 
  res.status(400).send('Please provide 6 distinct numbers between 1 and 20');
  }

    //generate random 
    let arr = [];
    for(i = 0; i < 6; i++){
        let randoNum = Math.floor(Math.random() * 20);
        let match = numbers.find(num => +num === randoNum);

        if (match !== undefined) {
          arr.push(match);
        }
    }

    if(arr.length < 4) {
      return res.send(`Sorry you lose! ${arr}`)
    }
    if(arr.length === 4) {
      return res.send(`Congratulations you win a free ticket ${arr}`)
    }
    if(arr.length === 5) {
      return res.send(`Congratulations you win $100 ${arr}`);
    }
    if(arr.length === 6) {
      return res.send(`Wow! Unbelievable! You could have won the mega millions! ${arr}`);
    }


    // res.send('lotto path')
    // res.json(arr);
});

app.listen(port, () => {
    console.log('Express server is listening on port 8080')
});
