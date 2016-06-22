$(document).ready(function() {
   	
   		// name this function??? to pass as part of my post route??
   		$('#yup').click(function() {
   			loadQuiz();
   		});
   		
   	});
   	
   	function loadQuiz() {
   		$('#letters').empty();
   		$('#inputs').empty();
   		
   		var idGenerator = Math.floor((Math.random() * 20) + 1);
   		
   		$.ajax({
   			type: 'GET',
   			url : '/api/letter/' + idGenerator,
   			dataType: 'JSON',
   			success : showLetter
   		}).fail(function() {
   			console.log('Failed!');
   		});
   	};
   	
   	// build div with letter image
   	function showLetter(data) {
   		$('#letters').empty();
   		$('#inputs').empty();
   		
   		var $row = $('<div>');
   			$row.prop('id', 'rowId');
   			$row.addClass('row');
   			
   		var $col = $('<div>');
   			$col.prop('id', 'colId');
   			$col.addClass('col-lg-12 text-center');
   			
   		var $image = $('<img>');
   			$image.attr('src', '/img/' + data.details.image);
   			
   		$($col).append($image);
   		$($row).append($col);
   		$('#letters').append($row);
   		
   		// build form for answer inputs
   		var $hidden = $('<input>');
   			$hidden.prop('type', 'hidden');
   			$hidden.prop('name', '_id');
   			$hidden.prop('value', data._id);

   		
   		var $phonetics = $('<input>');
   			$phonetics.addClass('form-control');
   			$phonetics.prop('type', 'text');
   			$phonetics.prop('name', 'phonetics');
   			$phonetics.prop('placeholder', 'Enter phonetics...');
   			
   		var $name = $('<input>');
   			$name.addClass('form-control');
   			$name.prop('type', 'text');
   			$name.prop('name', 'name');
   			$name.prop('placeholder', 'Enter name...');
   			
   		var $type = $('<input>');
   			$type.addClass('form-control');
   			$type.prop('type', 'text');
   			$type.prop('name', 'type');
   			$type.prop('placeholder', 'Enter type...');
   			
   		var $answer = $('<button>');
    		$answer.prop('id', 'answer');
    		$answer.prop('type', 'submit');
    		$answer.addClass('btn btn-default center-block');
    		$answer.text('Answer');
    		$answer.click(answerSubmit);

   		var $br = $('<br>');
   		var $br2 = $('<br>');
   		var $br3 = $('<br>');
   			
   		var $form = $('<form>');
   			$form.prop('id', 'answers');
   		
   		$($form).append($hidden);
   		$($form).append($phonetics);
   		$($form).append($br);
   		$($form).append($name);
   		$($form).append($br2);
   		$($form).append($type);
   		$($form).append($br3);
   		$($form).append($answer);

   		$('#inputs').append($form);
   		
   	}
   	
   	function answerSubmit(e){
   		e.preventDefault();
   		
   		// capture the form values as an object
   		var letter = {};
   	
   		var $formValues = $('#answers').serializeArray();
   			
   		$.each($formValues, function() {
   			letter[this.name] = this.value;
   		});
   	
   		$.ajax({
   			type: 'POST',
   			url : '/api/letter/',
   			dataType: 'JSON',
   			data: letter,
   			success : answerCheck
   		}).fail(function() {
   			console.log('Failed!');
   		});
   	}
   	
   	function answerCheck(data){
   		if(data.correct === true) {
   			$('#responseModal').modal();
   			$('#results').text('Awesome-Sauce! Keep going!');
   			
   			$('#ok').click(function() {
   				$('#responseModal').modal('hide');
   				loadQuiz();
   			});
   		}
   		else {
   			$('#responseModal').modal();
   			$('#results').text('Not so much! But keep going!');
   			
   			$('#ok').click(function() {
   				$('#responseModal').modal('hide');
   				loadQuiz();
   			});
   		}
   	}