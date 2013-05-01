$(document).ready(function() {
	setTimeout(checkScroll, 400) //wait for css animations to finish
	
	function checkScroll() {
		//create an array of all sectionTitles
		var sectionTitles = [];
		$(".sectionTitle").each(function() {
			sectionTitles.push($(this).attr("id"));
		});
		//show/hide section titles depending on position on site
		$(window).scroll(function(){
			//Show section titles when viewing that section
			$(".sectionTitle").each(function(index, prevDom) {		
				var yOffset = 600;	//yOffset for works section
				var h = $(this).parent().parent().height();	//height of section scrolling past
				var y = $(window).scrollTop() - $(this).parent().parent().offset().top+yOffset+(document.documentElement.clientHeight*.05); //height to top
				
				//make title appear on left side of content ONLY if
				//the browser window is wider than 1240
				if(document.documentElement.clientWidth > 1240) {
					if( y > (h*.25) && y < (h) ){
						//distance between the top of the section title and the top of the document
						var marginTop = ($(this).parent().parent().offset().top-200)*(-1);
							
						$(this).fadeIn(300).css({
							"position":"fixed",
							"margin-top": marginTop
						});
					} else {
						$(this).fadeOut(300);
					}
				} 
				else {
					if( y >= (h*.2) )
					{
						var marginLeft = $(this).parent().parent().find(".wrapper");
						marginLeft = marginLeft.offset().left;
						var titleOffset = $(this).offset().top;
						var marginBottom = $(this).parent().parent().css("margin-bottom").substring(0,2);
						var endSection = $(this).parent().parent().height();
						
						$(this).fadeIn(300).css({
							"margin-left":marginLeft
						});
						
						//if the section title meets the top of the window,
						//make it a fixed white bar at the top
						
						if(titleOffset < $(window).scrollTop()) {
							$(this).css({
								"height":"1em",
								"background-color":"#ffffff",
								"position":"fixed",
								"z-index":"50",
								"top":"1em",
								"padding-bottom":".1em"
							});
							
							
						}
					}
					else
						$(this).fadeOut(300);
					
				}
				
			});
			
			//display scrollToTop link when at work section
			if(document.documentElement.clientWidth > 1240) {
			if($(window).scrollTop() >=  $("#workWrapper").offset().top-(document.documentElement.clientHeight*.15)-5) {
				$("#backToTop").fadeIn();
			}
			else {
				$("#backToTop").fadeOut();
			}
			}
		 });
	}
	
	$("#backToTop").click(function() {
		$('html, body').animate({scrollTop: 0}, 400);
	});
});