$('#dependencies').load('templates/templates.html', function() {
  $('#navbaro').load('templates/nav.html', function() {
    $('#nav_search').submit(function(event) {
      event.preventDefault();
      
      var text = $('#page_query').val().toLowerCase();

      // routes search query to page
      if ((text == "home") || (text == "index")) {
        window.location.replace('index.html');
      } else if (text == "about" || text == "about us" || text == "aboutus") {
        window.location.replace('about.html');
      } else if ((text == "homework") || (text == "hw") || (text == "binder")) {
        window.location.replace('binder.html');
      } else if (text == "forms") {
        window.location.replace('forms.html');
      } else if (text == "news") {
        window.location.replace('news.html');
      } else if (text == "status") {
        window.location.replace('status.html');
      } else if (text == "update" || text == "updatelog") {
        window.location.replace('updatelog.html')
      } else {
        // if search query cannot be mapped to a page or the aliases I suppose people might enter, then just reload the page
        alert("No page found for that search query")
        window.location.reload();
      }
    });
    $('.section-changer').each(function(idx) {
      $(this).click(function(btn) {
        $(this).data('overlook-section')
        window.localStorage.setItem('8g-overlook-section', $(this).data('overlook-section'));
        alert(`Set your section to ${window.localStorage.getItem('8g-overlook-section')}!`);
        window.location.reload();
      });
    });
  });
});