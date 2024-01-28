
var http = require("http");


http.createServer(function(req, res){
   var contentType = 'application/json';


   if(req.headers.accept){
       if(req.headers.accept.includes('application/xml')) {
           contentType = 'application/xml';
       }
   }


   res.writeHead(200, {'Content-type': contentType});


   switch(req.url){
       case '/c':
           if(contentType === 'application/json'){
               res.write('{"temperature: ' + randomInt(1,40) + ', unit "C" }');
           } else {
               res.write('<temperatura>' + randomInt(1,40) + 'C</temperatura>')
           }
           break;
       case '/f':
           if(contentType === 'aplication/json') {
               res.write('temperature: ' + ((randomInt(1,40) * 1.8) + 32) + ', unit "F" }');
           } else {
               res.write('<temperatura>' + ((randomInt(1,40) * 1.8) + 32) + 'F</temperatura>');
           }
           break;


       default:
           if (contentType === 'application/json'){
               res.write('{"Escolha /c para celsius e /f para fahrenheit}');
           } else {
               res.write('Escolha /c para celsius e /f para fahrenheit');
           }
   }
   res.end();
}).listen(8085);


function randomInt(min, max){
   return Math.floor(Math.random() * (max - min + 1)) + min
}
