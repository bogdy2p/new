$(document).ready(function() {
	$('.hit_point').click(function() {
		href = $(this).attr('data-href');
		console.log(href);
		window.location.href = href;
	});
})