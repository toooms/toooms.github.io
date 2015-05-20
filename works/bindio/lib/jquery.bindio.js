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
});

$(document).on('click', 'div.close', function(){
	$('div#modal').remove();
});
