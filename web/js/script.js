$(function() {
	$(document).tooltip();
	$('.datepicker').datepicker({ dateFormat: "yy-mm-dd" });
  $("input, textarea, select").on("input change", function() {
        window.onbeforeunload = window.onbeforeunload || function (e) {
            return "You have unsaved changes.  Do you want to leave this page and lose your changes?";
        };
    });
    $("form").on("submit", function() {
        window.onbeforeunload = null;
    });
});


//$(document).on('click', '.delete_file', function(event) {
//    event.preventDefault();
//    var response = confirm('Are you sure you want to delete this file?');
//    if(!response) { return null; }
//    var fileId = $(this).attr('data-fileId');
//    var formURL = apiUrl+"files/"+fileId;
//
//    $.ajax({
//        url : formURL,
//        type: 'PUT',
//        headers: { 
//            'x-wsse': 'ApiKey="'+api+'"'
//        },
//        success:function removeFile(data, textStatus, jqXHR) {
//            if($('tr[data-fileId="'+fileId+'"]').length) {
//                $('tr[data-fileId="'+fileId+'"]').fadeOut('fast');
//            }
//            console.dir(data);
//        },
//        error: function(jqXHR, textStatus, errorThrown) {
//            console.log(jqXHR);
//            console.log(textStatus);
//            console.log(errorThrown);
//        }
//    });
//});


