$(document).ready(function(){
  $.getJSON('/api/todos')
  .then(addTodos)

  $('#todoInput').keypress(function(e) {
    if (e.which == 13) {
      createTodo();
      return false;    //<---- Add this line
    }})
  
  $('.list').on('click', 'span', function(){
    removeTodo($(this).parent())
  })
})

function addTodos(todos) {
  //add todos to the page
  todos.forEach(function(todo){
    addTodo(todo)
  });
}

function addTodo(todo){
  var newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
  newTodo.data('id', todo._id) // .data is special jq method to store var's info for later use
  
  if (todo.completed) {
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
}
function createTodo() {
  // send request to create new todo
  var userInput = $('#todoInput').val();
  $.post('/api/todos', {name: userInput})
  .then(function(newTodo){
    $('#todoInput').val(' ');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err)
  })
}

function removeTodo(todo) {
  var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId;
    
    $.ajax({
      method: 'DELETE',
      url: deleteUrl
    })
    .then(function(data){
      // removing from ui
      todo.remove();
    })
    .cath(function(err){
      console.log(err)
    })
}