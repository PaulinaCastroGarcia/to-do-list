// Queremos hacer un todo list que cumpla con las siguientas funcionalidades:
// • Agregar un item
// • Eliminar un item
// • Modificar un item
// • Marcar un item como completado
// • Contar la cantidad de items completados vs cantidad de items creados

var totalTasks = 0;
var doneTasks = 0;

$('#add-button').on('click', function(evt) {
  evt.preventDefault()
  var userInput = $('#user-input').val();
  $('#user-input').removeClass('error')

  if (userInput != '') {
    var list = $('#list');
    list.append("<div class='task-container'> <div class='task'> <span>" + userInput + " </span>" +
    "<button class='remove'> x </button> " +
    "<button class='edit'> EDIT </button> </div>" +
    "<div class= 'edit-div hide'>" + 
    "<input type='text' class='user-input-edited' value='"
    + userInput + "'>" +
    "<button class='save-button'>SAVE</button>" + 
    "</div></div>");

    //empty input
    var userInput = $('#user-input').val('');

    //add 1 to totalTasks and show it on html
    totalTasks++ 
    $('#total-tasks').html(totalTasks);
  } else {
    $('#user-input').addClass('error')
    $('#user-input').focus()
  }
})

$(document).on('click', '.remove', function () {
  //remove task's parent div
  $(this).parent().parent().remove();

  //update totalTasks
  totalTasks--
  $('#total-tasks').html(totalTasks);

  //delete task from doneTask if it was done
  if ($(this).siblings('span').hasClass('strikethrough')) {
    doneTasks--
    $('#done-tasks').html(doneTasks);
  }
})

$(document).on('click', '.edit', function () {
  //hide previous task and show input to change it
  $(this).parent().addClass('hide');
  $(this).parent().siblings('.edit-div').removeClass('hide');

  //delete task from doneTask if it was done
  if($(this).siblings('span').hasClass('strikethrough')){
    $(this).siblings('span').removeClass('strikethrough');
    doneTasks--;
    $('#done-tasks').html(doneTasks);
  }
})

$(document).on('click', '.save-button', function () {
  //get new user input
  userInput = $(this).siblings('input').val();
  //if its not empty then hide the dive where you edit,
  //update taks with user input and show task div again
  if (userInput != '') {
    $(this).parent().addClass('hide');
  
    $(this).parent().siblings('div').children('span').html(userInput);
    $(this).parent().siblings('div').removeClass('hide');
  } else {
    $(this).siblings('input').attr("placeholder", "Please write something")
    $(this).siblings('input').focus()
  }
})

$(document).on('keypress', '.user-input-edited',function (e) {
  if (e.keyCode == 13) {
    $(this).parent().addClass('hide');
  
    userInput = $(this).val();
    $(this).parent().siblings('div').children('span').html(userInput);
    $(this).parent().siblings('div').removeClass('hide');
  }
})

$(document).on('click', 'span', function () {
  if($(this).hasClass('strikethrough')) {
    $(this).removeClass('strikethrough');
    doneTasks --
  } else {
    $(this).addClass('strikethrough');
    doneTasks ++
  }

  $('#done-tasks').html(doneTasks);
})