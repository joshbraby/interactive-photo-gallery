$(function() {
  
    var currentYear = new Date();
    $('#footer-date').html("&copy;" + currentYear.getFullYear() + " Josh Braby");

    var i;

    var caption = [];

    var $body = $('body');
    var $thumbnailIMG = $(".thumbnail-container img");
    var $userSearch = $('#user_search');
    $body.append("<div class='overlay'><i class='fa fa-arrow-circle-o-left fa-4x'></i><i class='fa fa-arrow-circle-o-right fa-4x'></i><div><img src='Photos/01.jpg' id='large-image'/></div><p></p></div>");
    var $overlay = $('.overlay');
    $overlay.hide();
    var $overlayIMG = $('.overlay img');
    var $overlayP = $('.overlay p');

	$thumbnailIMG.each(function() {

		var getAlt = $(this).attr('alt');

		caption.push(getAlt)

	});

    $('.thumbnail-container').on('click', function(e) {
    	e.preventDefault();
    	$overlay.show();
    	$image = $(this).find("img").attr("src");

    	for(i=1;i<13;i++) {
    
    		var check;

	    	if (i < 10) {
				check = "Photos/Thumbnails/0" + i.toString() + ".jpg";
				if($image === check) {
					$overlayIMG.attr('src','Photos/0' + i.toString() + '.jpg');
					$overlayP.text(caption[i]);
					return i;
				}
			} else {
				check = "Photos/Thumbnails/" + i.toString() + ".jpg";
				if($image === check) {
					$overlayIMG.attr('src','Photos/' + i.toString() + '.jpg');
					$overlayP.text(caption[i]);
					return i;
				}
			}
    	};
    });

    $body.on('click', '.overlay img', function() {
    	$('.overlay').hide();
    });

    function slideLeft() {
		if(i === 1) {
    		i = 12;
			$('.overlay img').attr("src","Photos/" + i.toString() + ".jpg");
    	} else if (i === 11 || i === 12) {
    		i--;
    		$('.overlay img').attr("src","Photos/" + i.toString() + ".jpg");
	    } else {
    		i--;
			$('.overlay img').attr("src","Photos/0" + i.toString() + ".jpg");
    	};
    	$('.overlay p').text(caption[i-1]);
    }

    function slideRight() {
    	if(i === 12) {
    		i = 1;
			$('.overlay img').attr("src","Photos/0" + i.toString() + ".jpg");
    	} else if (i === 9 || i === 10 || i === 11) {
    		i++;
    		$('.overlay img').attr("src","Photos/" + i.toString() + ".jpg");
	    } else {
    		i++;
			$('.overlay img').attr("src","Photos/0" + i.toString() + ".jpg");
    	};
    	$('.overlay p').text(caption[i-1]);
    }

    $body.on('click', '.fa-arrow-circle-o-left', slideLeft);

    $body.on('click', '.fa-arrow-circle-o-right', slideRight);

	$(document).keydown(function(e) {
    	if (e.keyCode === 37) {
    		slideLeft();
    	} else if (e.keyCode === 39) {
        	slideRight();
    	}
	});

    $userSearch.keyup(function() {

    	var search = $(this).val();
	    search = search.toLowerCase();

		    $thumbnailIMG.each(function() {

		    var currentAlt = $(this).attr('alt');

		    currentAlt = currentAlt.toLowerCase();

	        if (currentAlt.includes(search) === true) {
	        	$(this).parent().parent().fadeIn("slow");
	        } else {
	        	$(this).parent().parent().fadeOut("slow");
	        }
			});

    });


}); //end document object function