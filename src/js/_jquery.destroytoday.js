var hashTable = new Object();

$(document).ready(function()
{
	jQuery.easing.def = 'easeInOutCubic';

		/*CROP_CONFIG = {
	maxHeight: 433, 
	maxWidth: 433, 
	selectionOpacity: 0, 
	outerOpacity: 0.4, 
	x1: 0, y1: 0, x2: 100, y2: 100
};
	
	$('img').imgAreaSelect(CROP_CONFIG);*/
	
	function addColorBlocks(index)
	{
		$(this).children('.color_blocks').css('top', $(this).children('a').children('img').height());
		$(this).children('.metadata').css('top', $(this).children('a').children('img').height() + 5);
	}
	
	function thumb_mouseEnterHandler(event)
	{
		var image = $(event.currentTarget).children('a').children('img');
		var color_blocks = $(event.currentTarget).children('.color_blocks');
		
		color_blocks.stop();
		
		color_blocks.animate(
		{
			'top': 0,
			'height': image.height() + 10
		}, 
		{
			duration: 350
		});
	}
	
	function thumb_mouseLeaveHandler(event)
	{
		var image = $(event.currentTarget).children('a').children('img');
		var color_blocks = $(event.currentTarget).children('.color_blocks');
		
		color_blocks.stop();
		
		color_blocks.animate(
		{
			'top': image.height(),
			'height': 10
		}, 
		{
			duration: 350
		});
	}
	
	$('.thumb').each(addColorBlocks);
	$('.thumb').mouseenter(thumb_mouseEnterHandler);
	$('.thumb').mouseleave(thumb_mouseLeaveHandler);
	
	$('.direction').mouseenter(function(event)
	{
		var title_wrapper = $(event.currentTarget).children('a').children('.title_wrapper');
		var title = title_wrapper.children('.title');
		
		title_wrapper.stop();
		title_wrapper.css('visibility', 'visible');
		title_wrapper.animate(
		{
		    'width': title.width()
		}, 
		{
			duration: 350
		});
	});
	
	$('.direction').mouseleave(function(event)
	{
		var title_wrapper = $(event.currentTarget).children('a').children('.title_wrapper');
		var title = title_wrapper.children('.title');
		
		title_wrapper.stop();
		title_wrapper.animate(
		{
		    'width': 1
		},
		{
			duration: 350,
			complete: function()
			{
			    title_wrapper.css('visibility', 'hidden');
		    }
		});
	});
	
	$('.direction').click(function(event)
	{
		window.location = $(event.currentTarget).children('a').attr('href');
	});
	
	function rgb2hex(rgb)
	{
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		
		return ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
				("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
				("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
	}
	
	/*
	//Shaun Inman widon't, still need to figure out links
	function widont(str)
	{
	   return str.replace(/([^\s])\s+([^\s<>]+)\s*$/g, '$1&nbsp;$2');
    }
    
    $('p').each(function()
    {
        var str = $(this).html();
        var matchList = str.match(/<(a|img)[^>]*>(.+)<\/\1>/ig);
        
        if (matchList)
    	{	
    		for (var match in matchList)
    		{
    			str = str.replace(match, widont(match));
    		}
    	}

    	$(this).html(str);
    });*/
    
	$('.email').html("<a href=\"mailto:jonnie@destroytoday.com\">jonnie@destroytoday.com</a>");

    jQuery.timeago.settings.strings = {
      prefixAgo: null,
      prefixFromNow: "in",
      suffixAgo: "ago",
      suffixFromNow: null,
      seconds: "several seconds",
      minute: "a minute",
      minutes: "%d minutes",
      hour: "an hour",
      hours: "%d hours",
      day: "a day",
      days: "%d days",
      month: "a month",
      months: "%d months",
      year: "a year",
      years: "%d years"
    };

    if ($('#latest-tweet'))
    {
        $.ajax({
          url: "http://twitter.com/statuses/user_timeline/destroytoday.json?count=10",
          dataType: 'jsonp',
          success: function(data)
          {
              $.each(data, function(key, value)
              {
                  if (value.text.substring(0, 1) != "@")
                  {
                      function linkify(text) 
                      {
                          var exp = /((?:ftp|http|https):\/\/)((\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
                          return text.replace(exp, "<a href=\"$1$2\">$2</a>"); 
                      }
                  
                      var tweet = 
                        linkify(value.text) +
                        "<br/><a href=\"http://twitter.com/destroytoday\">destroytoday</a> <a class=\"timestamp\" href=\"http://twitter.com/destroytoday/status/" + value.id_str + "\">" + 
                        jQuery.timeago(value.created_at).replace(/[\s]+/ig, '&nbsp;') +
                        "</a>";
                  
                      $('#latest-tweet p').html(tweet);
                      $('#latest-tweet').css('height', $('#latest-tweet p').height() + $('#latest-tweet hr').height());
	           
                      return false;
                  }
              });
          }
        });
    }

	$(".twitter-follow-button").attr('data-text-color', rgb2hex($("body").css('color')));
	$(".twitter-follow-button").attr('data-link-color', rgb2hex($(".twitter-follow-button").css('color')));
	
	var twitterWidgets = document.createElement('script');
	twitterWidgets.type = 'text/javascript';
	twitterWidgets.async = true;
	twitterWidgets.src = 'http://platform.twitter.com/widgets.js'
	document.getElementsByTagName('head')[0].appendChild(twitterWidgets);
});
