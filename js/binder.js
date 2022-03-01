$(document).ready(async function() {
  var allowed_sections = ["8A", "8B", "8C"];
  var section = prompt("What is your section? (8A, 8B, or 8C)");
  section = section.toUpperCase();
  while (!allowed_sections.includes(section)) {
    section = prompt("What is your section? (8A, 8B, or 8C)");
    section = section.toUpperCase()
  }

  try {
    let res = await fetch('/js/binder.json');
    res = await res.json();

    var row = $('.row'); // the container for this madness that we will push to eventually

    var col1 = $('<div class="col"></div>'); // homework column
    
    var homework = $('<div class="collapse multi-collapse comfortaa" id="homework"></div>'); // container for homework 
    
    var card = $('<div class="card card-body"></div>'); // card container for homework
    
    var header = $('<div class="centering"></div>'); // header
    header.append($(`<h1 class="display-5 fw-bold">${section} Overlook: Binder - Homework</h1><br><br>`)); // append text to header
    card.append(header); // append header to card
    homework.append(card);
    col1.append(homework);
    row.append(col1);
  
    var ul = $('<ul></ul>');
    var li = $('<li class="fw-bold"></li>');
    var badge = $('<span class="badge bg-secondary"></span>');
    // add support for desc of assignments
    console.log(res);
    for (const [subject, assignments] of Object.entries(res[section]["homework"])) {
      for (assignment of assignments) { 
        if (assignment["name"]) {
          li.text(`${assignment["name"]} `);
          if (assignment["due_date"]) {
            badge.text(`Due ${assignment["due_date"]}`);
            li.append(badge);
          }
          ul.append(li);
        }
      }
      card.append($(`<h2 class="fw-bold">${subject}</h2>`));
      card.append(ul);
      ul = $('<ul></ul>');
      li = $('<li class="fw-bold"></li>');
      badge = $('<span class="badge bg-secondary"></span>');
    }
  
    // add this greatness to document so the peoples can see it
    
    var col2 = $('<div class="col"></div>');
  
    row.append(col1);
  } catch (e) {
    if (e instanceof SyntaxError) {
      alert("Pranesh must've broken something again... pls tell him the JSON file syntax is probably off");
      alert(`Try to understand the following error. If not, just go ask Pranesh and he'll fix it after 10 minutes. Error: ${e}`)
      window.location.replace('index.html');
    } else {
      alert("some new foreign error that's not supposed to happen occured");
    }
  }
});