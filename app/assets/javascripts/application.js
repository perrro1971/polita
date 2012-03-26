// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(window).load(function() {
	$('.imglist img').not('.actions img').each(function() {
		if($(this).prop('complete')){
			var can = "<canvas style='position:absolute; ' height='"+this.height+"' width='"+this.width+"' ></canvas>";
			$(can).insertBefore(this);
        	grayscale(this);
		}
	});
});

 
$(document).ready(function() {
    $("#imglist1 a").hover(
        function() {
			$(this).find('canvas').stop().animate({opacity: 0}, 200);
			$(this).find('.imgcolors').stop().animate({opacity: 1}, 200);
			$(this).parent().find('.bg').stop().animate({opacity: 1}, 200);
        },
        function() {
			$(this).find('canvas').stop().animate({opacity: 1}, 200);
            $(this).find('.imgcolors').stop().animate({opacity: 0}, 200);
			$(this).parent().find('.bg').stop().animate({opacity: 0}, 200);
        }
    );

	$('.file input[type=file]').bind('change focus click', imageUpload );
	
	$('span.delete').live('click', function(e){
		$(this).parent().parent().find('input').remove();
		$(this).parent().parent().hide();
		$(this).parent().parent().find('span').remove();
		var display_div = $('#files_to_upload');
		if(display_div.find('input').length == 0) display_div.hide();	
	});
	
	$('span.delete_img').click(function(e){
		var delete_div = $(this).parent();
		if(confirm('Are you sure you want to delete this image?')){
			$.ajax({
   				url: '/files/' + $(this).attr('data-id'),
   				type: 'DELETE',
   				success: function(){
				    delete_div.remove();
				    
				}
			});	
		}
	})
	
});

function imageUpload(e){
	var number_fields, file_name;
	if ($(this)[0].value !== '') {
    	number_fields = $("#files").find(".file").length;
    	
    	new_div_field = '<span class="file f' + number_fields + '"><span class="button">UPLOAD PHOTO</span></span>';
    	$("#files").prepend(new_div_field);
    	
    	new_upload_field = $('<input type="file" name="project[assets_attributes][' + number_fields + '][asset]" id="project_assets_attributes_' + number_fields + '_asset">');
    	new_upload_field.bind("change focus click", imageUpload );
    	
    	$(".f"+number_fields).append(new_upload_field);
    	
    	file_name = "<span class='file_to_upload'>"+$(this)[0].value+"<span class='delete'>x</span></span>";
    	$(".f"+(number_fields-1)).prepend(file_name);
    	
    	$(".f"+(number_fields-1)).find("span.button").hide();
    	$(".f"+(number_fields-1)).find("input").hide();
    	
    	$( $(".f"+(number_fields-1)).appendTo( $('#files_to_upload') ) );
    	
    	$("#files_to_upload").show();
	}
}


function preloadImages(){
  $("h1").html($(".tclient").html());
  $('#w_cont').css("opacity", "0");

/*
  $("#w_cont").queryLoader2({
  	barColor: "none",
    backgroundColor: "none",
    percentage: true,
    barHeight: 30,
    onComplete: loadedImagesComplete,
    completeAnimation: "grow"
  });
  */
 $('#w_cont img').each(function() {
	}).one('load', function() { 
		loadedImagesComplete();
		});
}




function showCarrousel(){
	$('#w_cont').animate({opacity: '1'},{duration: 500});
	$('#w_cont').carouFredSel({
	  prev: '#prev1',
	  next: '#next1'
	});
	
	
    $("a#close").click(
	  	function(){
	  		$('html, body').animate({scrollTop:0}, 'slow');
	  		$("#work").slideUp(300, function () {
	      		$("#work").html("");
	      		$("h1").html("Projects...");
	    	});
	  	}
  	);
}

function loadedImagesComplete(){
	showCarrousel();
}

function grayscale(img) {
	var supportsCanvas = !!document.createElement('canvas').getContext;
	if (supportsCanvas) {
		//http://www.maxnov.com/getimagedata/
		$.getImageData({
			url: img.src,
			success: function(image){
				// Set up the canvas
				var can = $(img).parent().find('canvas')[0];
				var ctx = can.getContext('2d');
				// Set the canvas width and heigh to the same as the image
			    $(can).attr('width', image.width);
			    $(can).attr('height', image.height);
			    // Draw the image on to the canvas
    			ctx.drawImage(image, 0, 0, image.width, image.height);
    			// Get the image data
			    var image_data = ctx.getImageData(0, 0,  image.width, image.height);
			    var image_data_array = image_data.data;
			    // Invert every pixel
			    for (var i = 0, j = image_data_array.length; i < j; i+=4) {
			      gray = image_data_array[i] * .3 + image_data_array[i + 1] * .59 + image_data_array[i + 2] * .11;
			      image_data_array[i] = gray;
			      image_data_array[i+1] = gray;
			      image_data_array[i+2] = gray;
			    }
			    // Write the image data to the canvas
			    ctx.putImageData(image_data, 0, 0);
			    $(img).parent().animate({opacity: '1'},{duration: 300});
			    
			},error: function(xhr, text_status){
			    // Handle your error here
			}
		})
		
	} 
	
	
	// http://net.tutsplus.com/tutorials/javascript-ajax/how-to-transition-an-image-from-bw-to-color-with-canvas/
	// fails on load images from another domain
	
}
