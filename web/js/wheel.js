rotation = 0;

function finRotate() {
	$('.rotate').animate({svgTransform:'rotate('+rotation+', 215, 215)'}, 250, 'easeInOutQuad');
}


$(document).ready(function() {


	messagesOpen = false;

	$('.message-icon').click(function() {
		if(!messagesOpen) {
			phase = $(this).attr('data-phase');
			amount = $(this).text();

			if(phase == currentStep-1) {
				topOffset = 65;
			} else {
				topOffset = 25;
			}
			msgTop = $(this).offset().top+topOffset;
			msgLeft = $(this).offset().left-150;

			$('body').append("<div class=\"message-container\">");
			$('.message-container').css({"top":msgTop,"left":msgLeft});
			$('.message-container').load('/inc/wheel_messages.php?phase='+phase+'', function() {
				$('.message-container').animate({"opacity":1},500);
			});
			messagesOpen = true;
		} else {
			$('.message-container').animate({"opacity":"0"}, 500, function() {
				$(this).remove();
			});
			messagesOpen = false;
		}
	});




	// basic vars for rotation, rotation speed
	rotation = 0;
	rotationSpeed = 2;
	dir = "down";


	$('.wheel_phase').mouseenter(function() {

		$('.message-container').animate({"opacity":"0"}, 500, function() {
			$(this).remove();
		});

		wheelPhaseVal = $(this).attr('data-phase');
		console.log(wheelPhaseVal);
		if(wheelPhaseVal == "") {
			wheelPhaseVal = 1;
		}
		rotation = (parseInt(wheelPhaseVal)*40)-40;

		finRotate();

		$('.wheel_circle').removeClass('enlarge-circle');
		$('.wheel_circle'+wheelPhaseVal).addClass('enlarge-circle');

		$('.task_header').removeClass('task_aniamte');
		$('.task_'+wheelPhaseVal).addClass('task_aniamte');

		// put the code for changing dot here
		$('#dot').find('div').css({"display":"none"});


	});

	$('.rotate').animate({svgTransform:'rotate(0, 215, 215)'}, 0);


});