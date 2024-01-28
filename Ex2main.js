var http = require("http");


http.createServer(function(req, res){
   var contentType = 'application/json';


   if(req.headers.accept && req.headers.accept.includes('application/xml')) {
       contentType = 'application/xml';
   }


   res.writeHead(200, {'Content-type': contentType});


   switch(req.url){
       case '/c':
           if(contentType === 'application/json'){
               obterTemp('c', function(value) {
                   res.write('{"temperature": ' + value + ', "unit": "C" }');
                   res.end();
               });
           } else {
               obterTemp('c', function(value) {
                   res.write('<temperatura>' + value + 'C</temperatura>');
                   res.end();
               });
           }
           break;
       case '/f':
           if(contentType === 'application/json') {
               obterTemp('f', function(value) {
                   res.write('{"temperature": ' + value + ', "unit": "F" }');
                   res.end();
               });
           } else {
               obterTemp('f', function(value) {
                   res.write('<temperatura>' + value + 'F</temperatura>');
                   res.end();
               });
           }
           break;


       default:
           if (contentType === 'application/json'){
               res.write('{"message": "Escolha /c para celsius e /f para fahrenheit"}');
           } else {
               res.write('Escolha /c para celsius e /f para fahrenheit');
           }
           res.end();
   }
}).listen(8087);


function obterTemp(unit, callback) {
   var url = 'http://devices.webofthings.io/pi/sensors/temperature/';
   var options = {
       headers: {
           'Accept': 'application/json'
       }
   };


   http.get(url, options, (response) => {
       let data = '';


       response.on('data', (chunk) => {
           data += chunk;
       });


       response.on('end', () => {
           const DataDetemperatura = JSON.parse(data);
           const value = DataDetemperatura.value;
           if (unit === 'f') {
               callback((value * 1.8) + 32);
           } else {
               callback(value);
           }
       });
   }).on("error", (err) => {
       console.log("Error: " + err.message);
   });
}


