var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var ArticleOne = {
    title: 'Article-One',
    heading: 'Article-one',
    date: '24-02-2018',
    content: ` <pre>
            This is how pre formatted works 
            1
            1 1
            1 1 1
            1 1 1 1
            1 1 1 1 1 
            1 1 1 1 1 1
         </pre>
        
         <p>
            Well just trying something nothing more its kinda new for me but would be fun doing it =P
         </p>`
};

function createtemplate (data){
       var title=data.title;
       var heading=data.heading;
       var content= data.content;
        var templatehtml =  `
            <html>
            <head>
            
                <title>
               ${title}
                </title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                 <link href="/ui/style.css" rel="stylesheet" />    
            </head>
            
            <body>
                <div class="container">
                 <a href="http://prashantbhambhanik.imad.hasura-app.io">Home</a>
                 <hr>
                 <hr>
                 <h1> ${heading} </h1>
                 ${content}
                 
                </div>
            </body>
            
        </html> 
        `;
        return templatehtml;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one', function(req, res){
   res.send(createtemplate(ArticleOne));
});

app.get('/article-two', function(req, res){
   res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
