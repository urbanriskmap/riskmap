var express = require('express'); 
var app = express(); 

var catchall = function(req, res) {
    res.sendFile('./index.html', {root: '.'}); 
}; 

app.use(express.static('.')); 

app.all('*', catchall); 


app.listen(3000, function () {
    console.log('Example app listening on port 3000!'); 
});
