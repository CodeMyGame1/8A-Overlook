function getSection() {
  var allowed_sections = ["8A", "8B", "8C"];
  var section;
  section = prompt("What is your section? (8A, 8B, or 8C)");
  while (section == null || !allowed_sections.includes(section.toUpperCase())) {
    section = prompt("What is your section? (8A, 8B, or 8C)");
  }

  section = section.toUpperCase();
  
  window.localStorage.setItem('8g-overlook-section', section);
  
  return section;
}

$(document).ready(async function() {
  var section = (window.localStorage.getItem('8g-overlook-section') || getSection());

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

    for (const [subject, assignments] of Object.entries(res[section]["homework"])) {
      for (assignment of assignments) { 
        if (assignment["name"]) {
          li.text(`${assignment["name"]} `);
          if (assignment["due_date"]) {
            badge.text(`Due ${assignment["due_date"]}`);
            li.append(badge);
          }
          if (assignment["tooltip"]) {
            // data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top"
            li.prop('data-bs-toggle', 'tooltip');
            li.prop('data-bs-placement', 'top');
            li.prop('title', assignment["tooltip"]);
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

    row.append($('<div class="vr"></div>'));

    var col2 = $('<div class="col"></div>');

    var testandproj = $('<div class="collapse multi-collapse comfortaa" id="testandproj"></div>');

    card = $('<div class="card card-body"></div>'); // card container for homework
    
    header = $('<div class="centering"></div>'); // header

    header.append($(`<h1 class="display-5 fw-bold">${section} Overlook: Binder - Tests and Projects</h1><br><br>`)); // append text to header
    card.append(header); // append header to card
    testandproj.append(card);
    col2.append(testandproj);
    row.append(col2);

    var ul = $('<ul></ul>');
    var li = $('<li class="fw-bold"></li>');
    var badge = $('<span class="badge bg-secondary"></span>');
    // add support for desc of assignments
    for (const [subject, tests] of Object.entries(res[section]["testandproj"])) {
      for (test of tests) { 
        if (test["name"]) {
          li.text(`${test["name"]} `);
          if (test["due_date"]) {
            badge.text(`Due ${test["due_date"]}`);
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

    var electives = $('#insertElectives'); // the container for this madness that we will push to eventually
    var item = "";
    var version = "";
    var button = "";
    var desc = "";
    var accord_body = "";
    var list_groups = "";
    var li = ""
  
    for (const [elective, stuff] of Object.entries(res["electives"])) {
      item = $('<div class="accordion-item"></div>');
      header = $(`<h2 class="accordion-header" id="${elective}-target"></h2>`);
      button = $(`<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${elective}" aria-expanded="false" aria-controls="${elective}"></button>`);
      desc = $(`<div id="${elective}" class="accordion-collapse collapse" aria-labelledby="#${elective}-target" data-bs-parent="#update_log"></div>`);
      accord_body = $('<div id="accordion-body"></div>');
      list_groups = $('<div id="list-groups"></div>');

      button.text(elective);
          
      header.append(button);
      item.append(header);
        
      for (let thingy of stuff) {
        if (thingy["name"]) {
          li = $('<li class="list-group-item list-group-item-action"></li>');
          li.text(`${thingy["name"]} `)
          if (thingy["due_date"]) {
            var badge = $('<span class="badge bg-secondary"></span>');
            badge.text(`${thingy["due_date"]}`)
            li.append(badge);
          }
          list_groups.append(li);
        }
      }
      
      accord_body.append(list_groups);
      desc.append(accord_body);
      item.append(desc);
      electives.append(item);
    }
  } catch (e) {
    if (e instanceof SyntaxError) {
      alert("Pranesh must've broken something again... pls tell him the JSON file syntax is probably off");
      alert(`Try to understand the following error. If not, just go ask Pranesh and he'll fix it after 10 minutes. Error: ${e}`)
      window.location.replace('index.html');
    } else {
      alert("some new foreign error that's not supposed to happen occured");
      alert(`(tell Pranesh about this) ${e}`);
    }
  }

  try {
    $('#electiveModal').modal();
  } catch (e) {
    alert("some new foreign error that's not supposed to happen occured");
      alert(`(tell Pranesh about this) ${e}`);
  }
});