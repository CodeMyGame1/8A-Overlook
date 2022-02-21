$('#dependencies').load('templates/templates.html', function() {
  $('#navbaro').load('templates/nav.html', function() {
    $('#nav_search').submit(function(event) {
      event.preventDefault();
      
      var text = $('#page_query').val().toLowerCase();
      
      if ((text == "home") || (text == "index")) {
        window.location.replace('index.html');
      } else if ((text == "homework") || (text == "hw")) {
        window.location.replace('binder.html');
      } else if (text == "news") {
        window.location.replace('news.html');
      } else if (text == "forms") {
        window.location.replace('forms.html');
      } else if (text == "about" || text == "about us" || text == "aboutus") {
        window.location.replace('about.html');
      } else if (text == "status") {
        window.location.replace('status.html');
      } else if (text == "update" || text == "updatelog") {
        window.location.replace('updatelog.html')
      } else {
        window.location.reload();
      }
    });
  });
});