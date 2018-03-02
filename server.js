var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'prashantbhambhanik',
    database: 'prashantbhambhanik',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var counter = 0;
app.get('/counter', function(req, res){
   counter = counter + 1;
   res.send(counter.toString());
});

var Articles = 
{
     'ArticleOne': {
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
    },
     'ArticleTwo': {
        title: 'Article-Two',
        heading: 'Article-Two',
        date: '24-02-2018',
        content: ` Lets see marquee tag
      <marquee>Hello =) Its moving.</marquee>
        
        <p>
            Well just trying something nothing more its kinda new for me but would be fun doing it =P
            Hahaha Rainbow Rainbow.
        </p> `
     },
     'ArticleThree': { 
        title: 'Article-Two',
        heading: 'Article-Two',
        date: '24-02-2018',
        content: `<pre>
            Lets see heading tags and many more
            <h1><u>This is H1</u></h1>
            <h2><s>This is H2</s></h2>
            <h3><marquee>This is H3</marquee></h3>
            <h4><i>This is H4</i></h4>
            <h5><sub>This is H5</sub></h5>
            <h6><sup>This is H6</sup></h6>
        </pre>
        
        <p>
            Well just trying something nothing more its kinda new for me but would be fun doing it =P
        </p>`
      
         
     },
 
};
 
function createTemplate (data){
       var title = data.title;
       var heading = data.heading;
       var content = data.content;
       
        var htmlTemplate =  `
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
                 <div>
                 ${content}
                 </div>
                </div>
            </body>
            
        </html> 
        `;
        return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/articles/:articleName', function(req, res){
   // articleName == article-one
   // Article[articleName] == {} content object for article one
  
   pool.query("SELECT * FROM article WHERE title ='" + req.params.articleName + "'", function(err, result){
       if(err){
           res.status(500).send(err, tostring());
       }
       else{
           if(result.rows.lenght === 0){
               res.status(404).send('Article not found');
               
           }
           else{
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
           
       }
   });
});

var pool = new pool(config);
app.get('/test-db', function(req, res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test', function(err, result) {
        if(err){
            res.status(500).send(err, tostring());
        }
        else{
            res.send(JSON.stringfy(result));
        }
        
    });

    
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
