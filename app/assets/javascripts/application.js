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
        $(this).wrap('&lt;div style="display:inline-block;opacity:0;width:' + this.width + 'px;height:' + this.height + 'px;"&gt;').clone().addClass('gotcolors').css('opacity', '0').css('position', 'absolute').insertBefore(this);
        this.src = grayscale(this.src);
    }).animate({opacity: 1}, 500);
});
 
$(document).ready(function() {
    $("#imglist1 a").hover(
        function() {
            $(this).find('.gotcolors').stop().animate({opacity: 1}, 200);
			$(this).parent().find('.bg').stop().animate({opacity: 1}, 200);
        },
        function() {
            $(this).find('.gotcolors').stop().animate({opacity: 0}, 500);
			$(this).parent().find('.bg').stop().animate({opacity: 0}, 500);
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
				    console.log("success")
				}
			});	
		}
	})
	
});

function imageUpload(e){
	var number_fields, file_name;
	if ($(this)[0].value !== '') {
    	number_fields = $("#files").find(".file").length;
    	console.log(number_fields)
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
  $("#w_cont").queryLoader2({
  	barColor: "none",
    backgroundColor: "none",
    percentage: false,
    barHeight: 30,
    onComplete: loadedImagesComplete,
    completeAnimation: "grow"
  });
  
  
}

function showCarrousel(){
	console.log("listo")
	$('#w_cont').carouFredSel({
	  prev: '#prev1',
	  next: '#next1'
	});
	$('#w_cont').animate({opacity: '1'},{duration: 300});

	

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
 
// http://net.tutsplus.com/tutorials/javascript-ajax/how-to-transition-an-image-from-bw-to-color-with-canvas/
function grayscale(src) {
    var supportsCanvas = !!document.createElement('canvas').getContext;
    if (supportsCanvas) {
        var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        imageData, px, length, i = 0, gray,
        img = new Image();
 
        img.src = src;
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
 
        imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        px = imageData.data;
        length = px.length;
 
        for (; i < length; i += 4) {
            gray = px[i] * .3 + px[i + 1] * .59 + px[i + 2] * .11;
            px[i] = px[i + 1] = px[i + 2] = gray;
        }
 
        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    } else {
        return src;
    }
}