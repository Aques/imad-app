//Counter code
var button = document.getElementById('counter');
button.onclick = function(){
 
 //Create a request
 var request = new XMLHttpRequest();
 
 //Capture the request
 request.onreadystatechange = function(){
     if(request.readyState === XMLHttpRequest.DONE){
         //Take some action
         if(request.status === 200){
             var counter = request.responseText;
             var span= document.getElementById('count');
             span.innerHTML = counter.toString();
             
         }
         
     }
     
 };
 //Make a request
        request.open('GET', 'http://prashantbhambhanik.imad.hasura-app.io/counter', true);
        request.send(null);
 
 
};

//Submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit-button');
submit.onclick = fucntion(){
    //Make request to server and send the name.
    
    // Capture a list of names and render it as list.
    var names = ['name1', 'name2', 'name3', 'name4'];
    var list = '';
    for(var i=0; i< names.length; i++){
        list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('name-list');
    ul.innerHTML = list;
};