function testHoney() {

	user_id = getCookie('dash_user_id');
	honeyId = $('.honey-data-container').data('honey-id');
	honey_access_token = $('.honey-data-container').data('access-token');
	honey_office = $('.honey-data-container').data('office');
	honey_title = $('.honey-data-container').data('title');
	honey_avatar = $('.honey-data-container').data('avatar');

	apiKey = getCookie("api");
	var formURL = apiUrl+"users/"+user_id+"/honeydata?profile_picture="+honey_avatar+"&title="+honey_title+"&office="+honey_office+"&honey_user_uuid="+honey_access_token+"&honey_user_id="+honeyId;
	$.ajax({
    dataType: "json",
    url : formURL,
    type: "PUT",
    headers: { 
        'x-wsse': 'ApiKey="'+apiKey+'"'
    },
    success:function(data, textStatus, jqXHR) {
		console.log("update");
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });
}







// HEY RONNIE THIS IS THE SORTING FOR THE DASHBOARD
// ********** DASHBOARD SORTING FUNCTIONALITY ************* 

function addAllResponsibility(state){
	console.log('mixItUp initialized')
	var userId = document.cookie.replace(/(?:(?:^|.*;\s*)dash_user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var apiKey = document.cookie.replace(/(?:(?:^|.*;\s*)api\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	state.$targets.each(function(idx, item){
		getTaskData(item, userId, apiKey);
	});
}

function getTaskData(campaign, userId, apiKey) {
	var formURL = apiUrl+"campaigns/"+campaign.dataset.project_id+"/tasks";
	$.ajax({
    dataType: "json",
    url : formURL,
    type: "GET",
    headers: { 
        'x-wsse': 'ApiKey="'+apiKey+'"'
    },
    success:function(data, textStatus, jqXHR) {
				assignTaskData(data, campaign, userId)
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }
  });
}

function assignTaskData(data, campaign, userId){
	// THIS IS FOR DEBUGGING SINCE RONNIE HAS TWO USER IDS
	// var johnsUserId = 77;
	// var userId = johnsUserId;
	// END OF DEBUGGING........REMOVE THIS LATER!
	
	var tasks = data.Tasks;
	var userResponsibilityScore = 0;
	for (var i = 0; i < tasks.length; i++){
		if (parseInt(tasks[i].TaskOwnerUserID) === parseInt(userId)) {
			userResponsibilityScore += 1;
		}
	}
	campaign.dataset.responsibility = userResponsibilityScore;
}

function initializeMixItUp(){
  $('#campaign-holder').mixItUp({
		animation: {
			effects: "fade",
		},
		callbacks: {
			onMixLoad: function(state){
				addAllResponsibility(state);
			}
		}
	});
}

// END OF DASHBOARD SORTING FUNCTIONALITY
    


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function delete_cookie(name, path, domain) {
  if(getCookie(name) ) {
    document.cookie = name + "=" +
    ((path) ? ";path="+path:"")+
    ((domain)?";domain="+domain:"") +
    ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

var campaign_data, template, source, $placeholder, data_output;

var sortValue = 'recent';

var presented = false;

function sortResults(prop, asc) {
		console.log(prop);
    data_output = data_output.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    
    return data_output;
}

var dashboard = {
	
	initialize: function(e) {
		
		$placeholder = $('#campaign-holder');
		
		// source   = $("#project-template").html();
		// template = Handlebars.compile(source);
		api = getCookie('api');
		$.ajax({
		   url: apiUrl+"campaigns.json",
		   headers: {'x-wsse': 'ApiKey="'+api+'"'},
		   type: "GET",
		   success: function(data) {
			 	campaign_data = data.Campaigns;
			 	console.log(campaign_data);
			 }
		});
	},
	
	sort_projects: function(sortValue, presented) {
		data_output = [];
		$.each(campaign_data, function(key, value) {
			presented = JSON.parse(presented); 
				if (value.PresentedToClient == presented) {
			    data_output.push(value);
				}
		});
		
		if (sortValue == 'urgency') {
			sortResults('Urgency', true);
		}

		if (sortValue == 'completion') {
			sortResults('Completeness', true);
		}

		dashboard.display_projects(data_output);
	},
	
	display_projects: function(data_output) {
		$placeholder.html('');
		$.each(data_output,function(index,element){
			// Generate the HTML for each project
			var html = template(element);
			// Render the projects into the page
			$placeholder.append(html);
		});		
	}
	
}

api = getCookie('api');
var campaign_url = apiUrl+'options/';
var campaign_headers = {'x-wsse': 'ApiKey="'+api+'"'};

var $client_select = $('select[name=client]');
var $division_select = $('select[name=division]');
var $brand_select = $('select[name=brand]');
var $productline_select = $('select[name=productline]');
var $product_select = $('select[name=product]');




var campaign = {
		select_item: function(data_params, url_extension, data_key, $changedSelector){
		$.ajax({
		   url: campaign_url + url_extension,
		   data: data_params,
		   headers: campaign_headers,
		   type: "GET",
		   success: function formSuccess(data) {
			 	var nextFieldData = data[data_key];

				var changedSelectorIndex = null;

				$('.ajaxSelector').each(function(idx, selector){
					if (selector.dataset.for === $changedSelector.data().for ) {
						changedSelectorIndex = idx;
					}

					if (changedSelectorIndex != null) {
						var defaultOptionText = $('label[for="'+ $(selector).data('for') +'"]').text();
						if (idx === changedSelectorIndex + 1) {
							var opts = "<option value='-1'>" + defaultOptionText + "</option>";
				      for(var key in nextFieldData) {
			            opts += "<option value=" + key  + ">" +nextFieldData[key] + "</option>"
			        }
			        $(selector).html(opts);
			        $(selector).prop('disabled', false);
						} else if (idx > changedSelectorIndex + 1) {
							$(selector).prop('disabled', 'disabled');
							$(selector).html("<option value='-1'>" + defaultOptionText + "</option>");
						}
					}
				})
			 },
       error: function formError(data) {
        // var changedSelectorIndex = $.inArray($changedSelector, $('.ajaxSelector'));
        var changedSelectorIndex = null;
        $('.ajaxSelector').each(function(idx, selector){
          if (selector.dataset.for === $changedSelector.data().for ) {
            changedSelectorIndex = idx;
          }
          if (changedSelectorIndex != null) {
            var defaultOptionText = $('label[for="'+ $(selector).data('for') +'"]').text();
            if (idx === changedSelectorIndex + 1) {
              $(selector).html("<option value='-1'>" + defaultOptionText + "</option>");
              $(selector).prop('disabled', 'disabled');
            } else if (idx > changedSelectorIndex + 1) {
              $(selector).prop('disabled', 'disabled');
              $(selector).html("<option value='-1'>" + defaultOptionText + "</option>");
            }
          }
        });
       }
		});
	},
  deselect_items: function($selector) {
    var changedSelectorIndex = $.inArray($selector, $('.ajaxSelector'));
    $('.ajaxSelector').each(function(idx, selector){
      if (idx > changedSelectorIndex + 1) {
        $(selector).prop('disabled', 'disabled');
        $(selector).html("<option value='-1'>" + defaultOptionText + "</option>");
      }
    });
  }
}




function render_chart() {
	$('#chart-container').css({"display": "block"}).animate({"opacity":1}, 1000);
	$('.placeholder').css({"display": "none"});
	$.getScript("/js/charts/comms_tasks.js");
}
function render_fund() {
	$('#chart-container').css({"display": "block"}).animate({"opacity":1}, 1000);
	$('.placeholder').css({"display": "none"});
	$.getScript("/js/charts/fund.js");
}
function render_budget() {
	$('#chartWrapper').css({"display": "block"}).animate({"opacity":1}, 1000);
	$.getScript("/js/charts/budget.js");
}
function render_phasing() {
	$('#chart-container').css({"display": "block"}).animate({"opacity":1}, 1000);
	$('.placeholder').css({"display": "none"});
	$.getScript("/js/charts/phasing.js");
}




// RONNIE CHECK THESE OUT
// ********* CHART ERROR HANDLING FUNCTIONS ********** //
function displayChartError(message){
  var errorMessage = message || 'Not enough data provided to render chart, please add more information'
  $('#chart-error-text').text(errorMessage);
  $('.chart-error').css({"display": "block"}).animate({"opacity":1}, 1000);
}

// ********** END OF CHART ERROR HANDLING ************ //


// 15 SECOND CHECK
countdown = 30;
function delay_check(seconds) {
    timer = setInterval(function(){
    	countdown = countdown-1;
    	if(countdown == 0) {
    		check_comms();
    	}
    	console.log(rotate);
    	$('#circle').find('span').text(countdown);
    }, seconds);
}
function delay_check2(seconds) {
    timer = setInterval(function(){
    	countdown = countdown-1;
    	if(countdown == 0) {
    		check_fund();
    	}
    	console.log(rotate);
    	$('#circle').find('span').text(countdown);
    }, seconds);
}
function delay_check3(seconds) {
    timer = setInterval(function(){
    	countdown = countdown-1;
    	if(countdown == 0) {
    		check_phasing();
    	}
    	console.log(rotate);
    	$('#circle').find('span').text(countdown);
    }, seconds);
}

function reset_clock() {
	countdown = 30;
	$('#circle').circleProgress('redraw');
	$('#circle').find('span').text(countdown);
}

function check_comms() {
	project_id = $('.project_id').attr('data-project-id');
	$.ajax({
		url: apiUrl+'campaigns/' + project_id + '/selectedtasksinformation',
		headers: campaign_headers,
		type: "GET",
		success: function(data) {
			render_chart();
			clearInterval(timer);
		},
		error: function(data) {
			console.log("error");
			reset_clock();
		}
	});
}


function check_fund() {
	project_id = $('.project_id').attr('data-project-id');
	$.ajax({
		url: apiUrl+'campaigns/' + project_id + '/channelranking',
		headers: campaign_headers,
		type: "GET",
		success: function(data) {
			render_fund();
			clearInterval(timer);
		},
		error: function(data) {
			console.log("error");
			reset_clock();
		}
	});
}



function check_phasing() {
	project_id = $('.project_id').attr('data-project-id');
	$.ajax({
		url: apiUrl+'campaigns/' + project_id + '/weeklyphasing',
		headers: campaign_headers,
		type: "GET",
		success: function(data) {
			render_phasing();
			clearInterval(timer);
		},
		error: function(data) {
			console.log("error");
			reset_clock();
		}
	});
}







































$(document).ready(function() {

	if($('#campaign-holder').length) {
		initializeMixItUp();
	}


	if($('.honey-data-container').length) {
		testHoney();
	}


	//KEY PRESS ON INPUTS TO ANIMATE LABELS
	$('input').keypress(function() {
		var getFor = $(this).data("for");
		var animationStyle = $(this).data('animation') === 'topZero' ? {"opacity":"1","top":"0"} : {"opacity":"1","top":"15px"}
		$('label[for="'+getFor+'"]').animate(animationStyle, 300);
	});

	$('input').on('click change', function() {
		var getFor = $(this).data("for");
		if ($(this).data('calendar') === 'datePicker') {
			$('label[for="'+getFor+'"]').animate({"opacity":"1","top":"0"}, 300);
		}
	});

	$('select').click(function() {
		getFor = $(this).data("for");
		if ($(this).data('animation') === 'topZero'){
			$('label[for="'+getFor+'"]').animate({"opacity":"1","top":"0"}, 300);
		}
	});

	$('select').change(function() {
		getFor = $(this).data("for");
		if ($(this).data('animation') === 'topZero'){
			$('label[for="'+getFor+'"]').animate({"opacity":"1","top":"0"}, 300);
		}
	});
	// $('input').keypress(function() {
	// 	var getFor = $(this).data("for");
	// 	if ($(this).data('animation') === 'topZero'){
	// 		$('label[for="'+getFor+'"]').animate({"opacity":"1","top":"0"}, 300);
	// 	}
	// });




	// PATH DATA FOR ANIMATED FILL ON REMEMBER ME BUTTON
	var pathObj = {
	    "svg_checkbox": {
	        "strokepath": [{
                "path": "M   5,4 5,9.667 17.333,4 5,26 33.333,5.667 7.333,43 51.667,6 4,68 71.333,4 24.333,65.333 67.667,23 41,65 68.333,44 55.333,66.333   69,59.667 69,68",
                "duration": 300
	        }],
	        "dimensions": {
	            "width": 76,
	            "height": 72
	        }
	    }
	}; 


	// LOGIN SCREEN
	// ANIMATE THE CHECKBOX FILL FOR 'REMEMBER ME'
	if($('.remember_me').prop('checked')) {
		isChecked = true;
		$('#svg_checkbox').lazylinepainter( {
		    "svgData": pathObj,
		    "strokeWidth": 10,
		    "strokeColor": "#fff"
		}).lazylinepainter('paint');
	} else {
		isChecked = false;
	}
	$('.loginCheckbox').find('input').change(function() {
		console.log("hi");
		if(!isChecked) {
			$('#svg_checkbox').lazylinepainter( {
			    "svgData": pathObj,
			    "strokeWidth": 10,
			    "strokeColor": "#fff"
			}).lazylinepainter('paint');
			isChecked = true;
		} else {
			isChecked = false;
			$('#svg_checkbox').lazylinepainter('erase'); 
		}

	});

	// LOGIN AUTH FUNCTIONS
	$(document).on('click', '#submitBtn', function(e) {
		$('#login_form2').submit();
	});
	$('#login_form2').submit(function(e) {

		auth = false;

		var postData = $(this).serializeArray();
		var formURL = $(this).attr("action");
		username = $('.username').val();
		password = $('.password').val();
		$.ajax({
		    url : formURL,
		    type: "POST",
		    data : postData,
		    success:function(data, textStatus, jqXHR) {
    			document.cookie="api="+data.API_KEY+"; expires=0; path=/";
    			document.cookie="username="+username+"; expires=Thu, 18 Dec 2015 12:00:00 UTC; path=/";

    			if(isChecked) {
    				document.cookie="remember=1; expires=Thu, 18 Dec 2015 12:00:00 UTC; path=/";
    			} else {
    				delete_cookie("remember");
    			}

    			document.cookie="dash_user_id="+data.user_id+"; expires=Thu, 18 Dec 2015 12:00:00 UTC; path=/";
    			$('.sidePanel').removeClass('hidden');
    			$('body').append("<div class='fullPage fullPageDash'><div id='main-content' class='new_data' data-api='"+data.API_KEY+"'></div></div>");
    			$('.fullPageLogin').remove();
    			pageUrl = "dash";
    			$('.loading_ico').animate({"opacity":"1"},300);
    			window.history.pushState({ path: pageUrl }, '', pageUrl);
    			window.location.href = pageUrl;
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
	        	$('#arrow_bg').animate({svgFill:"#f8b429"});
	        	$('#submitBtn').effect("shake", {times: 2, ease: 'easeInOutElastic'}, 500,function() {
	        		$('#arrow_bg').animate({svgFill:"#4D4C4C"});
	        	});
		    }
		});
		e.preventDefault();	
	});
	// END LOGIN FUNCTIONS






        // LOGIN AUTH FUNCTIONS PBC LOGIN
	$(document).on('click', '#form_submit', function(e) {
		$('#pbc_login_form').submit();
//                alert('You clicked the form submit');
	});
	$('#pbc_login_form').submit(function(e) {
		auth = false;

		var postData = $(this).serializeArray();
		var formURL = $(this).attr("action");
		var username = $('#username').val();
		var password = $('#password').val();
//                alert(username);
//                alert(password);


//                alert(formURL);
                

		$.ajax({
		    url : formURL,
		    type: "POST",
		    data : postData,
		    success:function(data, textStatus, jqXHR) {
    			document.cookie="api="+data.API_KEY+"; expires=0; path=/";
    			document.cookie="username="+username+"; expires=Thu, 18 Dec 2015 12:00:00 UTC; path=/";

    			if(isChecked) {
    				document.cookie="remember=1; expires=Thu, 18 Dec 2015 12:00:00 UTC; path=/";
    			} else {
    				delete_cookie("remember");
    			}

    			document.cookie="dash_user_id="+data.user_id+"; expires=Thu, 18 Dec 2015 12:00:00 UTC; path=/";
    			$('.sidePanel').removeClass('hidden');
    			$('body').append("<div class='fullPage fullPageDash'><div id='main-content' class='new_data' data-api='"+data.API_KEY+"'></div></div>");
    			$('.fullPageLogin').remove();
    			pageUrl = "pbclogin";
    			$('.loading_ico').animate({"opacity":"1"},300);
    			window.history.pushState({ path: pageUrl }, '', pageUrl);
    			window.location.href = pageUrl;
//                        console.log($(this));
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
	        	$('#arrow_bg').animate({svgFill:"#f8b429"});
	        	$('#submitBtn').effect("shake", {times: 2, ease: 'easeInOutElastic'}, 500,function() {
	        		$('#arrow_bg').animate({svgFill:"#4D4C4C"});
	        	});
		    }
		});
		e.preventDefault();	
	});
	// END LOGIN FUNCTIONS PBC LOGIN


	// ADD TEAM MEMBERS

	isReviewerChecked = false; 
	$(document).on('click', '.reviewer_check', function(event) {
    event.preventDefault;
		if(!isReviewerChecked) {
			$(this).html("<i class=\"fa fa-star evo-green\" style=\"font-size:1.2em !important;\">");
			isReviewerChecked = true;
			$('.is_reviewer').val(1);
			$('.is_reviewer').prop('checked', true);
		} else {
			$(this).html("<i class=\"fa fa-star\" style=\"font-size:1.2em !important;\">");
			isReviewerChecked = false;
			$('.is_reviewer').val(0);
			$('.is_reviewer').prop('checked', false);
		}
	});

	$(document).on('submit', '#add_teamMember', function(event) {
		event.preventDefault();
		api = $('.get_api').attr('data-api');
		memberId = $('#add_user').val();
		reviewer = $('.is_reviewer').val();
		console.log(api);
	    var postData = $(this).serializeArray();
	    var formURL = $(this).attr("action");
	    console.log(postData);
	    $.ajax({
	        url: formURL+memberId,
	        type: 'PUT',
	        headers: { 
	            'x-wsse': 'ApiKey="'+api+'"'
	        },
	        data: postData,
	        success:function(data, textStatus, jqXHR) {
	        	getMemberName = $('#add_user option:selected').text();
	        	getMemberId = $('#add_user option:selected').val();

	        	taskId1 = $('.task1').attr('data-getTaskId');
	        	taskId2 = $('.task2').attr('data-getTaskId');
	        	taskId3 = $('.task3').attr('data-getTaskId');
	        	taskId4 = $('.task4').attr('data-getTaskId');
	        	taskId5 = $('.task5').attr('data-getTaskId');
	        	taskId6 = $('.task6').attr('data-getTaskId');
	        	taskId7 = $('.task7').attr('data-getTaskId');
	        	taskId8 = $('.task8').attr('data-getTaskId');
	        	taskId9 = $('.task9').attr('data-getTaskId');

	          	$('.add_member_confirmation_holder').css({"opacity": "0"}).html(getMemberName+" has been added!").animate({"opacity":1}, 300);
	            	
	            if(reviewer == 0) {
	            	$('.member_table').append('<tr data-memberId="'+getMemberId+'"><td data-memberId="'+getMemberId+'">'+getMemberName+'</td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId1+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId2+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId3+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId4+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId5+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId6+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId7+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId8+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId9+'"></td><td><a href="#"><i class="fa fa-trash-o remove-user" data-memberId="'+getMemberId+'"></i></a></td></tr>')
	            } else {
	            	$('.member_table').append('<tr data-memberId="'+getMemberId+'"><td data-memberId="'+getMemberId+'">'+getMemberName+'<i class="fa fa-star evo-green"></i></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId1+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId2+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId3+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId4+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId5+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId6+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId7+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId8+'"></td><td class="add_dot" data-memberId="'+getMemberId+'" data-taskId="'+taskId9+'"></td><td><a href="#"><i class="fa fa-trash-o remove-user" data-memberId="'+getMemberId+'"></i></a></td></tr>')	            	
	            }
	            $('#names').val("");
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	            console.log(jqXHR);
	            console.log(textStatus);
	            console.log(errorThrown);
	        }
	    });
	    event.preventDefault();
	});


	function addMe(campaignId, memberId) {
		projectId = campaignId;
		memberId = memberId;
		api = $('.get_api').attr('data-api');

	    var formURL = apiUrl+"campaigns/"+projectId+"/teammembers/";

	    $.ajax({
	        url: formURL+memberId,
	        type: 'PUT',
	        headers: { 
	            'x-wsse': 'ApiKey="'+api+'"'
	        },
	        success:function(data, textStatus, jqXHR) {
	        	console.log("YES");
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	            console.log(jqXHR);
	            console.log(textStatus);
	            console.log(errorThrown);
	        }
	    });
	    event.preventDefault();
	};




	$(document).on('click', '.hide_campaign', function() {



		if(confirm("Are you sure you want to delete this campaign?") == true) {
			campaignId = $(this).attr('data-campaignId');
			toRemove = $(this).parent().parent();
			console.log(campaignId);
			api = getCookie('api');

			$.ajax({
			    url: apiUrl+"campaigns/"+campaignId+"/notvisible.json?not_visible=1",
			    type: 'PUT',
			    headers: { 
			        'x-wsse': 'ApiKey="'+api+'"'
			    },
			    success:function(data, textStatus, jqXHR) {
			    	$(toRemove).fadeOut('slow');
			    	console.log("yes");
			    },
			    error: function(jqXHR, textStatus, errorThrown) {
			        console.log(jqXHR);
			        console.log(textStatus);
			        console.log(errorThrown);
			    }
			 });
		} else {
		   event.preventDefault();
		}

	});








	// TOGGLE REVIEWER

	$(document).on('click', '.toggle_review', function() {


		memberId = $(this).attr('data-memberId');
		projectId = $(this).attr('data-project-id');
		formURL = apiUrl+"campaigns/"+projectId+"/teammembers/"+memberId;

		if($(this).find('.fa').hasClass('evo-green')) {
			currentlyReviewer = true;
	 	} else {
	 		currentlyReviewer = false;
	 	}

	 	if(currentlyReviewer) { 
	 		$.ajax({
	 		    url: formURL,
	 		    type: 'PUT',
	 		    headers: { 
	 		        'x-wsse': 'ApiKey="'+api+'"'
	 		    },
	 		    data: {is_reviewer: 0},
	 		    success:function(data, textStatus, jqXHR) {
	 		    	$('.toggle_review[data-memberId="'+memberId+'"]').find('.fa').removeClass('evo-green');
	 		    	$('.toggle_review[data-memberId="'+memberId+'"]').find('.fa').addClass('not_reviewer');
	 		    	currentlyReviewer = false;
	 		    }
	 		});
	 	} else {
	 		$.ajax({
	 		    url: formURL,
	 		    type: 'PUT',
	 		    headers: { 
	 		        'x-wsse': 'ApiKey="'+api+'"'
	 		    },
	 		    data: {is_reviewer: 1},
	 		    success:function(data, textStatus, jqXHR) {
	 		    	$('.toggle_review[data-memberId="'+memberId+'"]').find('.fa').addClass('evo-green');
	 		    	$('.toggle_review[data-memberId="'+memberId+'"]').find('.fa').removeClass('not_reviewer');
	 		    	currentlyReviewer = true;
	 		    }
	 		});
	 	}



	});



	// EDIT CAMPAIGN
	$(document).on('change', '.check_presented', function() {
		if($('.check_presented').is(':checked')) {
			$('.already_presented').val(1);
		}
		else {
			$('.already_presented').val(0);
		}
	});


	// logout

	$(document).on('click', '.logout_btn', function() {

		delete_cookie("api");
		delete_cooke("dash_user_id");
		delete_cooke("PHPSESSID");
		window.location.href = '/login';
		return false;

	});


	$(document).on('change', '#taskName', function() {
		taskId = $(this).find(':selected').data('tasknameid')
		console.log(taskId);
		$('#fileType').prop('disabled', true);
		$.ajax({
			url: apiUrl+"tasks/"+taskId+"/filetypes",
			type: 'GET',
			headers: { 
			    'x-wsse': 'ApiKey="'+api+'"'
			},
			success:function(data, textStatus, jqXHR) {
				$('#fileType').removeAttr('disabled');
				$('#fileType').find('option').remove();

				arrayLength = data['FileTypes'].length;
				console.log(data['FileTypes']);
				for (i = 0; i < data['FileTypes'].length; i++) {
					console.log("hi");
					$('#fileType').append('<option value="'+data['FileTypes'][i]['FileTypeId']+'">'+data['FileTypes'][i]['FileTypeName']+'</option>');
				}


			},
			error:function(data,textStatus,jaXHR) {
				console.log(textStatus);
				console.log(data);
				console.log(jaXHR);
			}
		});
	});



	// hover over hitpoints

	$("#hit_points").find('path').hover(function() {

		$('#hit_points').find('path').each(function() {
			hitPoint = $(this).data('href');
			hitPoint = String(hitPoint);
			hitPoint = hitPoint.substr(0,1);
			$('.nav_wheel_task_'+hitPoint).attr('class', 'nav_wheel_task_'+hitPoint);
		});

		hitPoint = $(this).data('href');
		hitPoint = String(hitPoint);
		hitPoint = hitPoint.substr(0,1);
		$('.nav_wheel_task_'+hitPoint).attr('class', 'nav_wheel_task_'+hitPoint+' hover');
	});




















	$(document).on('click', '.export_ppt', function() {
		campaignID = $(this).attr('data-project-id');
		$.ajax({
		    url : apiUrl+"campaigns/"+campaignID+"/presentations/final-plan-outcome",
		    type: "GET",
		    headers: campaign_headers,
		    success:function(data, textStatus, jqXHR, request) {
		    	console.log("should have saved");
		    },
		    error: function(data, jqXHR, textStatus, errorThrown) {
		    	console.log(data);
		    	console.log(jqXHR);
		    	console.log(textStatus);
		    	console.log(errorThrown);
		    }
		});
	});


	if($('#files-table').length) {
		var filesTable = $('#files-table').DataTable({
		    "columnDefs": [
		        { "visible": false, "targets": 0 },
		        { "visible": false, "targets": 1 }
		    ],
		    // "sDom": '<"top"i>frt<"bottom"p><"clear">',
		    "order": [[ 0, 'asc' ]],
		    "displayLength": 100,
		    "paging": true,
		    // "info": false,
		    "drawCallback": function ( settings ) {
		        var api = this.api();
		        var rowNodes = api.rows( {page:'current'} ).nodes();
		        var rowData = api.rows( {page:'current'} ).data();
		        var last=null;
		        rowData.each( function ( group, i ) {
		            if ( last !== group[0] ) {
		                $(rowNodes).eq( i ).before(
		                    '<tr class="group"><td colspan="'+(group.length - 2)+'"><strong><a href="/campaign/'+group[0]+'/0">'+group[1]+'</a></strong></td></tr>'
		                );
		
		                last = group[0];
		            }
		        } );
		    }
		} );
	};
	
	if($('#tasks-table').length) {
		var tasksTable = $('#tasks-table').DataTable({
		    "columnDefs": [
		        { "visible": false, "targets": 8 }
		    ],
		    "order": [[ 0, 'desc' ]],
		    "paging": false,
		    // "searching": false,
		    "info": false,
		    "drawCallback": function drawChildren( settings ) {
	    		var t = this.api();
	    		for( i=0; i < t.rows()[0].length; i++ ) {
    				var content = t.row(i).data()[8];
    				if ( content !== "" ) {
    					t.row(i)
    					 .child($('<tr class="child-row"><td></td><td colspan=4>'+content+'</td><td></td><td></td><td></td></tr>')[0])
    					 .show();
    				}
	    		}
		    }
		});
	}

	if( $('#project-table').length ) {
		var projectTable = $('#project-table').DataTable({
			"paging": true,
			"pageLength": 50,
			// "searching": false,
			"info": false
		})
	} 
  
	$client_select.on('change', function() {
	 campaign.select_item( { "client_id" : this.value }, 'divisions.json', 'divisions', $client_select );
	});

	$division_select.on('change', function() {
    // if(this.prop('value') !== "" || this.prop('value') !== "-1") {
	   campaign.select_item( { "division_id" : this.value }, 'brands.json', 'brands', $division_select );
    // } else {
      // campaign.deselect_items($(this));
    // } 
	});

	$brand_select.on('change', function() {
    // if(this.prop('value') !== "" || this.prop('value') !== "-1") {
	   campaign.select_item( { "brand_id" : this.value }, 'productlines.json', 'productlines', $brand_select );
    // } else {
      // campaign.deselect_items($(this));
    // } 
	});

	$productline_select.on('change', function() {
    // if(this.prop('value') !== "" || this.prop('value') !== "-1") {
	   campaign.select_item( { "productline_id" : this.value }, 'products.json', 'products', $productline_select );
    // } else {
      // campaign.deselect_items($(this));
    // } 
	});

	$('ul.tabs').each(function(){
	    // For each set of tabs, we want to keep track of
	    // which tab is active and it's associated content
	    var $active, $content, $links = $(this).find('a');

	    // If the location.hash matches one of the links, use that as the active tab.
	    // If no match is found, use the first link as the initial active tab.
	    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
	    $active.addClass('active');

	    $content = $($active[0].hash);

	    // Hide the remaining content
	    $links.not($active).each(function () {
	      $(this.hash).hide();
	    });

	    // Bind the click event handler
	    $(this).on('click', 'a', function(e){
	      // Make the old tab inactive.
	      $active.removeClass('active');
	      $content.hide();

	      // Update the variables with the new link and content
	      $active = $(this);
	      $content = $(this.hash);

	      // Make the tab active.
	      $active.addClass('active');
	      $content.show();

	      // Prevent the anchor's default click action
	      e.preventDefault();
	    });
	  });


	expanded_open = false;
	$(document).on('click', '#menu-trigger', function(event) {
		if(!expanded_open) {
			$('#main-content').animate({"margin-left":"100px"},700, "easeOutQuart");
			$('#new-sidebar').animate({"margin-left":"0"},700, "easeOutQuart");
			expanded_open = true;
		} else {
			$('#main-content').animate({"margin-left":"0"},700,"easeOutQuart");
			$('#new-sidebar').animate({"margin-left":"-200px"},500,"easeOutQuart");
			expanded_open = false;
		}
		event.preventDefault();
	});


	$(document).on('click', '.file_task_icon', function(event) {
		//$(this).
		//event.preventDefault();
	});



	if($('#my-dropzone').length) {
		Dropzone.autoDiscover = false;

		project_id = $('.project_id').attr('data-project-id');

		url = apiUrl+"campaigns/"+project_id+"/files";
	  	api = getCookie("api");

	  	var myDropzone = new Dropzone("#my-dropzone", { 
	  		headers: {
				'x-wsse': 'ApiKey=\"'+api+'\"'
			},
			url: url,
			paramName: 'campaign_file',
			autoProcessQueue: false,
			thumbnailWidth: 80,
			thumbnailHeight: 80,
			parallelUploads: 20,
	        error: function(file, response) {
	        	console.log(response);
	        	alert("the server has rejected the file");
	        },
	        uploadprogress: function(file, progress, bytesSent) {
	        	console.log(progress);
	        	$('.dz-progress-bar').css({"width":progress+"%"}); 
	        	dec = progress/100;
	        	percentage = dec * pBarWidth;
	        	console.log(percentage);
				$('.progress_bar').css({"width":percentage+"px"});
	        }
		});
		myDropzone.on("sending", function(campaign_file, xhr, formData) {
			taskID = $('#taskName').val();
			fileType = $('#fileType').val();
			fileTypeName = $('#fileType option:selected').text();
			TasktypeName = $('#taskName option:selected').text();
			formData.append('task_id', taskID);
			formData.append('file_type_id', fileType);
		});
		myDropzone.on("addedfile", function(file) {
			console.log(file.name);
			$('.preview_filename').text(file.name);
			$('#my-dropzone').animate({"background-color":"rgba(67,187,239,0.2)"}, 500);
			$('#my-dropzone').find('td').animate({"opacity":"1"},500);
			$('#files-tout').css({"z-index":"-1"}).animate({"opacity":"0"}, 500);
			$('.select_drop').css({"pointer-events":"auto"});
			$('#process_files').css({"pointer-events":"auto"});

			pBarTop = $('#my-dropzone').position().top+"px";
			pBarLeft = $('#my-dropzone').position().left+"px";
			pBarWidth = $('#my-dropzone').width()+2;
			pBarHeight = $('#my-dropzone').height()+2;

			$('#files_table').append('<div class="progress_bar" style="z-index: -1; background-color: #43bbef; position: absolute; top: '+pBarTop+'; left: '+pBarLeft+'; width: 0; height: '+pBarHeight+'px;"></div>');

			$('#process_files').click(function(e) {
			    myDropzone.processQueue();
			    e.preventDefault();
			    console.log("clicked");
			});
		});
		myDropzone.on("complete", function(file) {
			$('#my-dropzone').parent().find('tr:nth-of-type(2)').before("<tr><td>"+file.name+"</td><td>"+TasktypeName+"</td><td>"+fileTypeName+"</td><td>&nbsp;</td><td>Just Now</td><td>&nbsp;</td></tr>");
			$('#my-dropzone').animate({"background-color":"#fff"}, 500);
			$('#my-dropzone').find('td').animate({"opacity":"0"},500);
			$('.select_drop').css({"pointer-events":"none"});
			$('#process_files').css({"pointer-events":"none"});
			$('#files-tout').css({"z-index":"100"}).animate({"opacity":"1"}, 500);
			//$('.progress_bar').remove();
			myDropzone.removeAllFiles(true);
		});
		myDropzone.on("dragenter", function() {
			$('#my-dropzone').animate({"background-color":"rgba(67,187,239,0.2)"}, 500);
		});
		myDropzone.on("dragleave", function() {
			$('#my-dropzone').animate({"background-color":"white"}, 500);
		});
	}


	// specific file upload

	if($('.file_drop_1').length) {

		Dropzone.autoDiscover = false;

		project_id = $('.file_drop_1').attr('data-project-id');
		console.log(project_id);

		url = apiUrl+"campaigns/"+project_id+"/files";
	  	api = getCookie("api");




	  	var mySpecificDropzone = new Dropzone(".file_drop_1", { 
	  		headers: {
				'x-wsse': 'ApiKey=\"'+api+'\"'
			},
			url: url,
			paramName: 'campaign_file',
			thumbnailWidth: 80,
			thumbnailHeight: 80,
			parallelUploads: 20,
	        error: function(file, response) {
	        	console.log(response);
	        	alert("the server has rejected the file");
	        	console.log(fileType);
	        },
	        uploadprogress: function(file, progress, bytesSent) {
	        	console.log(progress);
	        	$('.inner_progress_bar').css({"width":progress+"%"});
	        }
		});
		mySpecificDropzone.on("sending", function(file, xhr, formData) {
			formData.append('task_id', taskID);
			formData.append('file_type_id', fileType);
			console.log(taskID);
			console.log(fileType);
			console.log(xhr);
			console.log(formData);
			console.log(file.name);
		});
		mySpecificDropzone.on("addedfile", function(file) {


			taskID = $('.file_drop_1').attr('data-task-id');
			fileType = $('.file_drop_1').attr('data-task-type');
			formId = $('.file_drop_1').attr('data-form-id');

			fileName = $('.file_drop_1').attr('data-file-name');
			if(fileName!=null) {
				fileNameRequired = true;
				console.log("file name required");
				console.log(fileName);
			} else {
				fileNameRequired = false;
				console.log("file name not required");
			}

			console.log(formId);

			console.log("file name: "+file.name);
			actualFileName = file.name;

			if(fileNameRequired) {
				if(file.name != fileName) {
					alert("Wrong file name. Please attach only " + fileName);
					$this.removeAllFiles(true);
				} else {
					$('.file_drop_1').html("<span><i class=\"fa fa-spinner fa-spin\"></i> uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
				}
			} else {
				$('.file_drop_1').html("<span><i class=\"fa fa-spinner fa-spin\"></i> uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
			}
		});
		mySpecificDropzone.on("complete", function(file, xhr) {
			console.log("response");
			console.log("response:"+xhr);
			console.log("fileType"+fileType);
			console.log("it has uploaded");
			$(this).find('fa').remove();
			$('.file_drop_1').html("<i class=\"fa fa-check\"></i>"+ file.name.slice(0,15) +" successfully uploaded");
		});
		mySpecificDropzone.on("dragenter", function() {
			$('.file_drop_1').animate({"background-color":"#ecf8fd"}, 500);
		});
		mySpecificDropzone.on("dragleave", function() {
			$('.file_drop_1').animate({"background-color":"white"}, 500);
		});
	}



	if($('.file_drop_2').length) {

		Dropzone.autoDiscover = false;

		project_id = $('.file_drop_2').attr('data-project-id');
		console.log(project_id);

		url = apiUrl+"campaigns/"+project_id+"/files";
	  	api = getCookie("api");

	  	var mySpecificDropzone = new Dropzone(".file_drop_2", { 
	  		headers: {
				'x-wsse': 'ApiKey=\"'+api+'\"'
			},
			url: url,
			paramName: 'campaign_file',
			thumbnailWidth: 80,
			thumbnailHeight: 80,
			parallelUploads: 20,
	        error: function(file, response) {
	        	console.log(response);
	        	alert("the server has rejected the file");
	        	console.log(fileType);
	        },
	        uploadprogress: function(file, progress, bytesSent) {
	        	console.log(progress);
	        	$('.inner_progress_bar').css({"width":progress+"%"});
	        }
		});
		mySpecificDropzone.on("sending", function(file, xhr, formData) {
			formData.append('task_id', taskID);
			formData.append('file_type_id', fileType);
			console.log(taskID);
			console.log(fileType);
			console.log(xhr);
			console.log(formData);
			console.log(file.name);
		});
		mySpecificDropzone.on("addedfile", function(file) {


			taskID = $('.file_drop_2').attr('data-task-id');
			fileType = $('.file_drop_2').attr('data-task-type');
			formId = $('.file_drop_2').attr('data-form-id');

			fileName = $('.file_drop_2').attr('data-file-name');
			if(fileName!=null) {
				fileNameRequired = true;
				console.log("file name required");
				console.log(fileName);
			} else {
				fileNameRequired = false;
				console.log("file name not required");
			}

			console.log(formId);

			console.log("file name: "+file.name);
			actualFileName = file.name;

			if(fileNameRequired) {
				if(file.name != fileName) {
					alert("Wrong file name. Please attach only " + fileName);
					$this.removeAllFiles(true);
				} else {
					$('.file_drop_2').html("<span><i class=\"fa fa-spinner fa-spin\"></i> uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
				}
			} else {
				$('.file_drop_2').html("<span><i class=\"fa fa-spinner fa-spin\"></i> uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
			}
		});
		mySpecificDropzone.on("complete", function(file, xhr) {
			console.log("response");
			console.log("response:"+xhr);
			console.log("it has uploaded");
			console.log("fileType"+fileType);
			$(this).find('fa').remove();
			$('.file_drop_2').html("<i class=\"fa fa-check\"></i>"+ file.name.slice(0,15) +" successfully uploaded");
		});
		mySpecificDropzone.on("dragenter", function() {
			$('.file_drop_2').animate({"background-color":"#ecf8fd"}, 500);
		});
		mySpecificDropzone.on("dragleave", function() {
			$('.file_drop_2').animate({"background-color":"white"}, 500);
		});
	}

	
	if($('.file_drop_3').length) {

		Dropzone.autoDiscover = false;

		project_id = $('.file_drop_3').attr('data-project-id');
		console.log(project_id);

		url = apiUrl+"campaigns/"+project_id+"/files";
	  	api = getCookie("api");




	  	var mySpecificDropzone = new Dropzone(".file_drop_3", { 
	  		headers: {
				'x-wsse': 'ApiKey=\"'+api+'\"'
			},
			url: url,
			paramName: 'campaign_file',
			thumbnailWidth: 80,
			thumbnailHeight: 80,
			parallelUploads: 20,
	        error: function(file, response) {
	        	console.log(response);
	        	alert("the server has rejected the file");
	        	console.log(fileType);
	        },
	        uploadprogress: function(file, progress, bytesSent) {
	        	console.log(progress);
	        	$('.inner_progress_bar').css({"width":progress+"%"});
	        }
		});
		mySpecificDropzone.on("sending", function(file, xhr, formData) {
			formData.append('task_id', taskID);
			formData.append('file_type_id', fileType);
			console.log(taskID);
			console.log(fileType);
			console.log(xhr);
			console.log(formData);
			console.log(file.name);
		});
		mySpecificDropzone.on("addedfile", function(file) {


			taskID = $('.file_drop_3').attr('data-task-id');
			fileType = $('.file_drop_3').attr('data-task-type');
			formId = $('.file_drop_3').attr('data-form-id');

			fileName = $('.file_drop_3').attr('data-file-name');
			if(fileName!=null) {
				fileNameRequired = true;
				console.log("file name required");
				console.log(fileName);
			} else {
				fileNameRequired = false;
				console.log("file name not required");
			}

			console.log(formId);

			console.log("file name: "+file.name);
			actualFileName = file.name;

			if(fileNameRequired) {
				if(file.name != fileName) {
					alert("Wrong file name. Please attach only " + fileName);
					$this.removeAllFiles(true);
				} else {
					$('.file_drop_3').html("<span><i class=\"fa fa-spinner fa-spin\"></i> uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
				}
			} else {
				$('.file_drop_3').html("<span><i class=\"fa fa-spinner fa-spin\"></i>uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
			}
		});
		mySpecificDropzone.on("complete", function(file, xhr) {
			console.log("response");
			console.log("response:"+xhr);
			console.log("fileType"+fileType);
			console.log("it has uploaded");
			$(this).find('fa').remove();
			$('.file_drop_3').html("<i class=\"fa fa-check\"></i>"+ file.name.slice(0,15) +" successfully uploaded");
		});
		mySpecificDropzone.on("dragenter", function() {
			$('.file_drop_3').animate({"background-color":"#ecf8fd"}, 500);
		});
		mySpecificDropzone.on("dragleave", function() {
			$('.file_drop_3').animate({"background-color":"white"}, 500);
		});
	}



	$(document).on('click', '.show_confirm', function(event) {
		if(confirm("This will wipe all current progress in Matrix. Do you still want to do this?") == true) {
		}else {
		   event.preventDefault();
		}
	});








	if($('#present-filter').length) {
		if ($('#campaign-holder')) {
			dashboard.initialize();
		}
	}
	
	$('#stat-filter').on('change', function (e) {
    sortValue = $('#stat-filter option:selected').val();
    sortOptions = this.value + ' client:asc campaign:asc';
    $('#campaign-holder').mixItUp('sort', sortOptions)
	});

	$('#present-filter').on('change', function (e) {
	    presented = $('#present-filter option:selected').val();
		sortValue = $('#stat-filter option:selected').val();
		sortOptions = this.value + ' client:asc campaign:asc';
		$('#campaign-holder').mixItUp('multiMix', {
			filter: presented,
			sort: sortOptions
		});
	});

	if($('.wheel_holder').length) {
		$('.wheel_holder').css({"height":+$(window).height()-40}); 
		$('.project_data_sidebar').css({"min-height":+$(window).height()});
	}
	if($('.section').length) {
		$('.section').css({"height":+$(window).height()/2});
	}

	// ACTION BTN - LOAD CONTENT USING APP.JS
	$(document).on('click', '.btn_action', function() {
		pageUrl = $(this).attr('href');
		if(!pageUrl) {
			pageUrl = $(this).attr('data-href');
		}
		//$.app.loadContent();
		window.location.href = pageUrl;
	});

	$(document).on('click', '.close_pop', function() {
		$('.opacity').fadeOut('fast');
		$('#file_modal').fadeOut('fast');
		$('.opacity').css({"z-index":"0"});
	});


	$(document).on('click', '.force_check', function(event) {
		check_comms();
		event.preventDefault();
	});
	$(document).on('click', '.force_check2', function(event) {
		check_fund();
		event.preventDefault();
	});

	$(document).on('click', '.force_check3', function(event) {
		check_phasing();
		event.preventDefault();
	});

	$(document).on('click', '.await_response', function(event) {
		$('.placeholder').css({"display": "block"});
		if(!$('.awaiting_response_container').length) {
			$('.placeholder').append('<div class="awaiting_response_container"><div class="evo-space-biggest"></div><p class="evo-text evo-white">Waiting for a response</p><div class="evo-space"></div><div id="circle"><span>'+countdown+'</span></div><div class="evo-space"></div><a href="#" class="evo-white force_check">check now</a></div>');
		}
		rotate = 0;
		$('#circle').circleProgress({
	        value: 1,
	        size: 80,
	        startAngle: -Math.PI / 2,
	        fill: {
	            color: "rgba(0,0,0,.5)"
	        },
	        animation: { 
	        	duration: 31000
	        },
	        emptyFill: "#fff",
	        reverse: true
	    });
	    delay_check(1000);
	});
	$(document).on('click', '.await_response2', function(event) {
		$('.placeholder').css({"display": "block"});
		if(!$('.awaiting_response_container').length) {
			$('.placeholder').append('<div class="awaiting_response_container"><div class="evo-space-biggest"></div><p class="evo-text evo-white">Waiting for a response</p><div class="evo-space"></div><div id="circle"><span>'+countdown+'</span></div><div class="evo-space"></div><a href="#" class="evo-white force_check2">check now</a></div>');
		}
		rotate = 0;
		$('#circle').circleProgress({
	        value: 1,
	        size: 80,
	        startAngle: -Math.PI / 2,
	        fill: {
	            color: "rgba(0,0,0,.5)"
	        },
	        animation: { 
	        	duration: 31000
	        },
	        emptyFill: "#fff",
	        reverse: true
	    });
	    delay_check2(1000);
	});

	$(document).on('click', '.await_response3', function(event) {
		$('.placeholder').css({"display": "block"});
		if(!$('.awaiting_response_container').length) {
			$('.placeholder').append('<div class="awaiting_response_container"><div class="evo-space-biggest"></div><p class="evo-text evo-white">Waiting for a response</p><div class="evo-space"></div><div id="circle"><span>'+countdown+'</span></div><div class="evo-space"></div><a href="#" class="evo-white force_check3">check now</a></div>');
		}
		rotate = 0;
		$('#circle').circleProgress({
	        value: 1,
	        size: 80,
	        startAngle: -Math.PI / 2,
	        fill: {
	            color: "rgba(0,0,0,.5)"
	        },
	        animation: { 
	        	duration: 31000
	        },
	        emptyFill: "#fff",
	        reverse: true
	    });
	    delay_check3(1000);
	});


	$(document).on('submit', '#gen_file', function() {
		console.log("hi");
		event.preventDefault();
		api = getCookie("api");
	    var postData = $(this).serializeArray();
	    var formURL = apiUrl+"campaigns/78f34834-9564-42ec-90cc-9435e0d9e0c6/downloadfile?";
	    $.ajax({ 
	        url : formURL,
	        type: 'GET',
	        headers: { 
	            'x-wsse': 'ApiKey="'+api+'"'
	        },
	        data : postData,
	        success:function(data, textStatus, jqXHR) {
	        	console.log(jqXHR);
	            console.log(textStatus);
	            console.log(errorThrown);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	        	console.log(jqXHR);
	            console.log(textStatus);
	            console.log(errorThrown);
	        }
	    });
	});


	$(document).on('click', '.campaign_presented', function() {
			
			
			cStatus = $(this).attr('data-campaign-status');
			campaignID = $(this).attr('data-project-id');
			statusUpdate = $(this);
			
			if(cStatus == "Build") {
				cStatusNumber = 2;
			}
			if(cStatus == "Approved") {
				cStatusNumber = 1;
			}

			$.ajax({
			    url : apiUrl+"campaigns/"+campaignID+"/status",
			    type: "PUT",
			    headers: campaign_headers,
			    data: "campaign_status="+cStatusNumber,
			    success:function(data, textStatus, jqXHR, request) {
			    	console.log("success");
			    	if(cStatus == "Build") {
			    		$(statusUpdate).attr('data-campaign-status', "Approved");
			    		$(statusUpdate).find('.fa').removeClass('unapproved').addClass('approved');
			    		$(statusUpdate).find('p').removeClass('unapproved').addClass('approved_text');
			    	}
			    	if(cStatus == "Approved") {	
			    		$(statusUpdate).attr('data-campaign-status', "Build");
			    		$(statusUpdate).find('.fa').removeClass('approved').addClass('unapproved');
			    		$(statusUpdate).find('p').removeClass('approved_text').addClass('unapproved');
			    	}
			    },
			    error: function(jqXHR, textStatus, errorThrown) {
			    	console.log(jqXHR);
			    	console.log(textStatus);
			    	console.log(errorThrown);
			    	jsonResponse = JSON.parse(jqXHR.responseText);
			    	console.log(jsonResponse.message);
			    	if(jsonResponse.message == "Data input failed validation.") {
			    		$('.alert_bar').text("Please insure all fields are complete.");
			    		$('.alert_bar').css({"display":"block"}).animate({"opacity":"1"}, 500, function() {
			    			$(this).delay(2500).animate({"opacity":"0"},500, function() {
			    				$(this).css({"display":"block"});
			    			})
			    		});
			    	}
			    	if(jsonResponse.message == "This authenticated user does not have access to update this campaign.") {
			    		$('.alert_bar').text(jsonResponse.message);
			    		$('.alert_bar').css({"display":"block"}).animate({"opacity":"1"}, 500, function() {
			    			$(this).delay(2500).animate({"opacity":"0"},500, function() {
			    				$(this).css({"display":"block"});
			    			})
			    		});
			    	}
			    }
			});
		});

















	open = false;
	newCampaignOpen = false;

	$(document).on('click', '.fa-chevron-down, .avatar_img', function(event) {
		if(open == false) {
			$('.fa-chevron-down').addClass('fa-flip-vertical');
			$('.user_panel').css({"display":"block","pointer-events":"auto"}).stop().animate({"opacity":1},200, function() {
				open = true;
			});
		}
	});
	$('body').click(function() {
		if(open == true) {
			$('.user_panel').stop().animate({"opacity":0},200, function() {
				$('.fa-chevron-down').removeClass('fa-flip-vertical');
				$(this).css({"display":"none","pointer-events":"none"});
			});
		}
		open = false;
	});

	$(document).on('click', '.opacity', function(event) {
		if(newCampaignOpen == true) {
			$('#new_campaign_container').animate({"left":"-400px"}, 600);
			$('.container').animate({"opacity":"1"},600);
			$('.project_data_sidebar').parent().animate({"zoom":"1","opacity":"1","background-color":"#fff"},500);
			$('.opacity').animate({"opacity":"0"},500, function() {
				$(this).css({"display":"none"});
				newCampaignOpen = false;
			});
		}
	});

	$(document).on('change', 'select', function(event) {
		$(this).addClass('changed');
	});
	$(document).on('click', '.create_campaign_btn', function(event) {
		$('#new_campaign_container').animate({"left":"80px"}, 600);
		$('.container').animate({"opacity":".4"},600);
		$('.opacity').css({"display":"block"}).animate({"opacity":"1"},500, function() {
			newCampaignOpen = true;
		});
		event.preventDefault();
	});
	$(document).on('click', '.edit_campaign_btn', function(event) {
		$('#new_campaign_container').animate({"left":"80px"}, 600);
		$('.container').animate({"opacity":".4"},600);
		$('.opacity').animate({"opacity":"1"},500);
		$('.project_data_sidebar').parent().animate({"zoom":".5", "opacity":"0","background-color":"transparent"},500);
		$('.opacity').css({"display":"block"}).animate({"opacity":"1"},500, function() {
			newCampaignOpen = true;
		});
		event.preventDefault();
	});


	$(document).on('click', '.launch_files', function(event) {
		$('#file_modal').css({"display":"block"}).animate({"opacity":1},500);
		$('.opacity').css({"z-index":"999","display":"block"}).animate({"opacity":"1"},500);
		event.preventDefault();
	});

// close the edit campaign window

	$(document).on('click', '.close_window.campaign-edit', function(event) {
		$('#new_campaign_container').animate({"left":"-400px"},600);
		$('.opacity').css({"display":"none"});
		$('.project_data_sidebar').parent().animate({"zoom":"1", "opacity":"1","background-color":"white"},500);
		event.preventDefault();
	});



	// CREATE A NEW CAMPAIGN

	$(document).on('submit', '#new_campaign', function(event) {
		event.preventDefault();
		api = $('.get_api').attr('data-api');
		console.log(api);
	    var postData = $(this).serializeArray();
	    var formURL = $(this).attr("action");
	    $.ajax({
	        url : formURL,
	        type: "POST",
	        headers: { 
	            'x-wsse': 'ApiKey="'+api+'"'
	        },
	        data : postData,
	        success:function(data, textStatus, jqXHR) {
	           //$('#new_campaign').fadeOut('fast');
	            //$('#new_campaign').parent().append('<div class="confirmation"></div>');
	            campaignId = data['campaignID'];
	            //$('.confirmation').html('New Campaign has been created. Click <a href="/campaign/'+campaignId+'/0">here</a> to continue');
	            console.log(data);
	            pageUrl = "/campaign/"+campaignId+"/0"
	            window.location.href = pageUrl;

	            memberId = getCookie('dash_user_id')

	            addMe(campaignId, memberId);



	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	            console.log(jqXHR);
	            console.log(textStatus);
	            console.log(errorThrown);
	            jsonResponse = JSON.parse(jqXHR.responseText);
	            console.log(jsonResponse.message);
	            if(jsonResponse.message == "Data input failed validation.") {
	            	$('.alert_bar').text("Please insure all fields are complete.");
	            	$('.alert_bar').css({"display":"block"}).animate({"opacity":"1"}, 500, function() {
	            		$(this).delay(2500).animate({"opacity":"0"},500, function() {
	            			$(this).css({"display":"block"});
	            		})
	            	});
	            }
	            if(jsonResponse.message == "The Completion Date must be later than the Client Deliverable Date. (1 day minimum)") {
	            	$('.alert_bar').text(jsonResponse.message);
	            	$('.alert_bar').css({"display":"block"}).animate({"opacity":"1"}, 500, function() {
	            		$(this).delay(2500).animate({"opacity":"0"},500, function() {
	            			$(this).css({"display":"block"});
	            		})
	            	});
	            }
	            if(jsonResponse.message == "This authenticated user does not have access to update this campaign.") {
	            	$('.alert_bar').text(jsonResponse.message);
	            	$('.alert_bar').css({"display":"block"}).animate({"opacity":"1"}, 500, function() {
	            		$(this).delay(2500).animate({"opacity":"0"},500, function() {
	            			$(this).css({"display":"block"});
	            		})
	            	});
	            }
	        }
	    });
	    event.preventDefault();
	});

	// UPDATE JTBD 


	$(document).on('click', '#submitJTBD', function(event) {
		console.log("hi");
		$('#update_jtbd').submit();
		event.preventDefault();
	})

	$(document).on('submit', '#update_jtbd', function(event) {
		console.log("hi");
		event.preventDefault();
		api = $('.get_api').attr('data-api');
		console.log(api);

		$('.save-data').find('span').text("saving");
		$('.save-data').css({"display":"block"}).animate({"opacity":"1"}, 250);
		$('.save-data').find('.fa').remove();
		$('.save-data').prepend('<i class="fa fa-spinner fa-spin"></i>');


	    var postData = $(this).serializeArray();
	    var formURL = $(this).attr("action");
	    $.ajax({
	        url : formURL,
	        type: 'PUT',
	        headers: { 
	            'x-wsse': 'ApiKey="'+api+'"'
	        },
	        data : postData,
	        success:function(data, textStatus, jqXHR) {
	            //$('#new_campaign').fadeOut('fast');
	            //$('#new_campaign').parent().append('<div class="confirmation"></div>');
	            //campaignId = data['campaignID'];
	            // $('.confirmation').html('New Campaign has been created. Click <a href="/campaign/'+campaignId+'/0">here</a> to continue');
	            $('.save-data').find('.fa').remove();
	            $('.save-data').prepend('<div class="fa fa-check"></i>');
	            $('.save-data').find('span').text("updated");
	            $('.save-data').delay(3000).animate({"opacity":"0"}, 250, function() {
	            	$('.save-data').css({"display":"none"});
	            });
	            console.log(data);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	            console.log(jqXHR);
	            console.log(textStatus);
	            console.log(errorThrown);
	        }
	    });
	    event.preventDefault();
	});
	
	$(document).on('submit', '#update_reallives', function(event) {
		$('.save-data').find('span').text("saving");
		$('.save-data').css({"display":"block"}).animate({"opacity":"1"}, 250);
		$('.save-data').find('.fa').remove();
		$('.save-data').prepend('<i class="fa fa-spinner fa-spin"></i>');
		realLivesURL = $('#get_real_lives_url').val();
		realLivesPass = $('#get_real_lives_pass').val();
		event.preventDefault();
		api = getCookie("api");
		console.log(api);
	    var postData = $(this).serializeArray();
	    var formURL = $(this).attr("action");
	    $.ajax({
	        url : formURL,
	        type: 'PUT',
	        headers: { 
	            'x-wsse': 'ApiKey="'+api+'"'
	        },
	        data : postData,
	        success:function(data, textStatus, jqXHR, postData) {
	        	$('.save-data').find('.fa').remove();
	        	$('.save-data').prepend('<div class="fa fa-check"></i>');
	        	$('.save-data').find('span').text("updated");
	        	$('.save-data').delay(1000).animate({"opacity":"0"}, 250, function() {
	        		$('.save-data').css({"display":"none"});
	        		$('.hidden_viz').css({"opacity":"0", "display":"block"}).animate({"opacity":"1"},500);
	        		$('.hidden_rl_creds').css({"display":"none"});
	        		$('.change_btn_text').text("update");
	        		$('.warning_tout').addClass('hidden');
	        	});
	            console.log(data);

	            if($('.task_bar_right').length) {

	            	if(realLivesPass) {
	            		realLivesURL = realLivesURL+"&directguid="+realLivesPass;
	            	}

	            	$('.task_bar_right').html('<a href="'+realLivesURL+'" target="_blank"><span class="evo-text-smaller"><i class="fa fa-file-o"></i> view real lives presentation</span></a><span class="evo-text-right show_rl_creds"><i class="fa fa-gear" title="Edit Real Lives Credentials"></i></span>');
	            } else {
	            	$('.task_bar').append('<div class="task_bar_right"><a href="'+realLivesURL+'" target="_blank"><span class="evo-text-smaller"><i class="fa fa-file-o"></i> view real lives presentation</span></a><span class="evo-text-right show_rl_creds"><i class="fa fa-gear" title="Edit Real Lives Credentials"></i></span></div>');
	            }
	           



	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	            console.log(jqXHR);
	            console.log(textStatus);
	            console.log(errorThrown);
	        }
	    });
	    event.preventDefault();
	});


	$(document).on('click', '.show_rl_creds', function(event) {
		$('.display_viz').animate({"opacity":"0"}, 250, function() {
			$(this).css({"opacity":"0","display":"none"});
			$(this).addClass('hidden_viz');
			$('.hidden_rl_creds').css({"display":"block","opacity":"0"}).animate({"opacity":"1"}, 250);
			$('.warning_tout').removeClass('hidden');
		});


	});





	$(document).on('submit', '#update_campaignidea', function(event) {
		$('.save-data').find('span').text("saving");
		$('.save-data').css({"display":"block"}).animate({"opacity":"1"}, 250);
		$('.save-data').find('.fa').remove();
		$('.save-data').prepend('<i class="fa fa-spinner fa-spin"></i>');
		console.log("hi");
		event.preventDefault();
		api = getCookie("api");
		console.log(api);
	    var postData = $(this).serializeArray();
	    var formURL = $(this).attr("action");
	    $.ajax({
	        url : formURL,
	        type: 'PUT',
	        headers: { 
	            'x-wsse': 'ApiKey="'+api+'"'
	        },
	        data : postData,
	        success:function(data, textStatus, jqXHR) {
	        	$('.save-data').find('.fa').remove();
	        	$('.save-data').prepend('<div class="fa fa-check"></i>');
	        	$('.save-data').find('span').text("updated");
	        	$('.save-data').delay(3000).animate({"opacity":"0"}, 250, function() {
	        		$('.save-data').css({"display":"none"});
	        	});
	            console.log("good job");
	            console.log(data);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	            console.log(jqXHR);
	            console.log(textStatus);
	            console.log(errorThrown);
	        }
	    });
	    event.preventDefault();
	});


	$(document).on('click', '.replace_file_2', function(event) {
		replaceText = $(this).attr('data-text');
		$('.file_2').addClass('file_drop_2').html("<i class=\"fa fa-file-o\"></i>"+replaceText);

		event.preventDefault();
	


			if($('.file_drop_2').length) {


			Dropzone.autoDiscover = false;

			project_id = $('.file_drop_2').attr('data-project-id');
			console.log(project_id);

			url = apiUrl+"campaigns/"+project_id+"/files";
			api = getCookie("api");

		  	var mySpecificDropzone = new Dropzone(".file_drop_2", { 
		  		headers: {
					'x-wsse': 'ApiKey=\"'+api+'\"'
				},
				url: url,
				paramName: 'campaign_file',
				thumbnailWidth: 80,
				thumbnailHeight: 80,
				parallelUploads: 20,
		        error: function(file, response) {
		        	console.log(response);
		        	alert("the server has rejected the file");
		        	console.log(fileType);
		        },
		        uploadprogress: function(file, progress, bytesSent) {
		        	console.log(progress);
		        	$('.dz-progress').css({"width":progress+"%"}); 
		        }
			});
			mySpecificDropzone.on("sending", function(file, xhr, formData) {
				formData.append('task_id', taskID);
				formData.append('file_type_id', fileType);
				console.log(taskID);
				console.log(fileType);
				console.log(xhr);
				console.log(formData);
				console.log(file.name);
			});
			mySpecificDropzone.on("addedfile", function(file) {


				taskID = $('.file_drop_2').attr('data-task-id');
				fileType = $('.file_drop_2').attr('data-task-type');
				formId = $('.file_drop_2').attr('data-form-id');

				fileName = $('.file_drop_2').attr('data-file-name');
				if(fileName!=null) {
					fileNameRequired = true;
					console.log("file name required");
					console.log(fileName);
				} else {
					fileNameRequired = false;
					console.log("file name not required");
				}

				console.log(formId);

				console.log("file name: "+file.name);
				actualFileName = file.name;

				if(fileNameRequired) {
					if(file.name != fileName) {
						alert("Wrong file name. Please attach only " + fileName);
						$this.removeAllFiles(true);
					} else {
						$('.file_drop_2').html("<span><i class=\"fa fa-spinner fa-spin\"></i> uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
					}
				} else {
					$('.file_drop_2').html("<span><i class=\"fa fa-spinner fa-spin\"></i> uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
				}
			});
			mySpecificDropzone.on("complete", function(file, xhr) {
				console.log("response");
				console.log("response:"+xhr);
				console.log("fileType"+fileType);
				console.log("it has uploaded");
				$(this).find('fa').remove();
				$('.file_drop_2').html("<i class=\"fa fa-check\"></i>"+ file.name.slice(0,15) +" successfully uploaded");
			});
			mySpecificDropzone.on("dragenter", function() {
				$('.file_drop_2').animate({"background-color":"#ecf8fd"}, 500);
			});
			mySpecificDropzone.on("dragleave", function() {
				$('.file_drop_2').animate({"background-color":"white"}, 500);
			});
		}
	});
	$(document).on('click', '.replace_file_1', function(event) {
		replaceText = $(this).attr('data-text');
		$('.file_1').addClass('file_drop_1').html("<i class=\"fa fa-file-o\"></i>"+replaceText);
		event.preventDefault();


		if($('.file_drop_1').length) {

			Dropzone.autoDiscover = false;

			project_id = $('.file_drop_1').attr('data-project-id');
			console.log(project_id);

			url = apiUrl+"campaigns/"+project_id+"/files";
		  	api = getCookie("api");




		  	var mySpecificDropzone = new Dropzone(".file_drop_1", { 
		  		headers: {
					'x-wsse': 'ApiKey=\"'+api+'\"'
				},
				url: url,
				paramName: 'campaign_file',
				thumbnailWidth: 80,
				thumbnailHeight: 80,
				parallelUploads: 20,
		        error: function(file, response) {
		        	console.log(response);
		        	alert("the server has rejected the file");
		        	console.log(fileType);
		        },
		        uploadprogress: function(file, progress, bytesSent) {
		        	console.log(progress);
		        	$('.dz-progress').css({"width":progress+"%"}); 
		        }
			});
			mySpecificDropzone.on("sending", function(file, xhr, formData) {
				formData.append('task_id', taskID);
				formData.append('file_type_id', fileType);
				console.log(taskID);
				console.log(fileType);
				console.log(xhr);
				console.log(formData);
				console.log(file.name);
			});
			mySpecificDropzone.on("addedfile", function(file) {


				taskID = $('.file_drop_1').attr('data-task-id');
				fileType = $('.file_drop_1').attr('data-task-type');
				formId = $('.file_drop_1').attr('data-form-id');

				fileName = $('.file_drop_1').attr('data-file-name');
				if(fileName!=null) {
					fileNameRequired = true;
					console.log("file name required");
					console.log(fileName);
				} else {
					fileNameRequired = false;
					console.log("file name not required");
				}

				console.log(formId);

				console.log("file name: "+file.name);
				actualFileName = file.name;

				if(fileNameRequired) {
					if(file.name != fileName) {
						alert("Wrong file name. Please attach only " + fileName);
						$this.removeAllFiles(true);
					} else {
						$('.file_drop_1').html("<span><i class=\"fa fa-spinner fa-spin\"></i> uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
					}
				} else {
					$('.file_drop_1').html("<span><i class=\"fa fa-spinner fa-spin\"></i> uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
				}
			});
			mySpecificDropzone.on("complete", function(file, xhr) {
				console.log("response");
			console.log("response:"+xhr);
				console.log("fileType"+fileType);
				console.log("it has uploaded");
				$(this).find('fa').remove();
				$('.file_drop_1').html("<i class=\"fa fa-check\"></i>"+ file.name.slice(0,15) +" successfully uploaded");
			});
			mySpecificDropzone.on("dragenter", function() {
				$('.file_drop_1').animate({"background-color":"#ecf8fd"}, 500);
			});
			mySpecificDropzone.on("dragleave", function() {
				$('.file_drop_1').animate({"background-color":"white"}, 500);
			});
		}
	})

$(document).on('click', '.replace_file_3', function(event) {
		replaceText = $(this).attr('data-text');
		$('.file_3').addClass('file_drop_3').html("<i class=\"fa fa-file-o\"></i>"+replaceText);
		event.preventDefault();


		if($('.file_drop_3').length) {

			Dropzone.autoDiscover = false;

			project_id = $('.file_drop_3').attr('data-project-id');
			console.log(project_id);

			url = apiUrl+"campaigns/"+project_id+"/files";
		  	api = getCookie("api");




		  	var mySpecificDropzone = new Dropzone(".file_drop_3", { 
		  		headers: {
					'x-wsse': 'ApiKey=\"'+api+'\"'
				},
				url: url,
				paramName: 'campaign_file',
				thumbnailWidth: 80,
				thumbnailHeight: 80,
				parallelUploads: 20,
		        error: function(file, response) {
		        	console.log(response);
		        	alert("the server has rejected the file");
		        	console.log(fileType);
		        },
		        uploadprogress: function(file, progress, bytesSent) {
		        	console.log(progress);
		        	$('.dz-progress').css({"width":progress+"%"}); 
		        }
			});
			mySpecificDropzone.on("sending", function(file, xhr, formData) {
				formData.append('task_id', taskID);
				formData.append('file_type_id', fileType);
				console.log(taskID);
				console.log(fileType);
				console.log(xhr);
				console.log(formData);
				console.log(file.name);
			});
			mySpecificDropzone.on("addedfile", function(file) {


				taskID = $('.file_drop_3').attr('data-task-id');
				fileType = $('.file_drop_3').attr('data-task-type');
				formId = $('.file_drop_3').attr('data-form-id');

				fileName = $('.file_drop_3').attr('data-file-name');
				if(fileName!=null) {
					fileNameRequired = true;
					console.log("file name required");
					console.log(fileName);
				} else {
					fileNameRequired = false;
					console.log("file name not required");
				}

				console.log(formId);

				console.log("file name: "+file.name);
				actualFileName = file.name;

				if(fileNameRequired) {
					if(file.name != fileName) {
						alert("Wrong file name. Please attach only " + fileName);
						$this.removeAllFiles(true);
					} else {
						$('.file_drop_3').text("uploading "+ actualFileName);
					}
				} else {
					$('.file_drop_3').text("uploading "+ actualFileName);
				}
			});
			mySpecificDropzone.on("complete", function(file, xhr) {
				console.log("response");
				console.log("response:"+xhr);
				console.log("fileType"+fileType);
				console.log("it has uploaded");
				$(this).find('fa').remove();
				$('.file_drop_3').html("<span><i class=\"fa fa-spinner fa-spin\"></i>uploading "+ actualFileName.slice(0,15) + "</span><div class=\"inner_progress_bar\"></div>");
			});
			mySpecificDropzone.on("dragenter", function() {
				$('.file_drop_3').animate({"background-color":"#ecf8fd"}, 500);
			});
			mySpecificDropzone.on("dragleave", function() {
				$('.file_drop_3').animate({"background-color":"white"}, 500);
			});
		}
});




	$(document).on('submit', '#update_status', function(event) {
		$('.save-data-2').find('span').text("saving");
		$('.save-data-2').css({"display":"block"}).animate({"opacity":"1"}, 250);
		$('.save-data-2').find('.fa').remove();
		$('.save-data-2').prepend('<i class="fa fa-spinner fa-spin"></i>');
		event.preventDefault();
		api = $('.get_api').attr('data-api');
		console.log(api);
	    var postData = $(this).serializeArray();
	    var formURL = $(this).attr("action");
	    $.ajax({
	        url : formURL,
	        type: 'PUT',
	        headers: { 
	            'x-wsse': 'ApiKey="'+api+'"'
	        },
	        data : postData,
	        success:function(data, textStatus, jqXHR) {
	            //$('#new_campaign').fadeOut('fast');
	            //$('#new_campaign').parent().append('<div class="confirmation"></div>');
	            //campaignId = data['campaignID'];
	            // $('.confirmation').html('New Campaign has been created. Click <a href="/campaign/'+campaignId+'/0">here</a> to continue');
	          	// pageUrl = "./150";
	          	// $.app.loadContent();
	          	$('.save-data-2').find('.fa').remove();
	          	$('.save-data-2').prepend('<div class="fa fa-check"></i>');
	          	$('.save-data-2').find('span').text("updated");
	          	$('.save-data-2').delay(3000).animate({"opacity":"0"}, 250, function() {
	          		$('.save-data-2').css({"display":"none"});
	          		$('.project_status').animate({"height":"0"}, 250, function() {
	          			$(this).addClass('hidden');
	          		});
	          	});
	            console.log("good job");
	            console.log(data);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	        	console.log(errorThrown);
	        	$('.save-data-2').find('.fa').remove();
	        	$('.save-data-2').prepend('<div class="fa fa-times"></i>');

	        	jsonResponse = JSON.parse(jqXHR.responseText);
	        	console.log(jsonResponse.message);
	        	if(jsonResponse.message == "You are not a campaign reviewer. You cannot change the status to completed.") {
	        		$('.alert_bar').text(jsonResponse.message);
	        		$('.alert_bar').css({"display":"block"}).animate({"opacity":"1"}, 500, function() {
	        			$(this).delay(2500).animate({"opacity":"0"},500, function() {
	        				$(this).css({"display":"block"});
	        			})
	        		});
	        	}
	        	$('.save-data-2').find('span').text("Error.");
	        	$('.save-data-2').delay(3000).animate({"opacity":"0"}, 250, function() {
	        		$('.save-data-2').css({"display":"none"});
	        		$('.project_status').animate({"height":"0"}, 250, function() {
	        			$(this).addClass('hidden');
	        		});
	        	});
	        }
	    });
	    event.preventDefault();
	});


	$(document).on('click', '.remove-user', function(event) {
		projectId = $('.get_project_id').attr('data-project-id');
		removeId = $(this).attr('data-memberId');
		console.log(projectId);
		formURL = apiUrl+"campaigns/"+projectId+"/teammembers/"+removeId;
		$.ajax({
		    url : formURL,
		    type: 'DELETE',
		    headers: { 
		        'x-wsse': 'ApiKey="'+api+'"'
		    },
		    success:function(data, textStatus, jqXHR) {
		        console.log("good job");
		        if($('tr[data-memberId="'+removeId+'"]').length) {
		        	$('tr[data-memberId="'+removeId+'"]').fadeOut('fast');
		        }
		        if($('.member_group[data-memberId="'+removeId+'"]').length) {
		        	$('.member_group[data-memberId="'+removeId+'"]').parent().fadeOut('fast');
		        }
		        console.log(data);
		    },
		    error: function(jqXHR, textStatus, errorThrown) {
		        console.log(jqXHR);
		        console.log(textStatus);
		        console.log(errorThrown);
		    }
		});
		event.preventDefault();
	});

	$(document).on('submit', '#edit_campaign', function(event) {
		event.preventDefault();
		api = $('.get_api').attr('data-api');
		console.log(api);
	    var postData = $(this).serializeArray();
	    var formURL = $(this).attr("action");


	    $('.save-data').find('span').text("saving");
	    $('.save-data').css({"display":"block"}).animate({"opacity":"1"}, 250);
	    $('.save-data').find('.fa').remove();
	    $('.save-data').prepend('<i class="fa fa-spinner fa-spin"></i>');


	    $.ajax({
	        url : formURL,
	        type: 'PUT',
	        headers: { 
	            'x-wsse': 'ApiKey="'+api+'"'
	        },
	        data : postData,
	        success:function(data, textStatus, jqXHR) {
	            //$('#new_campaign').fadeOut('fast');
	            //$('#new_campaign').parent().append('<div class="confirmation"></div>');
	            //campaignId = data['campaignID'];
	            // $('.confirmation').html('New Campaign has been created. Click <a href="/campaign/'+campaignId+'/0">here</a> to continue');
	          	// pageUrl = "./150";
	          	// $.app.loadContent();

	          	$('.save-data').find('.fa').remove();
	          	$('.save-data').prepend('<div class="fa fa-check"></i>');
	          	$('.save-data').find('span').text("updated");
	          	$('.save-data').delay(3000).animate({"opacity":"0"}, 250, function() {
	          		$('.save-data').css({"display":"none"});
	          	});

	            console.log("good job");
	            console.log(data);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	            console.log(jqXHR);
	            console.log(textStatus);
	            console.log(errorThrown);
	            jsonResponse = JSON.parse(jqXHR.responseText);
	            console.log(jsonResponse.message);
	            if(jsonResponse.message == "Data input failed validation.") {
	            	$('.alert_bar').text("Please insure all fields are complete.");
	            	$('.alert_bar').css({"display":"block"}).animate({"opacity":"1"}, 500, function() {
	            		$(this).delay(2500).animate({"opacity":"0"},500, function() {
	            			$(this).css({"display":"block"});
	            		})
	            	});
	            }
	            if(jsonResponse.message == "This authenticated user does not have access to update this campaign.") {
	            	$('.alert_bar').text(jsonResponse.message);
	            	$('.alert_bar').css({"display":"block"}).animate({"opacity":"1"}, 500, function() {
	            		$(this).delay(2500).animate({"opacity":"0"},500, function() {
	            			$(this).css({"display":"block"});
	            		})
	            	});
	            }
	            $('.save-data').find('.fa').remove();
	            $('.save-data').prepend('<div class="fa fa-times"></i>');
	            $('.save-data').find('span').text("Error. Try again.");
	            $('.save-data').delay(3000).animate({"opacity":"0"}, 250, function() {
	            	$('.save-data').css({"display":"none"});
	            });
	        }
	    });
	    event.preventDefault();
	});


	$(document).on('click', '#update_all_task_owners', function(event) {
		$('.task_form').submit();
		totalAdded = 0;
	});

	$(document).on('submit', '.task_form', function(event) {
		event.preventDefault();
		api = $('.get_api').attr('data-api');
		memberId = $(this).find('.user_id').val();
		console.log(memberId);
		console.log(api);
	    var postData = $(this).serializeArray();
	    var formURL = $(this).attr("action");
	    $.ajax({
	        url : formURL+memberId,
	        type: 'PUT',
	        headers: { 
	            'x-wsse': 'ApiKey="'+api+'"'
	        },
	        data : postData,
	        success:function(data, textStatus, jqXHR) {
	        	getMemberName = $('#add_user option:selected').text();
	        	totalAdded += 1;
	        	if(totalAdded >= 9) {
	          		$('.add_task_confirmation_holder').css({"opacity": "0"}).html("Campaign Task Owners Updated.").animate({"opacity":1}, 300);
	            }
	            console.log("good job");
	            console.log(data);
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	        	console.log(jqXHR);
	            console.log(textStatus);
	            console.log(errorThrown);
	        }
	    });
	    event.preventDefault();
	});


	$(document).on('click', '.add_dot', function(event) {
		taskId = $(this).attr('data-taskId');
		userId = $(this).attr('data-memberId');
		$('.member_table td[data-taskId="'+taskId+'"]').find('span').remove();
		$(this).append("<span></span>");
		console.log(userId);
		$('input[data-taskId="'+taskId+'"]').val(userId);
	});

	$(document).on('click', '.show_add_member', function(event) {
		$('#members_container').animate({"opacity":"1"}, 0, function() {
			$('#members_container').animate({"left":"0px"},500);
			pageUrl = $('.show_add_member').attr('href');
			$('#members_container').load(pageUrl+"?type=ajax");
		});
		event.preventDefault();
	});

	// close the new campaign window

	$(document).on('click', '.close_window.campaign', function(event) {
		$('#new_campaign_container').animate({"left":"-400px"},600);
		$('.opacity').css({"display":"none"});
		event.preventDefault();
	});

// close member window
	$(document).on('click', '.close_members', function(event) {
		//$('#members_container').animate({"left":"-1000px"},500);
		location.reload();
	});





	$(document).on('change', '#project_status', function(event) {
		$('.project_status').removeClass('hidden');
		$('#status_message').animate({"opacity":"1","height":"150px"}, 500)
		event.preventDefault();
	});
	// on submission of project status update
	$(document).on('submit', '#status_message_form', function(event) {
		$('#status_message').parent().parent().animate({"opacity":"0","height":"0px"}, 500, function() {
			$(this).addClass('collapsed');
			$('#status_message').css({"opacity":"0","height":"0"});
		});
		e.preventDefault();
	});
	//versions click
	// init hide 
	versionHeight = $('.versions_row').height();
	// console.log(versionHeight);
	$('.versions_row').css({"height":"0"});
	$(document).on('change', '.versions', function(event) {
		$('.versions_row').animate({"height":versionHeight+"px"}, 500, function() {
			$(this).css({"overflow":"scroll"});
		});
		e.preventDefault();
	});






	

	// WHAT YOU SEE, WHAT YOU GET
	if($('.jqte').length) {
		$('.jqte').jqte({
			"source":false,
			"sub": false,
			"sup": false,
			"rule": false,
			"indent": false,
			"outdent": false,
			"remove": false,
			"unlink": false,
			"strike": false,
			"left": false,
			"right": false,
			"center": false,
			"formats": false
		});
	}

	// 
    // $("#new_campaign").submit(function(event) {
    //     var postData = $(this).serializeArray();
    //     var formURL = $(this).attr("action");
    //     $.ajax({
    //         url : formURL,
    //         headers: { 
    //         	'x-wsse': 'ApiKey="80a3e49f-8732-4603-8248-847919cd819c"'
    //         },
    //         type: "POST",
    //         data : postData,
    //         success:function(data, textStatus, jqXHR) {
    //             console.log(data);
    //         },
    //         error: function(jqXHR, textStatus, errorThrown) {
    //             console.log(jqXHR);
    //             console.log(textStatus);
    //             console.log(errorThrown);
    //         }
    //     });
    //     event.preventDefault();
    // });

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );



	// FROM DEMO
	navOpen = false;
	link = 1; 




	$(document).on('click', '.dot_holder', function() {
		getClasses = $(this).attr('class');
		getClasses = getClasses.split(" ");
		if(getClasses[1] == "dot") {
			$(this).removeClass('dot');
		} else {
			$(this).addClass('dot');
		}
	});


	$(document).on('click', '.close_phase', function(e) {
		$('.phase_container').parent().fadeOut('fast', function() {
			$('.phase_container').remove();
			//$('body').append("<div class='fullPage fullPageDash'></div>");
			$('.fullPageDash').css({"opacity":"0"});
			$('.fullPageDash').load("contentLoader2.php", function() {
					$('.contentRow').load("dashboard.php", function() {
						$('#honey_feed').load("inc/honey.php");
						$('.fullPageDash').show().delay(600).animate({"opacity":"1"},400);
				});
			});
		});
		e.preventDefault();
	});
	wheel = 2;
	$(document).on('click', '.phase_1', function(e) {
		
		
		wheel = wheel +1; 



		$('.phase_1').attr('src','img/big_wheels/0'+wheel+'.jpg');

		if(wheel == 5) {
			wheel = 1;
		}


	});

	$(document).on('click', '.navigation_arrows a', function(e) {


		dir = $(this).attr('class'); 

		if(dir == "nav-arrow-forward") {
			if(link == 11) {
				link = 1;
				$('.sidebar_content_inner').fadeOut('fast');
			} else {
				link = link + 1;
				$('.sidebar_content_inner').fadeIn('fast');
			}

			$('.phase_content').fadeOut('fast',function() {
			 	$('.phase_content').load('inc/unilever_phase_'+link+'.php', function() {
					$('.phase_content').fadeIn('normal');
				});
			 });

		}
		else {
			if(link == 1) {
				link = 1;
				$('.sidebar_content_inner').fadeOut('fast');
			} else {
				link = link - 1;
			}

			$('.phase_content').fadeOut('fast',function() {
			 	$('.phase_content').load('inc/unilever_phase_'+link+'.php', function() {
					$('.phase_content').fadeIn('normal');
				});
			 });
		}
		if(link == 1) {
			$('.sidebar_content_inner').fadeOut('fast');
		}
		updateGoldenRules();
		e.preventDefault();
	});


	$('.login_section').animate({"opacity":"1","margin-top":"-164px"}, 900, 'easeOutQuart');




	$(document).on('click', '.btn_lq', function(e) {
		$('body').append('<div class="screenshot_modal"></div>');
		$('.screenshot_modal').addClass('btn_lq_bg');
		$('.screenshot_modal').fadeIn(500);
	});
	$(document).on('click', '.screenshot_modal', function(e) {
		$('.screenshot_modal').fadeOut(500);
	});


	// new project 
	$(document).on('click', '.newproject', function(e) {
		contentPull = "create";
		$('.contentRow').fadeOut('normal', function() {
			$('.contentRow').load('create_screen.php', function() {
				$('.contentRow').fadeIn('slow');
			});
		});
		$('#topbar, .sidebar_content_replace').fadeOut('fast');
		e.preventDefault();
	});





	$(document).on('click', '.linkBtn', function(e) {
		link2 = $(this).attr("data-linkHref");
		window.open(link2, '_blank');
	});

	$(document).on('click', '.linkBtn2', function(e) {
		link3 = $(this).attr("data-linkHref");
		window.open(link3, '_self');
	});


	$(document).on('click', '.modal_call', function(e) {
		$('.modal').show();
		getImg = $(this).attr('data-modalImg');
		nextTask = $(this).attr('data-nextTask');
		console.log("next task: "+ nextTask);
		$('.modal_call_close').attr('data-task',nextTask);
		console.log(getImg);
		$('.modal').css({"background-image":"url('img/screens/"+getImg+".png')"});
		$('.modal').animate({"opacity":"1"});
		e.preventDefault();
	});
	






	// hamburger nav
	// have to use this syntax for newly added items to dom
	$(document).on('click', '.hamburger', function(e) {
		if(!menuOpen) {
			$('.menu_container').addClass('animateRight0');
			$('.fullPageDash').addClass('animateRight150');
			$('.blue_grow').aniamte({"width":"100%"},500);
			$('.dim').fadeIn('slow');
			menuOpen = true;
		} else {
			$('.menu_container').removeClass('animateRight0');
			$('.fullPageDash').removeClass('animateRight150');
			$('.blue_grow').aniamte({"width":"0"},500);
			$('.dim').fadeOut('slow');
			menuOpen = false;
		}
		e.preventDefault();
	});

	$(document).on('click', '.close-btn', function(e) {
		$('.hamburger').click();
		e.preventDefault();
	});
	$(document).on('click', '.dim', function(e) {
		$('.hamburger').click();
		e.preventDefault();
	});
	$(document).on('click', '.close-btn', function(e) {
		$('.hamburger2').click();
		e.preventDefault();
	});
	$(document).on('click', '.dim', function(e) {
		$('.hamburger2').click();
		e.preventDefault();
	});



	// loading content into the .contentRow
	$(document).on('click', '.loader', function(e) {
		contentPull = $(this).find('a').data('content');




		if(contentPull == "allprojects") {
			$('.sidebar_content_inner').fadeOut('fast');
		}
		if(contentPull == "projectroll") {
			$('.sidebar_content_inner').fadeOut('fast');
		}
		if(contentPull == "allfiles") {
			$('.sidebar_content_inner').fadeOut('fast');
		}
		if(contentPull == "goldenrules") {
			$('.sidebar_content_inner').fadeOut('fast');
		}
		if(contentPull == "admin") {
			$('.sidebar_content_inner').fadeOut('fast');
		}
		if(contentPull == "dashboard") {
			$('.sidebar_content_inner').fadeOut('fast', function() {
				$('.sidebar_content_inner').load('inc/sidebar_min.php', function() {
					$('.sidebar_content_inner').fadeIn('fast');
					$('.honey_feed_load').load('inc/honey.php');
				});
			});
		}


	
		$('.contentRow').fadeOut('fast', function() {
			if(menuOpen) {
				$('.hamburger').click();
			}
			$('.contentRow').load(contentPull+".php", function() {
				$('.contentRow').fadeIn(500);
				if(contentPull == "dashboard") {
					$('#honey_feed').load("inc/honey.php")
				}
			});
		});
		$('.arrow-left').remove();
		$('.evo-ico').removeClass('evo-ico-active');
		$('span').removeClass('active');
		$(this).append('<div class="arrow-left"></div>');
		$(this).find('.evo-ico').addClass('evo-ico-active');
		$(this).find('span').addClass('active');
	
		oldcontentPull = contentPull;
		e.preventDefault();
	});


});



function updateGoldenRules() {
	if(link == 1) {
		$('.goldenRules').css({"display":"none"});
	}
	if(link == 2) {
		$('.wheel_sidebar_wheel').attr('src','img/wheels2/01.png');
		$('.goldenRules').css({"display":"block"});
		goldenRule = "<ul><li>"+goldenRule_jtbd_1+"</li><li>"+goldenRule_jtbd_2+"</li></ul>";
		$('#golden_rules').html(goldenRule);
	}
	if(link == 4) {
		$('.wheel_sidebar_wheel').attr('src','img/wheels2/02.png');
		goldenRule = "<ul><li>"+goldenRule_ct_1+"</li></ul>";
		$('#golden_rules').html(goldenRule);
	}
	if(link == 5) {
		$('.wheel_sidebar_wheel').attr('src','img/wheels2/03.png');
		goldenRule = "<ul><li>"+goldenRule_rl_1+"</li></ul>";
		$('#golden_rules').html(goldenRule);
	}
	if(link == 6) {
		$('.wheel_sidebar_wheel').attr('src','img/wheels2/04.png');
		goldenRule = "<ul><li>"+goldenRule_mi_1+"</li></ul>";
		$('#golden_rules').html(goldenRule);
	}
	if(link == 7) {
		$('.wheel_sidebar_wheel').attr('src','img/wheels2/05.png');
		goldenRule = "<ul><li>"+goldenRule_ts_1+"</li></ul>";
		$('#golden_rules').html(goldenRule);
	}
	if(link == 8) {
		$('.wheel_sidebar_wheel').attr('src','img/wheels2/06.png');
		goldenRule = "<ul><li>"+goldenRule_bam_1+"</li><li>"+goldenRule_bam_2+"</li><li>"+goldenRule_bam_3+"</li><li>"+goldenRule_bam_4+"</li></ul>";
		$('#golden_rules').html(goldenRule);
	}
	if(link == 9) {
		$('.wheel_sidebar_wheel').attr('src','img/wheels2/07.png');
		goldenRule = "<ul><li>"+goldenRule_ph_1+"</li><li>"+goldenRule_ph_2+"</li><li>"+goldenRule_ph_3+"</li></ul>";
		$('#golden_rules').html(goldenRule);
	}
	if(link == 10) {
		$('.wheel_sidebar_wheel').attr('src','img/wheels2/08.png');
		goldenRule = "<ul><li>"+goldenRule_fp_1+"</li><li>"+goldenRule_fp_2+"</li></ul>";
		$('#golden_rules').html(goldenRule);
	}
	if(link == 11) {
		$('.wheel_sidebar_wheel').attr('src','img/wheels2/09.png');
		$('#golden_rules').html(goldenRule);
		$('#golden_rules').html("");
		$('.goldenRules').hide();
	}
}


function closeModal() {
	$('.modal').animate({"opacity":"0"}, function() {
		$('.modal').hide();
		$('.modal').css({"background-image":"none"});
	});
}

var video = document.getElementsByTagName('video')[0]; 
// video.addEventListener('progress', updateSeekable, false);
if(video) {
	video.addEventListener('canplay', updatePlay, false);
}
function updatePlay() {
	video.playbackRate = 1
	$('#bgvid').delay(1000).animate({"opacity":".5"},500, function() {
		$('.fullPageLogin').addClass('removeBg');
	});
}

$.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
}

