$(document).ready(function() {
	
	var contactShow = false; //if contact window is shown or not
	
	//top nav img hovers
	$("#topNav ul li").hover(function() {
		$(".topNavText").remove();
		var textDiv = $(this).children('a').children('div');
		var text = $(textDiv).text();
		var img = $(this).children('a').children("img");
		$(img).css("opacity",".75");
		$(this).parent().prepend('<li class="topNavText" style="margin-left:-'+($(textDiv).width()+25)+'px;">'+text+'</div>');
		$(".topNavText").fadeIn('fast');
	}, function() {
		var text = $(this).children('a').children("div");
		var img = $(this).children('a').children("img");		
		$(img).css("opacity","1");
		$(".topNavText").fadeOut({
			"complete": function(){
					$(this).remove();
			}
		});
	});
	
	//Top Navigation Click Functions
	$("#topNav #contact").click(function(e) {
		e.preventDefault();
		if(!contactShow) {
			$("#contactWrapper").animate({
				'top':'0px'
			}, 300);
			contactShow = true;
		}
		else {
			$("#contactWrapper").animate({
				'top':'-320px'
			}, 200);
			contactShow = false;
		}
	});
		
	//Close button hover img swap
	$("#close img").hover(function() {
		$(this).attr("src", $(this).attr("src").replace("_off.png","_on.png"));
	}, function() {
		$(this).attr("src", $(this).attr("src").replace("_on.png","_off.png"));
	});
	
	//Close button click on contact form
	$("#close img").click(function () {
		$("#contactWrapper").animate({
			'padding-top':'+=35px'
		}, 100);
		$("#contactWrapper").animate({
				'padding-top':'-=35px',
				'top':'-320px'
			}, 200);
		contactShow = false;
	});
	
	//Sliding Actions for "the web"
	$("#actions").css({
		"height": $("#actions div:first").height()+14,
		"overflow": "hidden"
	});
	var actionHeight = $("#actions").height();
	
	function slide() {
		$("#actions div").animate({
			"position":"absolute",
			"margin-top":"+=10px"
		},{
			"duration":300,
			"complete":function () {
				$(this).css({
					"margin-top":"-=10px"
				});
			},
			"easing":"easeInExpo"
		}
		); 
		$("#actions div:first").slideUp({
			"duration":200, 
			"complete": function() {
				var $this = $(this);
				$this.parent().append(this);
				$this.show();
				$("#actions").css({
					"height": $this.height()+10
				});
			},
			"easing":"easeOutExpo"
		}); 
	}
	
	setInterval(slide,2500);
	
	/* FONT SELECTOR PLUG IN */
	var activateFonts = false;
	var background = $("#selectDOM").css("background-color");
	$("#selectDOM").click(function() {
		if(!activateFonts) {
			activateFonts = true;
			$(this).css("background-color","lightblue");
		}
		else {
			activateFonts = false;
			$(this).css("background-color",background);
		}
	});
		var fontsUsed = [];
		var fontsAvail = [];
		
	$("*").each(function () {
		var font = $(this).css("font-family");
		font = font.split(",");
		for(var i=0; i< font.length; i++)
			fontsUsed.push(font[i]);
	});

	$.each(fontsUsed, function(i, el){
		if($.inArray(el, fontsAvail) === -1) 
		{
			fontsAvail.push(el);
		}
	});

	function loadFont() {
	$(document).click(function(e) {
		if(activateFonts) {
			e.preventDefault();
			var target = $(e.target);
			var list = document.getElementById("fontList");
			$(target).css("font-family",list.options[list.selectedIndex].text);
		}
		});
	}

	var ul = document.createElement("select");
	ul.id = "fontList";
	$(ul).attr("onchange",loadFont());
	for(var i=0;i<fontsAvail.length;i++)
	{
		var option = document.createElement("option");
		option.text = fontsAvail[i];
		option.style.fontFamily = fontsAvail[i];
		try
		  {
		  // for IE earlier than version 8
		  ul.add(option,ul.options[null]);
		  }
		catch (e)
		  {
		  ul.add(option,null);
		  }
	}

	$("#fontList option").each(function() {
		$(this).css("color","red");
	});
	$("#footer").append(ul);
});
