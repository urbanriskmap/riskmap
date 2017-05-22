var express = require('express'); 
var app = express(); 

var catchall = function(req, res) {
    res.sendFile('./index.html', {root: '.'}); 
}; 

app.use(express.static('.')); 

app.all('*', catchall); 


app.listen(9000, function () {
    console.log('Aurelia bundles being served from localhost:9000'); 
});
