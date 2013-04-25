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
			for(var i=0; i < sectionTitles.length; i++) {		
				var yOffset = 600;	//yOffset for works section
				var h = $('#'+sectionTitles[i]).parent().height();	//height of section scrolling past
				var y = $(window).scrollTop() - $("#" + sectionTitles[i]).parent().offset().top+yOffset; //height to top
				
				if(i!=0)
					yOffset = 500;	//yOffset for posts section

				if(document.documentElement.clientWidth > 1240) {
					if( y > (h*.25) && y < (h) ){
						// if we are show sectionTitle
						var marginTop = ($('#'+sectionTitles[i]).parent().offset().top-200)*(-1);
							
						$('#'+sectionTitles[i]).fadeIn(300).css({
							"position":"fixed",
							"margin-top": marginTop
						});
					} else {
						$('#'+sectionTitles[i]).fadeOut(300);
					}
				} 
				else {
					if( y > (h*.2) && y < (h) )
					{
						var marginLeft = $("#"+sectionTitles[i]).parent().find(".wrapper");
						marginLeft = marginLeft.offset().left;
						
						$('#'+sectionTitles[i]).fadeIn(300).css({
							"margin-left":marginLeft
						});
					}
					else
						$('#'+sectionTitles[i]).fadeOut(300);
					
				}
			}
			
			//display scrollToTop link when at work section
			if(document.documentElement.clientWidth > 1240) {
			if($(window).scrollTop() >=  $("#workWrapper").offset().top-50) {
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