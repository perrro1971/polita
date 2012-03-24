# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$(->
  
  $('a#open_project').click(->
    url = "/files?id="+$(this).attr("class")
    $.get(url,
      (data)->
        $('html, body').animate({scrollTop:100}, 400)
        $("#work").html("").css("opacity", 0).append(data).slideDown(400).animate({opacity: 1}, 400)
        preloadImages()
    )
  )
  

 
)




