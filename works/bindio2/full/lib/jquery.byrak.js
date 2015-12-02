$(function(){
	var path = window.location.href.split('#');
	if(path.length > 1)
	{
		$('html, body').animate({
	        scrollTop: $('#' + path[1]).offset().top - 71
	    }, 1000);
	}

	if($('a[data-type="see_more"]').length)
	{
		var obj = $('a[data-type="see_more"]');
		var windowHeight = $(window).height();

		if(windowHeight < $('div#intro').offset().top + $('div#intro').height())
		{
			obj.css({'position': 'fixed', 'top': (windowHeight - 60) + 'px'});
		}
		else
		{
			obj.css({'position': 'absolute', 'bottom': '40px'});
		}
	}

	$('form#subscribe').submit(function(event){
		event.preventDefault();
		var email = $(this).find('input.mail');

		$.ajax({
			type: "POST",
			url: 'subscribe.php',
			data: {mail: email.val()},
			success: function(data)
			{
				alert(data);
				email.val('');
			}
		});

		return false;
	});
});

$(document).scroll(function(){
	var scroll = $(window).scrollTop();

	var obj = $('a[data-type="see_more"]');

	if(obj.length && obj.css('position') == 'fixed')
	{
		if(obj.offset().top + 80 >=  $('div#intro').offset().top + $('div#intro').height())
		{
			obj.removeAttr('style').css({'position': 'absolute', 'bottom': '40px'});
		}
	}
});

$(document).on('click', 'a[data-rel="scroll"]', function(event){
	event.preventDefault();

	$('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top - 71
    }, 1000);
});

$(document).on('click', '*[data-rel="subscribe"]', function(event){
	event.preventDefault();

	var lang  = typeof $('body').attr('lang') != 'undefined' && $('body').attr('lang') != 'en' ? '-' + $('body').attr('lang'):'';

	// $.ajax({
	// 	url: 'modal' + lang + '.html',
	// 	dataType: 'html',
	// 	success: function(data)
	// 	{
	// 		var modal = '<div id="modal"><div class="box col-md-7 col-xs-12 center-block"><div class="close"></div>';
	// 		modal+= data;
	// 		modal+= '</div></div>';

	// 		$('body').append(modal);
	// 	}
	// });
});

$(document).on('click', 'div.close', function(){
	$('div#modal').remove();
});

$(document).on('click', 'a.to_contacts', function(event){
	event.preventDefault();

	if($('div#modal').length)
		$('div#modal').remove();

	$('html, body').animate({
        scrollTop: $('#footer').offset().top - 71
    }, 1000);
});

$(document).on('click', 'body', function(event){
	var target = $( event.target );

	if(!target.closest('.box').length && $('div#modal').length){
		$('div#modal').remove();
		return false;
	}
});