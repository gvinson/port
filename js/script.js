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
		
		var li = document.createElement("li");
		$(li).attr("class", "topNavText");
		$(li).css("margin-left","-"+$(text).width);
		$(li).text(text);
		//$("#home").prepend('<li class="topNavText">'+text+'</div>');
		$("#home").prepend($(li));
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
			var result = $("#textMessageWrapper").find(".result");
			$(result).hide();
		}
		else {
			popoverShow = true;
			$("#textMessageWrapper").fadeIn('fast');
		}
		e.stopPropagation();
	});
	//Email address clicked to send an email
	//Show popover
	$(".contactLink #emailAddress").click(function(e) {
		if(popoverShow) {
			popoverShow = false;
			$("#emailWrapper").slideUp('fast');
			var result = $("#emailWrapper").find(".result");
			$(result).hide();
		}
		else {
			popoverShow = true;
			$("#emailWrapper").fadeIn('fast');
		}
		e.stopPropagation();
	});
	
	//Close modal if document is clicked outside of modal
	$(document).mousedown(function (e) {
        var modalWrapper = $(".modalWrapper"), //modal
			popoverWrapper = $(".popover"); //popover
		
        if (modalWrapper.has(e.target).length === 0) {
            $(modalWrapper).fadeOut('fast');
            modalShow = false;
			var result = $(modalWrapper).find(".result");
			$(result).hide();
        }
		if (popoverWrapper.has(e.target).length === 0) {
            $(popoverWrapper).fadeOut('fast');
            popoverShow = false;
			var result = $(popoverWrapper).find(".result");
			$(result).hide();
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
				(curVal == 'Your email or cell #') || (curVal == 'Your email address') || 
				(curVal == 'Text Message....') || (curVal == 'Message for me....')
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
	
	//send message button click
	$(".sendMessage").click(function() {
		var parent = $(this).parent();
		var result = $(parent).find(".result");
		$(result).fadeIn('fast');
	})
	
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
	

	//Portfolio image hovers
	var works = [];
	$(".work").each(function() {
		works.push($(this));
	});
	$(".work .workImg").hover(function () {
		var overlay = $(this).find(".imgOverlay");
		$(overlay).fadeIn(300);
	}, function() {
		var overlay = $(this).find(".imgOverlay");
		$(overlay).fadeOut(300);
	});
	$(".workImg").click(function(e) {
		e.preventDefault();
		var detailsWrapper = "#"+$(this).attr("rel")+"Details";
		var arrow = $(this).parent().find('.workArrow');
		
		$(arrow).show({
			"complete":function() {				
				$(detailsWrapper).fadeIn();
			}
		});
		
	
		
	});
});
