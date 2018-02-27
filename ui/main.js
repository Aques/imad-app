//Counter code
var button = document.getElementById('counter');
var counter = 0;
button.onclick = function(){
 
 //Create a request
 
 //Capture the request
 
 //Rendering the variable in correct span
 counter = counter + 1;
 var span= document.getElementById('count');
 span.innerHTML = counter.toString();
};
