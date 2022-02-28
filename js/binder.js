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
  // var bob = await fetch('binder.json').then(response => response.json());
});

/*for (let i = 0; i < 11; i++) {
  $(`<h2 class="fw-bold">${}</h2>`);
}*/

/*
    <!--Homework-->
    <div class="row">
      <div class="col">
        <div class="collapse multi-collapse comfortaa" id="homework">
          
          <div class="card card-body">
            <div class="centering">
              
              <h1 class="display-5 fw-bold">8A Overlook: Binder - Homework</h1><br><br>

            </div>
            <!--History-->
            <h2 class="fw-bold">History</h2>
            <ul>
              <li class="fw-bold">Cold War Project</li>
              <span class="badge bg-secondary">sometime soon</span></li>
            </ul>
            <!--Vocabulary-->
            <h2 class="fw-bold">Vocabulary</h2>
            <ul>
              <li class="fw-bold">Sadlier Unit 12 Project <span class="badge bg-secondary">2/25/2022 (Friday)</span></li>
            </ul>
            <!--Literature-->
            <h2 class="fw-bold">Literature</h2>
            <ul>
              <li class="fw-bold"><em>The Twelfth Night</em> Annotations <span class="badge bg-secondary">2/23/2022 <strong>(TODAY)</strong></span></li>
            </ul>
            <!--Grammar-->
            <h2 class="fw-bold">Grammar</h2>
            <ul>
              <li class="fw-bold">None (for now...)</li>
            </ul>
            <!--Composition-->
            <h2 class="fw-bold">Composition</h2>
            <ul>
              <li class="fw-bold">None (for now...)</li>
            </ul>
            <!--Spanish Day 1-->
            <h2 class="fw-bold">Spanish Day 1</h2>
            <ul>
              <li class="fw-bold">None (for now...)</li>
            </ul>
            <!--Geometry-->
            <h2 class="fw-bold">Geometry</h2>
            <ul>
              <li class="fw-bold">8.5 HW <span class="badge bg-secondary">Thursday 2/24/2022</span></li>
            </ul>
            <!--Day 1 Computer Science-->
            <h2 class="fw-bold">Day 1 Computer Science</h2>
            <ul>
              <li class="fw-bold">None (for now...)</li>
            </ul>
            <!--Science-->
            <h2 class="fw-bold">Science</h2>
            <ul>
              <li class="fw-bold">Topic 8 Lesson 1 (if you didn't do it in class)</li>
            </ul>
            <!--Day 2 Speech & Debate-->
            <h2 class="fw-bold">Day 2 Speech & Debate</h2>
            <ul>
              <li class="fw-bold">None (for now...)</li>
            </ul>
            <!--Day 2 PE-->
            <h2 class="fw-bold">PE Day 2</h2>
            <ul>
              <li class="fw-bold">Volleyball Unit...?</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="vr"></div>

      <!--Tests & Projects-->
      <div class="col">
        <div class="collapse multi-collapse comfortaa" id="testandproj">
          <div class="card card-body">
            <div class="centering">
              <h1 class="display-5 fw-bold">8A Overlook: Binder - Tests & Projects</h1><br><br>
            </div>
            <!--History-->
            <h2 class="fw-bold">History</h2>
            <ul>
              <li class="fw-bold">WW2 Project <span class="badge bg-secondary">probs not gonna end this term (2/17/2022)</span></li>
            </ul>
            <!--Vocabulary-->
            <h2 class="fw-bold">Vocabulary</h2>
            <ul>
              <li class="fw-bold">Sadlier Unit 12 Test <span class="badge bg-secondary">2/25/2022 (Friday)</span></li>
            </ul>
            <!--Literature-->
            <h2 class="fw-bold">Literature</h2>
            <ul>
              <li class="fw-bold"><em>The Twelfth Night</em> Annotations <span class="badge bg-secondary">2/23/2022 <strong>(TODAY)</strong></span></li>
            </ul>
            <!--Grammar-->
            <h2 class="fw-bold">Grammar</h2>
            <ul>
              <li class="fw-bold">None for now...
            </ul>
            <!--Composition-->
            <h2 class="fw-bold">Composition</h2>
            <ul>
              <li class="fw-bold">None for now...</li>
            </ul>
            <!--Spanish-->
            <h2 class="fw-bold">Spanish</h2>
            <ul>
              <li class="fw-bold">None (for now...)</li>
            </ul>
            <!--Geometry-->
            <h2 class="fw-bold">Geometry</h2>
            <ul>
              <li class="fw-bold">None (for now...)</li>
              
            </ul>
            <!--Day 1 Computer Science-->
            <h2 class="fw-bold">Computer Science Day 1</h2>
            <ul>
              <li class="fw-bold">None (for now...)</li>
            </ul>
            <!--Science-->
            <h2 class="fw-bold">Science</h2>
            <ul>
              <li class="fw-bold">None for now...</li>
            </ul>
            <!--Day 2 Speech & Debate-->
            <h2 class="fw-bold">Day 2 Speech & Debate</h2>
            <ul>
              <li class="fw-bold">None (for now...)</li>
            </ul>
            <!--Day 2 PE-->
            <h2 class="fw-bold">PE</h2>
            <ul>
              <li class="fw-bold">None (for now...)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
*/