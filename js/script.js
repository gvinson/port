$(document).ready(function() {

	var contactShow = false; //if contact window is shown or not
	
	//Top Navigation Click Functions
	$("#topNav #contact").click(function() {
		if(!contactShow) {
			$("#contactWrapper").animate({
				'top':'0px'
			}, 500);
			contactShow = true;
		}
		else {
			$("#contactWrapper").animate({
				'top':'-320px'
			}, 500);
			contactShow = false;
		}
	});

	//Close button click on contact form
	$("#close").click(function () {
		$("#contactWrapper").animate({
				'top':'-320px'
			}, 500);
		contactShow = false;
	});

	//top nav img hovers
	$("#topNav ul li a").hover(function() {
		var text = $(this).children("div");
		var img = $(this).children("img");
		$(text).css("position","absolute").slideDown('fast');
		$(img).css("opacity",".75");
	}, function() {
		var text = $(this).children("div");
		var img = $(this).children("img");
		$(text).slideUp('fast');
		$(img).css("opacity","1");
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
			"margin-top":"+=7px"
		},{
			"duration":65,
			"complete":function () {
				$(this).css({
					"margin-top":"-=7px"
				});
			}
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
			"easing":"swing"
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
		fontsUsed.push($(this).css("font-family"));
	});

	$.each(fontsUsed, function(i, el){
		if($.inArray(el, fontsAvail) === -1) fontsAvail.push(el);
	});

	function loadFont() {

	$(document).click(function(e) {
		if(activateFonts) {
			e.preventDefault();
			
			console.log("Document clicked");
			
			var target = $(e.target);
			//mylist.options[mylist.selectedIndex].text;
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
