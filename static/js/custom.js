jQuery(document).ready(function($) {
  $('a[href^="#"]').click(function()
  {

      var target = $( $(this).attr('href') ),
      headerHeight = 75; // Get fixed header height

      if (target.length)
      {
        $('html,body').animate({
          scrollTop: target.offset().top - headerHeight
        }, 500);
        return false;
      }
  });
});

