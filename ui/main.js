
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