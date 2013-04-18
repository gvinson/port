$(document).ready(function() {
	
	var contactShow = false,//if contact window is shown or not
		modalShow = false, 	//if modal window is shown or not
		popoverShow = false, 	//if popover showing or not
		curVal;				//used for current value for textboxes
		
	//top nav img hovers
	$("#topNav ul li").hover(function() {
		$(".topNavText").remove();
		var textDiv = $(this).children('a').children('div');
		var text = $(textDiv).text();
		var img = $(this).children('a').children("img");
		$(img).css("opacity",".75");
		$(this).parent().prepend('<li class="topNavText" style="margin-left:-'+($(textDiv).width()+25)+'px;">'+text+'</div>');
		$(".topNavText").fadeIn();
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
		
	//Phone number clicked to send a text
	//Show popover
	$(".contactLink #phoneNumber").click(function(e) {
		if(popoverShow) {
			popoverShow = false;
			$("#textMessageWrapper").slideUp('fast');
		}
		else {
			popoverShow = true;
			$("#textMessageWrapper").fadeIn('fast');
		}
		e.stopPropagation();
	});
	
	//Close modal if document is clicked outside of modal
	$(document).mousedown(function (e) {
        var modalWrapper = $("#modalWrapper"), //modal
			popoverWrapper = $(".popover"); //popover
		
        if (modalWrapper.has(e.target).length === 0) {
            $(modalWrapper).fadeOut('fast');
            modalShow = false;
        }
		if (popoverWrapper.has(e.target).length === 0) {
            $(popoverWrapper).fadeOut('fast');
            popoverShow = false;
        }
    });
	
	//Contact close button hover img swap
	$("#contactWrapper #close img").hover(function() {
		$(this).attr("src", $(this).attr("src").replace("_off.png","_on.png"));
	}, function() {
		$(this).attr("src", $(this).attr("src").replace("_on.png","_off.png"));
	});
	
	//Contact close button click on contact form
	$("#contactWrapper #close img").click(function () {
		$("#contactWrapper").animate({
			'padding-top':'+=35px'
		}, 100);
		$("#contactWrapper").animate({
				'padding-top':'-=35px',
				'top':'-320px'
			}, 200);
		contactShow = false;
	});
	
	//set the default text for textboxes and inputs
    $('input, textarea').focus(function () {
		curVal = $(this).val();
        //Check val default input
        if (
				(curVal == 'Your email or cell #') || (curVal == 'Your email') || 
				(curVal == 'Text Message....') || (curVal == 'Message for me...')
		) {
            $(this).val('');
        }
		$(this).css({
			"font-style":"normal",
			"color":"#000"
		});
    }).blur(function () {
        //check for empty input
        if ($(this).val() == '') {
            $(this).val(curVal);
			$(this).css({
				"font-style":"italic",
				"color":"#999"
			});
        }
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
	//set time for action slides (2.5 secs)
	setInterval(slide,2500);
	
	//Monitor text message size
	$("#textMessage, #modal_textMessage").keypress(function(e) {
		checkLength($(this),e);
	});
	$("#textMessage, #modal_textMessage").change(function(e) {
		checkLength($(this),e);
	});
	function checkLength(textarea,e) {
		var tval = $(textarea).val(),
			tlength = tval.length,
			set = 160,
			remain = parseInt(set - tlength),
			countdown = $("#countdown");
		
		//check to see if modal is active or popover
		if($(textarea).attr("id") == "modal_textMessage")
				countdown = $("#modal_countdown");
		
		//shorten text to allotted amount
		$(countdown).text(remain);
		if (remain <= 0 && e.which !== 0 && e.charCode !== 0) {
			$(textarea).val((tval).substring(0, set-1))
			$(countdown).prepend('<span class="error">No more characters allowed</span>');
		}
	}
	
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
